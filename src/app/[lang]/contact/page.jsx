import { getPageMetadata } from "../../../i18n/pageMetadata"
import Contact from "../../../components/migrated/Contact"
import { contactTurnstileRequired } from "../../../lib/contact-turnstile.mjs"

export const dynamic = "force-dynamic";

export default function ContactPage() {
  const required = contactTurnstileRequired();
  return <Contact
    turnstileRequired={required}
    turnstileSiteKey={required ? (process.env.TURNSTILE_SITE_KEY || "") : ""}
  />;
}

export async function generateMetadata({ params }) {
  const { lang } = await params
  return getPageMetadata(lang, "contact")
}
