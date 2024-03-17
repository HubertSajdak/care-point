import FavoriteIcon from "@mui/icons-material/Favorite"
import { Grid, Paper, Typography } from "@mui/material"
import dayjs from "dayjs"
import { t } from "i18next"
import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useTheme } from "styled-components"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { RouteNames } from "@/constants"
import { getSingleDoctor } from "@/features/doctors"
import { getDoctorAppointments } from "@/redux"
import { getAppointmentsByMonth, LinkButton } from "@/shared"

import AppointmentsInfoCard from "../components/AppointmentsInfoCard/AppointmentsInfoCard"
import DoctorBaseInfoCard from "../components/DoctorBaseInfoCard/DoctorBaseInfoCard"
import DoctorClinicsCard from "../components/DoctorClinicsCard/DoctorClinicsCard"

const SingleDoctor = () => {
  const theme = useTheme()
  const params = useParams()
  const dispatch = useAppDispatch()
  const doctorAppointments = useAppSelector(
    (state) => state.appointments.doctorAppointments,
  )
  useEffect(() => {
    if (params.doctorId) {
      dispatch(getSingleDoctor(params.doctorId))
      dispatch(getDoctorAppointments(params.doctorId))
    }
  }, [dispatch, params.doctorId])
  const currentMonth = dayjs().format("MM")
  const appointmentInfoCardConfig = [
    {
      id: 0,
      title: t("appointment:doctorCard.completedAppointments"),
      text: getAppointmentsByMonth(
        doctorAppointments?.data || [],
        currentMonth,
        "completed",
      ).length,
      icon: <FavoriteIcon color="info" />,
      iconBorderColor: theme.palette.info.main,
      titleColor: theme.palette.info.main,
    },
    {
      id: 1,
      title: t("appointment:doctorCard.incomingAppointments"),
      text: getAppointmentsByMonth(
        doctorAppointments?.data || [],
        currentMonth,
        "active",
      ).length,
      icon: <FavoriteIcon color="primary" />,
      iconBorderColor: theme.palette.primary.main,
      titleColor: theme.palette.primary.main,
    },
  ]
  return (
    <div>
      <Typography component="h2" fontWeight="bold" mb={2} variant="h4">
        {t("common:doctorProfile")}
      </Typography>
      <Grid alignItems={"stretch"} columnGap={3} rowSpacing={3} container>
        <Grid xs={12} item>
          <DoctorBaseInfoCard />
        </Grid>
        {appointmentInfoCardConfig.map((el) => {
          return (
            <Grid key={el.id} item xs>
              <AppointmentsInfoCard
                icon={el.icon}
                iconBorderColor={el.iconBorderColor}
                text={el.text}
                title={el.title}
                titleColor={el.titleColor}
              />
            </Grid>
          )
        })}
        <Grid xs={12} item>
          <Typography component="h3" mb={2} variant="h5">
            {t("common:doctorClinicAffiliations")}
          </Typography>
          <DoctorClinicsCard />
        </Grid>
        <Grid xs={12} item>
          <Paper sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
            <LinkButton
              to={`${RouteNames.MAKE_APPOINTMENT}/${params.doctorId}`}
            >
              {t("common:makeAppointment")}
            </LinkButton>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default SingleDoctor
