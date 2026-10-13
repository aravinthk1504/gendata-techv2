import { getPageMetadata } from "../../../../i18n/pageMetadata"
import IoTSolutions from "../../../../components/migrated/services/IoTSolutions"

export default function ServicePage() {
  return <IoTSolutions />
}

export async function generateMetadata({ params }) {
  const { lang } = await params
  return getPageMetadata(lang, "services/iot-solutions")
}
