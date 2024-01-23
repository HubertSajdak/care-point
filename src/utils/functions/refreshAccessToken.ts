import { store } from "@/app/store"
import { Endpoints } from "@/constants/endpoints"
import { logoutUser } from "@/features/auth/authSlice"
import axiosPublicInstance from "../axios/axiosPublic"
import { setAccessTokenToLocalStorage } from "../localStorage/localStorage"

const refreshAccessToken = async (refreshToken: string) => {
  try {
    const res = await axiosPublicInstance.post<{ accessToken: string }>(
      Endpoints.REFRESH_ACCESS_TOKEN,
      { refreshToken },
    )
    setAccessTokenToLocalStorage(res.data.accessToken)
    return res.data.accessToken
  } catch (error) {
    store.dispatch(
      logoutUser({
        msg: "common:logoutMsg.sessionExpired",
        type: "error",
      }),
    )
    return Promise.reject(error)
  }
}

export default refreshAccessToken
