import { jwtDecode } from "jwt-decode"
import { useCallback, useEffect } from "react"
import { Navigate, useLocation } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { RouteNames } from "@/constants"
import { logoutUser } from "@/redux"
import refreshAccessToken from "@/shared/utils/functions/refreshAccessToken"
import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
} from "@/shared/utils/localStorage/localStorage"

// what's the difference between private and public routes?

const PrivateRoute = ({
  children,
  role,
}: {
  children: ReactNode // instead of importing whole react you can just import ReactNode type. maybe someday react will be tree shakable :)
  role?: "doctor" | "patient"
}) => {
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const userRole = useAppSelector((state) => state.auth.user?.role)
  const accessToken = getAccessTokenFromLocalStorage()
  const refreshToken = getRefreshTokenFromLocalStorage()
  // why some data are kept in local storage, other in redux store?

  const validateTokens = useCallback(async () => {
    if (accessToken && refreshToken) {
      // this logic should be placed inside auth library. you should just use available methods, eg: getToken, isAuthenticated, getClaims, etc
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
  }, [pathname, accessToken, refreshToken, isAuthenticated, validateTokens]) // access token is static - it is read from local storage once (when component is mounted, it won't change). same with refresh token.
  // missing validation per request: make request, request return 403, then use refresh token to get access token - it should work like that
  // also there should be internal counter which will check access token expiration date and will call BE using refresh token to get new access token
  return role && userRole && role !== userRole ? (
    <Navigate to={RouteNames.UNAUTHORIZED} />
  ) : isAuthenticated ? (
    children
  ) : (
    <Navigate state={{ from: pathname }} to={RouteNames.LOGIN} />
  )
}

export default PrivateRoute
