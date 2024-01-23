import { jwtDecode } from "jwt-decode"
import { useCallback, useEffect } from "react"
import { Navigate, useLocation } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { RouteNames } from "@/constants/routes"
import { logoutUser } from "@/features/auth/authSlice"
import refreshAccessToken from "@/utils/functions/refreshAccessToken"
import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
} from "@/utils/localStorage/localStorage"
const PrivateRoute = ({
  children,
  role,
}: {
  children: React.ReactNode
  role?: "doctor" | "patient"
}) => {
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const userRole = useAppSelector((state) => state.auth.user?.role)
  const accessToken = getAccessTokenFromLocalStorage()
  const refreshToken = getRefreshTokenFromLocalStorage()

  const validateTokens = useCallback(async () => {
    if (accessToken && refreshToken) {
      const currentTime = Math.floor(Date.now() / 1000)
      const decodedAccessToken = jwtDecode(accessToken)
      const decodedRefreshToken = jwtDecode(refreshToken)
      if (decodedRefreshToken.exp && decodedRefreshToken.exp < currentTime) {
        return dispatch(
          logoutUser({
            msg: "common:logoutMsg.sessionExpired",
            type: "error",
          }),
        )
      }
      if (decodedAccessToken.exp && decodedAccessToken.exp < currentTime) {
        await refreshAccessToken(refreshToken)
      }
    } else {
      return dispatch(
        logoutUser({
          msg: "common:logoutMsg.sessionExpired",
          type: "error",
        }),
      )
    }
  }, [accessToken, refreshToken, dispatch])
  useEffect(() => {
    if (isAuthenticated) {
      validateTokens()
    }
  }, [pathname, accessToken, refreshToken, isAuthenticated, validateTokens])
  return role && userRole && role !== userRole ? (
    <Navigate to={RouteNames.UNAUTHORIZED} />
  ) : isAuthenticated ? (
    children
  ) : (
    <Navigate state={{ from: pathname }} to={RouteNames.LOGIN} />
  )
}

export default PrivateRoute
