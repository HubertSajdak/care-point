import { ThemeProvider } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Suspense } from "react"
import { RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import DayjsLocaleProvider from "./i18n/DayjsLocaleProvider"
import MuiLocaleProvider from "./i18n/MuiLocaleProvider"
import { router } from "./routes/router"
import FallbackView from "./shared/ui/FallbackView/FallbackView"
import { GlobalStyles } from "./styles/globalStyles"
import { theme } from "./styles/theme"

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Suspense fallback={<FallbackView />}>
          <MuiLocaleProvider>
            <DayjsLocaleProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <RouterProvider router={router} />
              </LocalizationProvider>
            </DayjsLocaleProvider>
          </MuiLocaleProvider>
        </Suspense>
        <ToastContainer position="top-center" />
      </ThemeProvider>
    </div>
  )
}

export default App
