import { getPageMetadata } from "../../../i18n/pageMetadata"
import Products from "../../../components/migrated/Products"

export default function ProductsPage() {
  return <Products />
}

export async function generateMetadata({ params }) {
  const { lang } = await params
  return getPageMetadata(lang, "products")
}
