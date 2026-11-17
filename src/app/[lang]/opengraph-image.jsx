import { ImageResponse } from "next/og";

export const alt = "GenData Tech";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TAGLINE = {
  en: "AI built for real-world impact.",
  de: "KI mit echtem Nutzen für die Praxis.",
};

export default async function Image({ params }) {
  const { lang } = await params;
  const tagline = TAGLINE[lang] || TAGLINE.en;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          background: "linear-gradient(135deg, #06142F 0%, #002DCC 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, color: "#7fb8ff", display: "flex" }}>
          GENDATA TECH
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, marginTop: 24, lineHeight: 1.1, display: "flex" }}>
          {tagline}
        </div>
        <div style={{ fontSize: 30, marginTop: 36, color: "#cfe0ff", display: "flex" }}>
          AI · Software · Apps · IoT · Training
        </div>
      </div>
    ),
    { ...size },
  );
}
