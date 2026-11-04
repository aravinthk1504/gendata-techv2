import { z } from "zod";
import { scheduleError } from "./blog-schedule.mjs";

// Drafts may be incomplete. Publishing is validated separately on the server.
const httpsOrEmpty = z.union([
  z.literal(""),
  z.url().refine(value => value.startsWith("https://"), "Use an HTTPS URL"),
]);
export const blogSchema = z.object({
  type: z.enum(["article", "event"]).default("article"),
  gallery: z.array(z.object({
    url: z.url().refine(value => value.startsWith("https://")),
    caption: z.string().max(180),
  }).strict()).max(30).default([]),
  eventDate: z.string().max(30).default(""),
  eventTime: z.string().max(50).default(""),
  location: z.string().max(180).default(""),
  eventMode: z.enum(["online", "in-person", "hybrid"]).default("online"),
  registrationUrl: httpsOrEmpty.default(""),
  title: z.string().trim().max(180).default(""),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(130),
  category: z.string().trim().max(80).default("Technology Trends"),
  excerpt: z.string().trim().max(500).default(""),
  content: z.string().trim().max(50000).default(""),
  seoTitle: z.string().trim().max(180).default(""),
  seoDescription: z.string().trim().max(320).default(""),
  image: httpsOrEmpty.default(""),
  imageAlt: z.string().trim().max(180).default(""),
  language: z.enum(["en", "de"]).default("en"),
  status: z.enum(["draft", "scheduled", "published"]).default("draft"),
  scheduledFor: z.string().max(40).default(""),
}).strict();

export const blogUpdateSchema = blogSchema.omit({ slug: true, language: true });

export function publishingIssues(data) {
  const issues = {};
  function check(name, valid, explanation) {
    if (!valid) issues[name] = [explanation];
  }
  check("title", data.title?.trim().length >= 5, "Enter a title with at least 5 characters");
  check("category", data.category?.trim().length >= 2, "Select a category");
  check("excerpt", data.excerpt?.trim().length >= 10, "Write a summary with at least 10 characters");
  check("content", data.content?.trim().length >= 30, "Write at least 30 characters of article content");
  check("image", Boolean(data.image?.trim()), "Upload or provide a cover image");
  check("imageAlt", Boolean(data.imageAlt?.trim()), "Provide cover image alternative text");
  check("seoTitle", Boolean(data.seoTitle?.trim()), "Provide an SEO title");
  check("seoDescription", Boolean(data.seoDescription?.trim()), "Provide an SEO description");
  if (data.status === "scheduled") {
    const issue = scheduleError(data);
    if (issue) issues.scheduledFor = [issue];
  }
  if (data.type === "event") {
    check("eventDate", /^\d{4}-\d{2}-\d{2}$/.test(data.eventDate || ""), "Choose an event date");
    check("eventTime", Boolean(data.eventTime?.trim()), "Provide an event time");
  }
  return issues;
}
