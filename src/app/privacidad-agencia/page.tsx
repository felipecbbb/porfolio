import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidad — Captación de clientes | Felipe Cámara",
  description:
    "Cómo tratamos los datos que nos facilitas cuando muestras interés en nuestros servicios de captación de clientes para clínicas de estética.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/privacidad-agencia" },
};

const ACTUALIZADO = "7 de agosto de 2026";

export default function PrivacidadAgenciaPage() {
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
      <p style={{ color: "#6e6e73", fontSize: 15, margin: "0 0 4px" }}>
        Captación de clientes y servicios para clínicas
      </p>
      <p style={{ color: "#6e6e73", fontSize: 14, marginBottom: 40 }}>Última actualización: {ACTUALIZADO}</p>

      <Section title="Quiénes somos">
        <p>
          Esta política describe cómo Felipe Cámara Barroso («nosotros»), profesional autónomo con sede en Gran Canaria
          (España), trata los datos personales que nos facilitas cuando muestras interés en nuestros servicios de
          captación de clientes y automatización para clínicas de estética, a través de formularios publicitarios en las
          plataformas de Meta (Facebook e Instagram) u otros canales. Contacto:{" "}
          <a href="mailto:hola@felippecamara.com" style={{ color: "#1c1c1e" }}>hola@felippecamara.com</a>.
        </p>
      </Section>

      <Section title="Qué datos tratamos">
        <p>Tratamos únicamente los datos que nos facilitas de forma voluntaria al rellenar nuestro formulario:</p>
        <ul>
          <li>Nombre y apellidos.</li>
          <li>Número de teléfono.</li>
          <li>Correo electrónico.</li>
          <li>
            La respuesta a las preguntas de cualificación (por ejemplo, si diriges o eres propietario/a de una clínica de
            estética).
          </li>
        </ul>
        <p>
          No recabamos categorías especiales de datos ni tomamos decisiones automatizadas con efectos jurídicos sobre ti.
        </p>
      </Section>

      <Section title="Para qué usamos los datos">
        <ul>
          <li>Ponernos en contacto contigo para explicarte nuestros servicios.</li>
          <li>Valorar si tu clínica encaja con lo que ofrecemos.</li>
          <li>Concertar y gestionar una llamada o reunión comercial.</li>
          <li>Enviarte información relacionada con el servicio que has solicitado.</li>
        </ul>
      </Section>

      <Section title="Base legal">
        <p>
          La base jurídica del tratamiento es tu <strong>consentimiento</strong>, que otorgas al enviar el formulario, y
          el <strong>interés legítimo</strong> en atender tu solicitud y desarrollar la relación comercial que tú mismo
          has iniciado. Puedes retirar tu consentimiento en cualquier momento.
        </p>
      </Section>

      <Section title="Con quién se comparten">
        <p>
          No vendemos ni cedemos tus datos a terceros con fines publicitarios. Solo intervienen los proveedores
          tecnológicos estrictamente necesarios para prestar el servicio, que actúan como encargados del tratamiento bajo
          contrato: Meta Platforms Ireland Ltd. (origen del formulario publicitario), Cal.com Inc. (agenda de
          reuniones) y nuestros proveedores de alojamiento y correo electrónico. Cuando alguno de estos proveedores está
          ubicado fuera del Espacio Económico Europeo, las transferencias se amparan en las garantías previstas por el
          RGPD, como las cláusulas contractuales tipo de la Comisión Europea.
        </p>
      </Section>

      <Section title="Conservación y eliminación">
        <p>
          Conservamos tus datos mientras dure la relación comercial y, una vez finalizada, durante los plazos
          legalmente exigibles. Si no llegamos a colaborar, los eliminamos cuando dejan de ser necesarios. Puedes
          solicitar la baja o la eliminación de tus datos en cualquier momento escribiendo a{" "}
          <a href="mailto:hola@felippecamara.com" style={{ color: "#1c1c1e" }}>hola@felippecamara.com</a>.
        </p>
      </Section>

      <Section title="Tus derechos">
        <p>
          Conforme al RGPD, tienes derecho a acceder, rectificar, suprimir, limitar y oponerte al tratamiento de tus
          datos, así como a la portabilidad y a retirar tu consentimiento en cualquier momento. Para ejercerlos, contacta
          con <a href="mailto:hola@felippecamara.com" style={{ color: "#1c1c1e" }}>hola@felippecamara.com</a>. También
          puedes presentar una reclamación ante la Agencia Española de Protección de Datos (
          <a href="https://www.aepd.es" style={{ color: "#1c1c1e" }} target="_blank" rel="noopener noreferrer">
            www.aepd.es
          </a>
          ).
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
