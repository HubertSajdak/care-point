import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import i18next from "i18next"
import { toast } from "react-toastify"

import {
  getAccessTokenFromLocalStorage,
  removeAccessTokenFromLocalStorage,
  removeRefreshTokenFromLocalStorage,
} from "@/shared/utils/localStorage/localStorage"
import { IDoctorUser, IPatientUser, ReqStatus } from "@/types/api-types"
import { Either } from "@/types/globals"

import { getUserData, loginUser, updateUserInfo } from "./authThunks"
export interface LogoutPayload {
  msg: string
  type: "error" | "success"
}
export interface InitialStateProps {
  isAuthenticated: boolean
  isRegistrationSuccessfull: boolean
  status: ReqStatus
  user: Either<IPatientUser, IDoctorUser> | null | undefined
}
const isAccessToken = getAccessTokenFromLocalStorage()
export const initialState: InitialStateProps = {
  isRegistrationSuccessfull: false,
  isAuthenticated: Boolean(isAccessToken),
  status: "idle",
  user: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRegistrationState(state, { payload }: PayloadAction<boolean>) {
      state.isRegistrationSuccessfull = payload
    },
    setIsAuthenticated(state, { payload }: { payload: boolean }) {
      state.isAuthenticated = payload
    },
    logoutUser: (state, { payload }: { payload: LogoutPayload }) => {
      removeAccessTokenFromLocalStorage()
      removeRefreshTokenFromLocalStorage()
      state.isAuthenticated = false
      if (payload.type === "error") {
        toast.error(i18next.t("common:logoutMsg.sessionExpired"))
      } else {
        toast.success(i18next.t(payload.msg))
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading"
        state.isAuthenticated = false
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.status = "idle"
        state.isAuthenticated = true
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = "idle"
        state.isAuthenticated = false
      })
      .addCase(getUserData.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getUserData.fulfilled, (state, { payload }) => {
        ;(state.status = "idle"), (state.user = payload)
      })
      .addCase(getUserData.rejected, (state) => {
        state.status = "error"
      })
      .addCase(updateUserInfo.pending, (state) => {
        state.status = "loading"
      })
      .addCase(updateUserInfo.fulfilled, (state) => {
        state.status = "idle"
      })
      .addCase(updateUserInfo.rejected, (state) => {
        state.status = "error"
      })
  },
})
export const { logoutUser, setIsAuthenticated, setRegistrationState } =
  authSlice.actions
export default authSlice.reducer
