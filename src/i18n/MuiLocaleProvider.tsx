import { ThemeProvider, createTheme, useTheme } from "@mui/material"
import { enUS as coreEnUS, plPL as corePlPL } from "@mui/material/locale"
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
  )
  return <ThemeProvider theme={translatedTheme}>{children}</ThemeProvider>
}
export default MuiLocaleProvider
