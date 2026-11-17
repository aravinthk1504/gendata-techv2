import { serializeJsonLd } from "../../lib/json-ld.mjs";

// Renders one <script type="application/ld+json"> per item. Safe to use from
// server and client components. Nothing is rendered for empty data.
export default function JsonLd({ data }) {
  const items = (Array.isArray(data) ? data : [data]).filter(Boolean);
  return items.map((item, index) => (
    <script
      key={index}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(item) }}
    />
  ));
}
