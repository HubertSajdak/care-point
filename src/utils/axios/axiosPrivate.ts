import { BASE_URL } from "@/constants/endpoints"
import axios, { isAxiosError } from "axios"
import i18next from "i18next"
import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
} from "../localStorage/localStorage"
import refreshAccessToken from "../functions/refreshAccessToken"
const axiosPrivateInstance = axios.create({
  baseURL: BASE_URL,
})

axiosPrivateInstance.interceptors.request.use(async (config) => {
  config.headers["Accept-language"] = i18next.language
  const accessToken = getAccessTokenFromLocalStorage()
  config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

axiosPrivateInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (isAxiosError(error) && error.config && error.response) {
      const prevConfig = error.config
      console.log(error)
      if (error.response.status === 401) {
        try {
          const refreshToken = getRefreshTokenFromLocalStorage()
          if (refreshToken === null) return Promise.reject(error)
          const newAccessToken = await refreshAccessToken(refreshToken)
          prevConfig.headers.Authorization = `Bearer ${newAccessToken}`
        } catch (refreshError) {
          return Promise.reject(error)
        }
      }
      try {
        const response = await axios(prevConfig)
        return response
      } catch (newRequestError) {
        return Promise.reject(newRequestError)
      }
    } else {
      return Promise.reject(error)
    }
  },
)
export default axiosPrivateInstance
