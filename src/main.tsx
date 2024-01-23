// eslint-disable-next-line import/order
import { store } from "./app/store"

//ignore sorting imports
import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"

import "react-toastify/dist/ReactToastify.css"
import App from "./App"
import "./i18n/i18n"
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
