import { useAppSelector } from "@/app/hooks"
import { RouteNames } from "@/constants/routes"
import { useEffect } from "react"
import { Navigate, useLocation } from "react-router-dom"

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const location = useLocation()
  useEffect(() => {
    console.log(location)
  }, [location])
  return isAuthenticated ? (
    <Navigate
      to={location.state?.from ? location.state?.from : RouteNames.START}
    />
  ) : (
    children
  )
}

export default PublicRoute
