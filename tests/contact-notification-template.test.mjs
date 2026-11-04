import test from "node:test";
import assert from "node:assert/strict";
import { buildEnquiryNotification, buildCustomerAcknowledgement } from "../src/lib/contact-notification-template.mjs";

const enquiry = {
  name: "Customer Example",
  email: "customer@example.com",
  phone: "+91 90000 00000",
  category: "Services",
  offering: "Web Development",
  language: "en",
  message: "I would like to discuss a website for our business.",
};

test("notification includes enquiry fields and admin reference", () => {
  const result = buildEnquiryNotification("enquiry-id-123", enquiry);
  for (const value of [
    enquiry.name, enquiry.email, enquiry.phone, enquiry.category,
    enquiry.offering, enquiry.message, "enquiry-id-123",
  ]) {
    assert.ok(result.text.includes(value));
    assert.ok(result.html.includes(value));
  }
  assert.match(result.subject, /New GenData Tech enquiry/);
});

test("customer-submitted markup is escaped in email HTML", () => {
  const result = buildEnquiryNotification("record", {
    ...enquiry,
    name: '<img src=x onerror="alert(1)">',
    message: '<script>alert("x")</script> & another thing',
  });
  assert.ok(!result.html.includes("<script>"));
  assert.ok(!result.html.includes("<img src=x"));
  assert.ok(result.html.includes("&lt;script&gt;"));
  assert.ok(result.html.includes("&amp; another thing"));
  assert.ok(result.text.includes('<script>alert("x")</script>'));
});

test("German-language enquiry notification identifies its language", () => {
  const result = buildEnquiryNotification("record", { ...enquiry, language: "de" });
  assert.match(result.text, /Language: German/);
});

test("short EN receipt has logo and support, but no private enquiry details", () => {
  const receipt = buildCustomerAcknowledgement("internal-id-456", enquiry, { logoSrc: "cid:gendata-tech-logo", supportEmail: "support@gendatatech.com" });
  assert.match(receipt.subject, /received your enquiry/i);
  assert.match(receipt.text, /Customer Example/);
  assert.match(receipt.text, /support@gendatatech.com/);
  assert.match(receipt.html, /cid:gendata-tech-logo/);
  assert.match(receipt.html, /mailto:support@gendatatech.com/);
  for (const value of ["internal-id-456", "Reference number", "Enquiry topic", enquiry.offering, enquiry.phone, enquiry.message]) {
    assert.ok(!receipt.text.includes(value));
    assert.ok(!receipt.html.includes(value));
  }
});
test("short DE receipt has support but no reference or topic", () => {
  const receipt = buildCustomerAcknowledgement("internal-id-789", { ...enquiry, language: "de" });
  assert.match(receipt.subject, /Anfrage erhalten/);
  assert.match(receipt.text, /Vielen Dank/);
  assert.match(receipt.text, /support@gendatatech.com/);
  assert.ok(!receipt.text.includes("internal-id-789"));
  assert.ok(!receipt.html.includes("Anfragethema"));
});
test("customer name is escaped and enquiry topic is omitted", () => {
  const receipt = buildCustomerAcknowledgement("id", { ...enquiry, name: '<img src=x onerror="alert(1)">', offering: '<script>x</script>' });
  assert.ok(!receipt.html.includes("<img src=x"));
  assert.ok(receipt.html.includes("&lt;img"));
  assert.ok(!receipt.html.includes("<script>"));
  assert.ok(!receipt.html.includes("&lt;script&gt;"));
});
