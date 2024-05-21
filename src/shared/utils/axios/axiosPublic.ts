import axios from "axios"
import i18next from "i18next"

import { BASE_URL } from "@/constants"
const axiosPublicInstance = axios.create({
  baseURL: BASE_URL,
})

axiosPublicInstance.interceptors.request.use((req) => {
  req.headers["Accept-Language"] = i18next.language
  return req
})

// this should be handled inside library
export default axiosPublicInstance
