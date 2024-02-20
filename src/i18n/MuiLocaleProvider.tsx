import { ThemeProvider, createTheme, useTheme } from "@mui/material"
import { enUS as coreEnUS, plPL as corePlPL } from "@mui/material/locale"
import {
  enUS as pickerEnUS,
  plPL as pickerPlPL,
} from "@mui/x-date-pickers/locales"
import { useTranslation } from "react-i18next"
interface MuiLocaleProviderProps {
  children: React.ReactNode
}

const MuiLocaleProvider = ({ children }: MuiLocaleProviderProps) => {
  const { i18n } = useTranslation()
  const theme = useTheme()
  const translatedTheme = createTheme(
    theme,
    i18n.language === "pl" ? corePlPL : coreEnUS,
    i18n.language === "pl" ? pickerPlPL : pickerEnUS,
  )
  return <ThemeProvider theme={translatedTheme}>{children}</ThemeProvider>
}
export default MuiLocaleProvider
