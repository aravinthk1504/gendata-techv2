import test from "node:test";
import assert from "node:assert/strict";
import { buildEnquiryNotification } from "../src/lib/contact-notification-template.mjs";

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
