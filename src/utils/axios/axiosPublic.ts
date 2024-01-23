import { BASE_URL, Endpoints } from "@/constants/endpoints"
import { FailedReqMsg } from "@/types/api-types"
import { GetThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk"
import axios, { AxiosError } from "axios"
import i18next from "i18next"
import { toast } from "react-toastify"
const axiosPublicInstance = axios.create({
  baseURL: BASE_URL,
})

axiosPublicInstance.interceptors.request.use((req) => {
  req.headers["Accept-Language"] = i18next.language
  return req
})

export const errorHandler = ({
  error,
  thunkAPI,
}: {
  error: any
  thunkAPI: GetThunkAPI<any>
}) => {
  const err = error as AxiosError<FailedReqMsg>
  const errorMsg = err.response?.data.message
  if (
    err.response?.status !== 401 ||
    (err.response?.status === 401 &&
      error.response.config.url === Endpoints.REFRESH_ACCESS_TOKEN) ||
    (err.response?.status === 401 &&
      error.response.config.url === Endpoints.LOGIN)
  ) {
    toast.error(errorMsg, {
      autoClose: false,
    })
  }
  return thunkAPI.rejectWithValue(err.response?.data.message)
}
export default axiosPublicInstance
