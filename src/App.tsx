import { ThemeProvider } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import { Suspense } from "react"
import { RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { router } from "./routes/router"
import FallbackView from "./shared/FallbackView/FallbackView"
import { GlobalStyles } from "./styles/globalStyles"
import { theme } from "./styles/theme"
function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Suspense fallback={<FallbackView />}>
          <RouterProvider router={router} />
        </Suspense>
        <ToastContainer position="top-center" />
      </ThemeProvider>
    </div>
  )
}

export default App
