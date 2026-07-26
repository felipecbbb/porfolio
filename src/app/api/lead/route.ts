import type { NextRequest } from "next/server";
import { CONTACT_EMAIL, WORK_PHONE_DISPLAY } from "@/lib/config";

/* =========================================================
   POST /api/lead — captura de leads del formulario de contacto.

   Dos destinos (los dos best-effort, cualquiera basta para "éxito"):
   1) PANEL: inserta el lead en la Supabase del dashboard (tablas
      `leads` + `correos` con buzon "web") → aparece en Ventas ▸ Bandeja.
   2) EMAIL: aviso por Resend (opcional, encima del panel).

   Estados que devuelve (el cliente decide el fallback):
   - 200 { ok: true }                             -> guardado (panel y/o email)
   - 400 { ok: false, error: "invalid" }          -> datos inválidos
   - 503 { ok: false, reason: "not_configured" }  -> nada configurado
   - 502 { ok: false }                            -> todo falló
   En 5xx el cliente cae a `mailto:` para no perder NUNCA el lead.
   ========================================================= */

export const dynamic = "force-dynamic";

type LeadBody = {
  name?: string;
  email?: string;
  phone?: string;
  project?: string;
  budget?: string;
  message?: string;
  lang?: string;
  source?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type Lead = {
  name: string;
  email: string;
  phone: string;
  project: string;
  budget: string;
  message: string;
};

/**
 * Inserta el lead en la Supabase del panel (misma BD que el dashboard) vía
 * PostgREST, sin dependencias. Best-effort: si falta config o falla, devuelve
 * false y el formulario sigue funcionando por email/mailto.
 */
async function saveToPanel(lead: Lead): Promise<boolean> {
  // Server-side: SUPABASE_URL (runtime) preferido; NEXT_PUBLIC_* como fallback.
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return false;

  const base = url.replace(/\/$/, "");
  const headers = {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
  const email = lead.email.toLowerCase();
  const notas = [
    `Proyecto: ${lead.project || "—"}`,
    `Presupuesto: ${lead.budget || "—"}`,
    `Teléfono: ${lead.phone || "—"}`,
    "",
    lead.message || "(sin mensaje)",
  ].join("\n");

  try {
    // 1) Lead en la pipeline (para tener id y emparejar el correo).
    let leadId: string | null = null;
    const leadRes = await fetch(`${base}/rest/v1/leads`, {
      method: "POST",
      headers: { ...headers, Prefer: "return=representation" },
      body: JSON.stringify({
        nombre: lead.name,
        email,
        telefono: lead.phone || null,
        origen: "web",
        estado: "nuevo",
        notas,
      }),
    });
    if (leadRes.ok) {
      const rows = (await leadRes.json()) as { id?: string }[];
      leadId = rows?.[0]?.id ?? null;
    }

    // 2) Correo en la Bandeja (esto es lo que se ve en el panel).
    const texto = notas;
    const correoRes = await fetch(`${base}/rest/v1/correos`, {
      method: "POST",
      headers: { ...headers, Prefer: "return=minimal" },
      body: JSON.stringify({
        message_id: `web-${crypto.randomUUID()}`,
        buzon: "web",
        from_email: email,
        from_nombre: lead.name,
        subject: `Nuevo lead · ${lead.name}`,
        fecha: new Date().toISOString(),
        texto,
        tipo: "respuesta_lead",
        estado: "nuevo",
        lead_id: leadId,
        es_caliente: true,
        resumen: `Lead web${lead.budget ? ` · ${lead.budget}` : ""}`,
        avisado: false,
      }),
    });
    return correoRes.ok;
  } catch {
    return false;
  }
}

/** Envía el aviso por email con Resend. Devuelve true si se envió. */
async function sendEmail(lead: Lead): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const to = process.env.LEAD_TO_EMAIL || CONTACT_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL || "Felipe Cámara <onboarding@resend.dev>";

  const rows: [string, string][] = [
    ["Nombre", lead.name],
    ["Email", lead.email],
    ["Teléfono", lead.phone || "—"],
    ["Tipo de proyecto", lead.project || "—"],
    ["Presupuesto", lead.budget || "—"],
  ];

  const html = `
    <div style="font-family:system-ui,sans-serif;font-size:15px;color:#1c1b1b;line-height:1.6">
      <h2 style="margin:0 0 16px">Nuevo lead · ${esc(lead.name)}</h2>
      <table style="border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:4px 16px 4px 0;color:#8c8a82">${esc(
                k
              )}</td><td style="padding:4px 0"><strong>${esc(v)}</strong></td></tr>`
          )
          .join("")}
      </table>
      <p style="margin:20px 0 6px;color:#8c8a82">Mensaje:</p>
      <p style="margin:0;white-space:pre-wrap">${esc(lead.message) || "(sin mensaje)"}</p>
      <p style="margin:24px 0 0;font-size:12px;color:#8c8a82">Enviado desde felippecamara.com · Tel. ${esc(
        WORK_PHONE_DISPLAY
      )}</p>
    </div>`;

  const text = [
    `Nuevo lead · ${lead.name}`,
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Mensaje:",
    lead.message || "(sin mensaje)",
    "",
    `— Enviado desde felippecamara.com · Tel. ${WORK_PHONE_DISPLAY}`,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: lead.email,
        subject: `Nuevo lead · ${lead.name}${lead.budget ? ` · ${lead.budget}` : ""}`,
        html,
        text,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  let body: LeadBody;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const lead: Lead = {
    name: (body.name ?? "").trim(),
    email: (body.email ?? "").trim(),
    phone: (body.phone ?? "").trim(),
    project: (body.project ?? "").trim(),
    budget: (body.budget ?? "").trim(),
    message: (body.message ?? "").trim(),
  };

  if (lead.name.length < 2 || !EMAIL_RE.test(lead.email)) {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Los dos destinos en paralelo; cualquiera que funcione = lead capturado.
  const [panelSaved, emailed] = await Promise.all([saveToPanel(lead), sendEmail(lead)]);

  if (panelSaved || emailed) {
    return Response.json({ ok: true });
  }

  const anyConfigured =
    Boolean(process.env.RESEND_API_KEY) ||
    Boolean(
      (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL) &&
        process.env.SUPABASE_SECRET_KEY
    );

  if (!anyConfigured) {
    return Response.json({ ok: false, reason: "not_configured" }, { status: 503 });
  }
  return Response.json({ ok: false }, { status: 502 });
}
