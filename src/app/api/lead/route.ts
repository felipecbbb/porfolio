import type { NextRequest } from "next/server";
import { CONTACT_EMAIL, WORK_PHONE_DISPLAY } from "@/lib/config";

/* =========================================================
   POST /api/lead — captura de leads del formulario de contacto.
   Envía el lead por email vía Resend (usando fetch, sin dependencia).

   Estados que devuelve (el cliente decide el fallback):
   - 200 { ok: true }                      -> enviado correctamente
   - 400 { ok: false, error: "invalid" }   -> datos inválidos
   - 503 { ok: false, reason: "not_configured" } -> falta RESEND_API_KEY
   - 502 { ok: false }                      -> Resend falló
   En 5xx el cliente cae a `mailto:` para no perder NUNCA el lead.
   ========================================================= */

// El handler lee el body en cada request: nunca se cachea.
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

export async function POST(request: NextRequest) {
  let body: LeadBody;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const project = (body.project ?? "").trim();
  const budget = (body.budget ?? "").trim();
  const message = (body.message ?? "").trim();
  const lang = (body.lang ?? "es").trim();
  const source = (body.source ?? "web").trim();

  if (name.length < 2 || !EMAIL_RE.test(email)) {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Sin key configurada: el cliente hará fallback a mailto.
    return Response.json({ ok: false, reason: "not_configured" }, { status: 503 });
  }

  const to = process.env.LEAD_TO_EMAIL || CONTACT_EMAIL;
  // Remitente: idealmente un dominio verificado en Resend. Como fallback usamos
  // el remitente de pruebas de Resend (solo entrega al email de tu cuenta).
  const from = process.env.LEAD_FROM_EMAIL || "Felipe Cámara <onboarding@resend.dev>";

  const rows: [string, string][] = [
    ["Nombre", name],
    ["Email", email],
    ["Teléfono", phone || "—"],
    ["Tipo de proyecto", project || "—"],
    ["Presupuesto", budget || "—"],
    ["Idioma", lang],
    ["Origen", source],
  ];

  const html = `
    <div style="font-family:system-ui,sans-serif;font-size:15px;color:#1c1b1b;line-height:1.6">
      <h2 style="margin:0 0 16px">Nuevo lead · ${esc(name)}</h2>
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
      <p style="margin:0;white-space:pre-wrap">${esc(message) || "(sin mensaje)"}</p>
      <p style="margin:24px 0 0;font-size:12px;color:#8c8a82">Enviado desde felippecamara.com · Tel. ${esc(WORK_PHONE_DISPLAY)}</p>
    </div>`;

  const text = [
    `Nuevo lead · ${name}`,
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Mensaje:",
    message || "(sin mensaje)",
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
        reply_to: email,
        subject: `Nuevo lead · ${name}${budget ? ` · ${budget}` : ""}`,
        html,
        text,
      }),
    });

    if (!res.ok) {
      return Response.json({ ok: false }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 502 });
  }
}
