import { GetThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk"
import { AxiosError } from "axios"
import { toast } from "react-toastify"

import { Endpoints } from "@/constants"
import { FailedReqMsg } from "@/types/api-types"

const errorHandler = ({
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
export default errorHandler
