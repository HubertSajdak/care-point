import { useAppSelector } from "@/app/hooks"
import {
  BASE_URL,
  doctorSidebarLinks,
  patientSidebarLinks,
  UserRoles,
} from "@/constants"
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout"
import useGetUserData from "@/shared/hooks/useGetUserData"

const DashboardLayoutWrapper = () => {
  useGetUserData()
  const status = useAppSelector((state) => state.auth.status)
  const user = useAppSelector((state) => state.auth.user)

  return (
    <DashboardLayout
      isUserDataLoading={Boolean(status === "loading")}
      sidebarLinks={
        user?.role === UserRoles.DOCTOR
          ? doctorSidebarLinks
          : patientSidebarLinks
      }
      userAvatar={`${BASE_URL}/${user?.photo}` || ""}
      userName={`${user?.name} ${user?.surname}` || ""}
    />
  )
}

export default DashboardLayoutWrapper
