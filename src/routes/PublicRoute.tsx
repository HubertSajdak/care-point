import { Navigate, useLocation } from "react-router-dom"

import { useAppSelector } from "@/app/hooks"
import { RouteNames } from "@/constants"

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const location = useLocation()
  return isAuthenticated ? (
    <Navigate
      to={location.state?.from ? location.state?.from : RouteNames.START}
    />
  ) : (
    children
  )
}

export default PublicRoute
