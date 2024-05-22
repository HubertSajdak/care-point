import { useCallback, useEffect } from "react"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import {
  BASE_URL,
  doctorSidebarLinks,
  patientSidebarLinks,
  UserRoles,
} from "@/constants"
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout"
import { getUserData } from "@/shared/store"

const DashboardLayoutWrapper = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector((state) => state.auth.status)
  const user = useAppSelector((state) => state.auth.user)
  const fetchUserData = useCallback(async () => {
    await dispatch(getUserData())
  }, [dispatch])
  useEffect(() => {
    fetchUserData()
  }, [dispatch, fetchUserData])

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
