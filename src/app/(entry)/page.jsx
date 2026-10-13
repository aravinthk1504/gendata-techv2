import { redirect } from "next/navigation"

// The English website is the default entry point.
// The EN / DE selector remains available in the Navbar.
export default function EntryPage() {
  redirect("/en")
}
