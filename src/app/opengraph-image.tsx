import { ImageResponse } from "next/og";

export const alt = "Felipe Cámara — Desarrollo web, software a medida e IA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1a1916",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "44px", height: "44px", background: "#ece84d", borderRadius: "10px" }} />
          <div style={{ color: "#f3efe4", fontSize: "26px", letterSpacing: "3px" }}>FELIPPECAMARA.COM</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#f3efe4", fontSize: "98px", fontWeight: 700, lineHeight: 1.02 }}>
            Felipe Cámara
          </div>
          <div style={{ color: "#bdb9ad", fontSize: "40px", marginTop: "20px" }}>
            Desarrollo web · Software a medida · IA
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: "#ece84d", fontSize: "28px" }}>Gran Canaria · Canarias</div>
          <div style={{ color: "#8c8a82", fontSize: "24px" }}>Webs que convierten visitas en clientes</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
