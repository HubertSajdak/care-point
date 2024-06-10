import { Grid, Typography } from "@mui/material"
import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { SortDirection } from "@/constants"
import { getCurrentUserAppointments, setQueryParams } from "@/shared/store"

import AppointmentsChart from "../components/AppointmentsChart/AppointmentsChart"
import AppointmentsInfoCards from "../components/AppointmentsInfoCards/AppointmentsInfoCards"
import UpcomingAppointments from "../components/UpcomingAppointments/UpcomingAppointments"
import { appointmentsConfig } from "../constants/appointmentsConfig"

const Start = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)
  const userAppointments = useAppSelector(
    (state) => state.appointments.userAppointmentsData,
  )
  useEffect(() => {
    dispatch(setQueryParams({ pageSize: 100 }))
    dispatch(
      setQueryParams({
        sortDirection: SortDirection.DESCENDING,
        sortBy: "appointmentDate",
      }),
    )
    dispatch(getCurrentUserAppointments())
    return () => {
      dispatch(setQueryParams({ pageSize: 5 }))
      dispatch(
        setQueryParams({
          sortDirection: SortDirection.ASCENDING,
          sortBy: "appointmentDate",
        }),
      )
    }
  }, [dispatch])

  return (
    <div>
      <Typography component="h2" fontWeight="bold" mb={2} variant="h4">
        {t("common:welcome")}, {user?.name} {user?.surname}
      </Typography>
      <Typography component="h3" mb={2} variant="subtitle1">
        {t("common:yourCurrentMonthUpdates")}
      </Typography>
      <Grid alignItems="stretch" columnSpacing={4} rowSpacing={4} container>
        {userAppointments && userAppointments.length > 0 && (
          <AppointmentsInfoCards
            appointmentsConfig={appointmentsConfig(userAppointments)}
          />
        )}
        <Grid lg={8} xs={12} item>
          <AppointmentsChart />
        </Grid>
        <Grid lg={4} xs={12} item>
          <UpcomingAppointments />
        </Grid>
      </Grid>
    </div>
  )
}

export default Start
