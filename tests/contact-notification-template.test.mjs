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

test("English customer receipt includes reference, without re-sending private message", () => {
  const receipt = buildCustomerAcknowledgement("id-456", enquiry);
  assert.match(receipt.subject, /received your enquiry/i);
  assert.match(receipt.text, /Customer Example/);
  assert.match(receipt.text, /id-456/);
  assert.match(receipt.html, /Web Development/);
  assert.ok(!receipt.html.includes(enquiry.message));
  assert.ok(!receipt.text.includes(enquiry.phone));
});

test("German customer receipt is localized", () => {
  const receipt = buildCustomerAcknowledgement("id-789", { ...enquiry, language: "de" });
  assert.match(receipt.subject, /Anfrage erhalten/);
  assert.match(receipt.text, /Vielen Dank/);
  assert.match(receipt.text, /id-789/);
});

test("customer name, topic and reference are escaped in HTML", () => {
  const receipt = buildCustomerAcknowledgement('<test-id>', {
    ...enquiry, name: '<img src=x onerror="alert(1)">', offering: '<script>x</script>',
  });
  assert.ok(!receipt.html.includes("<script>"));
  assert.ok(!receipt.html.includes("<img src=x"));
  assert.ok(receipt.html.includes("&lt;img"));
  assert.ok(receipt.html.includes("&lt;script&gt;"));
  assert.ok(receipt.html.includes("&lt;test-id&gt;"));
});
