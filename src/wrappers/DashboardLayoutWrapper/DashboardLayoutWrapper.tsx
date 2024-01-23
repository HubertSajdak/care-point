import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { BASE_URL } from "@/constants/endpoints"
import { doctorSidebarLinks } from "@/constants/sidebarLinks"
import { getUserData } from "@/features/auth/authThunks"
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout"
import { useEffect } from "react"

const DashboardLayoutWrapper = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector((state) => state.auth.status)
  const user = useAppSelector((state) => state.auth.user)
  const fetchUserData = async () => {
    await dispatch(getUserData())
  }
  useEffect(() => {
    fetchUserData()
  }, [dispatch])

  return (
    <DashboardLayout
      sidebarLinks={doctorSidebarLinks}
      userName={`${user?.name} ${user?.surname}` || ""}
      userAvatar={`${BASE_URL}/${user?.photo}` || ""}
      isUserDataLoading={Boolean(status === "loading")}
    />
  )
}

export default DashboardLayoutWrapper
