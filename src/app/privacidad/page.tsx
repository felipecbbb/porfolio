import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidad — Felipe Cámara",
  description: "Política de privacidad de las aplicaciones y servicios de Felipe Cámara Barroso.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/privacidad" },
};

const ACTUALIZADO = "5 de julio de 2026";

export default function PrivacidadPage() {
  return (
    <main
      style={{
        maxWidth: 760,
        margin: "0 auto",
        padding: "clamp(48px, 8vw, 96px) 24px 120px",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif",
        color: "#1c1c1e",
        lineHeight: 1.65,
      }}
    >
      <p style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#6e6e73", marginBottom: 10 }}>
        Legal
      </p>
      <h1 style={{ fontSize: "clamp(30px, 5vw, 44px)", fontWeight: 700, letterSpacing: "-0.03em", margin: "0 0 8px" }}>
        Política de privacidad
      </h1>
      <p style={{ color: "#6e6e73", fontSize: 14, marginBottom: 40 }}>Última actualización: {ACTUALIZADO}</p>

      <Section title="Quiénes somos">
        <p>
          Esta política describe cómo Felipe Cámara Barroso («nosotros»), desarrollador y responsable con sede en Gran
          Canaria (España), trata la información en el marco de sus aplicaciones y servicios, incluida la aplicación
          interna de gestión de contenido de Instagram («Panel Felipe Publicador»). Contacto:{" "}
          <a href="mailto:hola@felippecamara.com" style={{ color: "#1c1c1e" }}>hola@felippecamara.com</a>.
        </p>
      </Section>

      <Section title="Qué datos tratamos">
        <p>
          Nuestra aplicación de gestión de Instagram opera <strong>únicamente sobre nuestras propias cuentas</strong>{" "}
          de Instagram profesional, conectadas mediante el inicio de sesión oficial de Instagram (Meta). En ese contexto
          la aplicación puede acceder a:
        </p>
        <ul>
          <li>El contenido que nosotros mismos publicamos (imágenes, textos y sus métricas básicas).</li>
          <li>Los comentarios que otras personas dejan en nuestras publicaciones, para poder responderlos.</li>
          <li>El identificador técnico necesario para enviar una respuesta por mensaje directo a quien comenta.</li>
        </ul>
        <p>
          No recopilamos, almacenamos ni vendemos datos personales de terceros con fines de perfilado o publicidad. Los
          identificadores de acceso se guardan de forma cifrada en nuestra infraestructura y solo se utilizan para las
          operaciones descritas.
        </p>
      </Section>

      <Section title="Para qué usamos los datos">
        <ul>
          <li>Publicar y programar nuestro propio contenido en Instagram.</li>
          <li>
            Responder de forma automática a los comentarios de nuestras publicaciones enviando, cuando corresponde, un
            recurso solicitado por mensaje directo a quien comenta.
          </li>
          <li>Medir el rendimiento de nuestro propio contenido para mejorarlo.</li>
        </ul>
      </Section>

      <Section title="Con quién se comparten">
        <p>
          No compartimos datos con terceros salvo los proveedores tecnológicos estrictamente necesarios para prestar el
          servicio (alojamiento y base de datos), que actúan como encargados del tratamiento bajo contrato: Vercel Inc. y
          Supabase Inc. La comunicación con Instagram se realiza a través de las API oficiales de Meta Platforms.
        </p>
      </Section>

      <Section title="Conservación y eliminación">
        <p>
          Conservamos los datos solo mientras son necesarios para las finalidades descritas. Cualquier persona puede
          solicitar la eliminación de sus datos o revocar el acceso escribiendo a{" "}
          <a href="mailto:hola@felippecamara.com" style={{ color: "#1c1c1e" }}>hola@felippecamara.com</a>; atenderemos la
          solicitud en un plazo razonable. Los permisos concedidos a la aplicación pueden retirarse en cualquier momento
          desde los ajustes de Instagram, en «Aplicaciones y sitios web».
        </p>
      </Section>

      <Section title="Tus derechos">
        <p>
          Conforme al RGPD, tienes derecho a acceder, rectificar, suprimir, limitar y oponerte al tratamiento de tus
          datos, así como a la portabilidad. Para ejercerlos, contacta con{" "}
          <a href="mailto:hola@felippecamara.com" style={{ color: "#1c1c1e" }}>hola@felippecamara.com</a>.
        </p>
      </Section>

      <Section title="Cambios en esta política">
        <p>
          Podemos actualizar esta política para reflejar cambios en nuestros servicios o en la normativa. Publicaremos la
          versión vigente en esta misma página, indicando la fecha de última actualización.
        </p>
      </Section>

      <p style={{ marginTop: 48, fontSize: 13, color: "#6e6e73" }}>
        © 2026 Felipe Cámara Barroso · Gran Canaria, España
      </p>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 34 }}>
      <h2 style={{ fontSize: 19, fontWeight: 600, letterSpacing: "-0.01em", margin: "0 0 10px" }}>{title}</h2>
      <div style={{ fontSize: 15.5, color: "#2c2c2e" }}>{children}</div>
    </section>
  );
}
