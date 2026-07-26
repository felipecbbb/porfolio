/* =========================================================
   CONFIG DE INTEGRACIONES — Felipe Cámara
   Fuente única para Cal.com, WhatsApp, Meta Pixel y correos.
   Todo se lee de variables NEXT_PUBLIC_* (inyectadas en build).
   Si un valor falta, los componentes DEGRADAN con elegancia
   (no se rompe nada; simplemente no se muestra esa vía).

   RELLENA ESTOS VALORES en un archivo `.env.local` (o en Vercel):
     NEXT_PUBLIC_CAL_LINK=felipe-camara/15min   (tu enlace de Cal.com, sin dominio)
     NEXT_PUBLIC_WHATSAPP=34XXXXXXXXX            (con prefijo país, solo dígitos)
     NEXT_PUBLIC_META_PIXEL_ID=1234567890        (ID del pixel de Meta)
   Y en el servidor (NO NEXT_PUBLIC, secreto):
     RESEND_API_KEY=re_xxx                        (para que el formulario envíe de verdad)
     LEAD_TO_EMAIL=hola@felippecamara.com         (a dónde llegan los leads; opcional)
     LEAD_FROM_EMAIL="Felipe Cámara <web@felippecamara.com>" (remitente verificado en Resend; opcional)
   ========================================================= */

export const CONTACT_EMAIL = "hola@felippecamara.com";

/** Teléfono de TRABAJO (no el personal). Se usa en WhatsApp, click-to-call y pie de correos. */
export const WORK_PHONE_DISPLAY = "+34 603 98 49 55";
/** Mismo número en formato tel: (href). */
export const WORK_PHONE_TEL = "+34603984955";

/** Enlace de Cal.com SIN dominio. Por defecto el de Felipe (evento "Ver tu web en 15 min"). */
export const CAL_LINK = (process.env.NEXT_PUBLIC_CAL_LINK ?? "felipe-camara/web").trim();

/** URL completa de la reserva. Si no hay CAL_LINK, se cae al formulario /contacto. */
export const CAL_URL = CAL_LINK ? `https://cal.com/${CAL_LINK}` : "";

/** Teléfono de WhatsApp con prefijo internacional, solo dígitos. Por defecto el de trabajo. */
export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP ?? "34603984955").replace(/\D/g, "");

/** ID del pixel de Meta. Vacío = no se carga ningún script de tracking. */
export const META_PIXEL_ID = (process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "").trim();

/** URL del vídeo VSL de la landing (mp4/webm). Vacío = placeholder editorial. */
export const VSL_URL = (process.env.NEXT_PUBLIC_VSL_URL ?? "").trim();

/** ¿Hay pixel configurado? (para decidir si mostrar el banner de consentimiento). */
export const HAS_PIXEL = META_PIXEL_ID.length > 0;

/**
 * Construye la URL de WhatsApp con un mensaje pre-rellenado que cualifica.
 * Devuelve "" si no hay número configurado (para no renderizar el botón).
 */
export function whatsappUrl(message: string): string {
  if (!WHATSAPP_NUMBER) return "";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Mensajes de WhatsApp precargados por idioma (cualifican de entrada). */
export const WA_MESSAGES: Record<"es" | "en" | "de", string> = {
  es: "Hola Felipe 👋 Vengo de tu web. Tengo un proyecto de [web / SaaS / automatización] con un presupuesto aproximado de [___]. ¿Hablamos?",
  en: "Hi Felipe 👋 Coming from your site. I have a [website / SaaS / automation] project with a rough budget of [___]. Can we talk?",
  de: "Hallo Felipe 👋 Ich komme von deiner Website. Ich habe ein [Website / SaaS / Automatisierung]-Projekt mit einem ungefähren Budget von [___]. Können wir reden?",
};
