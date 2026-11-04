// Email-safe GenData Tech brand logo.
// Gmail and other webmail clients do not consistently render WebP CID images.
// Convert the existing website logo once to a small PNG and embed as CID.
// A publicly accessible HTTPS PNG URL can override the inline fallback.
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const logoPath = join(process.cwd(), "public", "assets", "gendata-tech-mark.webp");
let pngBrandingPromise;

export async function getEmailBranding() {
  const hosted = process.env.RESEND_EMAIL_LOGO_URL?.trim();
  if (hosted) {
    try {
      const url = new URL(hosted);
      if (url.protocol === "https:") {
        return { logoSrc: url.href, attachments: [] };
      }
    } catch {
      // Invalid URL: use the bundled PNG image instead.
    }
  }

  if (!pngBrandingPromise) {
    pngBrandingPromise = (async () => {
      const bytes = await readFile(logoPath);
      const png = await sharp(bytes)
        .resize({ width: 128, height: 128, fit: "inside", withoutEnlargement: true })
        .png({ compressionLevel: 9 })
        .toBuffer();
      return {
        logoSrc: "cid:gendata-tech-logo",
        attachments: [{
          filename: "gendata-tech-logo.png",
          content: png.toString("base64"),
          content_type: "image/png",
          content_id: "gendata-tech-logo",
        }],
      };
    })().catch(error => {
      // Branding must never prevent Firestore saves or mail delivery.
      console.error("Resend email logo unavailable", error?.code || error?.name || "unknown");
      return { logoSrc: "", attachments: [] };
    });
  }
  return pngBrandingPromise;
}
