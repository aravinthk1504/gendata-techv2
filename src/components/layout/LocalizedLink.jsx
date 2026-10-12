"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { localizedHref } from "../../lib/homeText"

// Compatibility component for existing Vite page markup.
// Converts React Router's "to" prop to a localized Next.js "href".
export default function LocalizedLink({ to = "/", children, ...props }) {
  const { lang } = useParams()
  const target = typeof to === "string" ? localizedHref(lang, to) : to
  return <Link href={target} {...props}>{children}</Link>
}
