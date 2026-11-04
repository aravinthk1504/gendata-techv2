import test from "node:test";
import assert from "node:assert/strict";
import { getEmailBranding } from "../src/lib/email-branding.mjs";

test("default logo is a PNG CID attachment with matching Content-ID", async () => {
  const before = process.env.RESEND_EMAIL_LOGO_URL;
  delete process.env.RESEND_EMAIL_LOGO_URL;
  try {
    const brand = await getEmailBranding();
    assert.equal(brand.logoSrc, "cid:gendata-tech-logo");
    assert.equal(brand.attachments.length, 1);
    const attachment = brand.attachments[0];
    assert.equal(attachment.filename, "gendata-tech-logo.png");
    assert.equal(attachment.content_type, "image/png");
    assert.equal(attachment.content_id, "gendata-tech-logo");
    const png = Buffer.from(attachment.content, "base64");
    assert.equal(png.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
  } finally {
    if (before === undefined) delete process.env.RESEND_EMAIL_LOGO_URL;
    else process.env.RESEND_EMAIL_LOGO_URL = before;
  }
});

test("public HTTPS logo URL uses hosted image without an attachment", async () => {
  const before = process.env.RESEND_EMAIL_LOGO_URL;
  process.env.RESEND_EMAIL_LOGO_URL = "https://example.com/logo.png";
  try {
    const branding = await getEmailBranding();
    assert.equal(branding.logoSrc, "https://example.com/logo.png");
    assert.deepEqual(branding.attachments, []);
  } finally {
    if (before === undefined) delete process.env.RESEND_EMAIL_LOGO_URL;
    else process.env.RESEND_EMAIL_LOGO_URL = before;
  }
});
