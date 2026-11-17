import { SITE_NAME, absoluteUrl } from "./site.mjs";

// JSON.stringify does not escape "<", so a value containing "</script>" could
// break out of the script tag. Escape it, plus the JS line separators.
export function serializeJsonLd(data) {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

// Facts below are only those already published on the site (footer/contact).
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: SITE_NAME,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/assets/gendata-tech-mark.webp"),
    email: "info@gendatatech.com",
    contactPoint: [{
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@gendatatech.com",
      availableLanguage: ["English", "German"],
    }],
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "Annai Abirami Nagar, Subha Nagar Area",
        addressLocality: "Kovilpatti",
        postalCode: "628502",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Coimbatore",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
    ],
    sameAs: [
      "https://github.com/gendatatech",
      "https://www.instagram.com/gendata_tech",
      "https://www.linkedin.com/in/gendata-tech",
    ],
  };
}

export function websiteSchema(lang = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: SITE_NAME,
    url: absoluteUrl(`/${lang}`),
    inLanguage: lang,
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

// Only questions and answers that are visible on the page may be marked up.
export function faqSchema(faqs = []) {
  const entities = faqs
    .filter(item => item && item.question && item.answer)
    .map(item => ({
      "@type": "Question",
      name: String(item.question),
      acceptedAnswer: { "@type": "Answer", text: String(item.answer) },
    }));
  if (!entities.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entities,
  };
}

export function articleSchema({ lang, slug, title, description, image, publishedDate, updatedAt }) {
  const url = absoluteUrl(`/${lang}/blog/${slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: String(title || "").slice(0, 110),
    description: description || undefined,
    image: image ? [image] : undefined,
    datePublished: publishedDate || undefined,
    dateModified: updatedAt || publishedDate || undefined,
    inLanguage: lang,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@id": absoluteUrl("/#organization") },
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}
