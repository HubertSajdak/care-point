import dayjs from "dayjs"
import "dayjs/locale/pl"
import { useTranslation } from "react-i18next"
const DayjsLocaleProvider = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation()
  if (i18n.language === "pl") {
    dayjs.locale("pl")
  } else {
    dayjs.locale("en")
  }
  return children
}

export default DayjsLocaleProvider
