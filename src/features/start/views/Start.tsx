import HowToRegIcon from "@mui/icons-material/HowToReg"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import PersonRemoveIcon from "@mui/icons-material/PersonRemove"
import {
  Avatar,
  Divider,
  Grid,
  ListItem,
  ListItemAvatar,
  Paper,
  Typography,
} from "@mui/material"
import List from "@mui/material/List"
import ListItemText from "@mui/material/ListItemText"
import { BarChart } from "@mui/x-charts"
import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useTheme } from "styled-components"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { BASE_URL, RouteNames, SortDirection, UserRoles } from "@/constants"
import { getCurrentUserAppointments, setQueryParams } from "@/redux"
import {
  getAppointmentsByMonth,
  getCurrentMonthAppointments,
  getUpcomingAppointments,
  LinkButton,
  translateMonths,
} from "@/shared"

import InfoCard from "../components/InfoCard/InfoCard"

const Start = () => {
  const { t } = useTranslation()
  const theme = useTheme()
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

  const appointmentsConfig = [
    {
      id: 0,
      text:
        userAppointments && userAppointments.length > 0
          ? getCurrentMonthAppointments(userAppointments, "completed").length
          : 0,
      title: t("common:appointmentText.completed"),
      iconColor: "",
      icon: <HowToRegIcon />,
    },
    {
      id: 1,
      text:
        userAppointments && userAppointments.length > 0
          ? getCurrentMonthAppointments(userAppointments, "active").length
          : 0,
      title: t("common:appointmentText.active"),
      iconColor: theme.palette.primary.main,
      icon: <PersonAddIcon />,
      titleColor: theme.palette.primary.main,
    },
    {
      id: 2,
      text:
        userAppointments && userAppointments.length > 0
          ? getCurrentMonthAppointments(userAppointments, "canceled").length
          : 0,
      title: t("common:appointmentText.canceled"),
      iconColor: theme.palette.warning.main,
      icon: <PersonRemoveIcon />,
      titleColor: theme.palette.warning.main,
    },
  ]
  const upcomingAppointments = getUpcomingAppointments(userAppointments || [])
  return (
    <div>
      <Typography component="h2" fontWeight="bold" mb={2} variant="h4">
        {t("common:welcome")}, {user?.name} {user?.surname}
      </Typography>
      <Typography component="h3" mb={2} variant="subtitle1">
        {t("common:yourCurrentMonthUpdates")}
      </Typography>
      <Grid alignItems="stretch" columnSpacing={4} rowSpacing={4} container>
        {appointmentsConfig && appointmentsConfig.length > 0
          ? appointmentsConfig?.map((el) => {
              return (
                <Grid key={el.id} lg={4} xs={12} item>
                  <InfoCard
                    icon={el.icon}
                    iconColor={el.iconColor}
                    key={el.id}
                    text={el.text}
                    title={el.title}
                    titleColor={el.titleColor}
                  />
                </Grid>
              )
            })
          : null}

        <Grid lg={8} xs={12} item>
          <Typography component="h4" mb={2} variant="h5">
            {t("common:yearlyAppointmentsChart")}
          </Typography>
          <Paper
            sx={{
              width: "100%",
              height: `calc(100% - 48px)`,
              boxShadow: theme.mainShadow.main,
            }}
          >
            <BarChart
              colors={[
                theme.palette.grey[500],
                theme.palette.primary.main,
                theme.palette.warning.main,
              ]}
              height={430}
              series={[
                {
                  label: t("appointment:status.completed"),
                  data: [
                    getAppointmentsByMonth(
                      userAppointments || [],
                      "01",
                      "completed",
                    ).length,
                    getAppointmentsByMonth(
                      userAppointments || [],
                      "02",
                      "completed",
                    ).length,
                    getAppointmentsByMonth(
                      userAppointments || [],
                      "03",
                      "completed",
                    ).length,
                    getAppointmentsByMonth(
                      userAppointments || [],
                      "04",
                      "completed",
                    ).length,
                    getAppointmentsByMonth(
                      userAppointments || [],
                      "05",
                      "completed",
                    ).length,
                    getAppointmentsByMonth(
                      userAppointments || [],
                      "06",
                      "completed",
                    ).length,
                    getAppointmentsByMonth(
                      userAppointments || [],
                      "07",
                      "completed",
                    ).length,
                    getAppointmentsByMonth(
                      userAppointments || [],
                      "08",
                      "completed",
                    ).length,
                    getAppointmentsByMonth(
                      userAppointments || [],
                      "09",
                      "completed",
                    ).length,
                    getAppointmentsByMonth(
                      userAppointments || [],
                      "10",
                      "completed",
                    ).length,
                    getAppointmentsByMonth(
                      userAppointments || [],
                      "11",
                      "completed",
                    ).length,
                    getAppointmentsByMonth(
                      userAppointments || [],
                      "12",
                      "completed",
                    ).length,
                  ],
                },
                {
                  label: t("appointment:status.active"),
                  data: [
                    getAppointmentsByMonth(
                      userAppointments || [],
                      "01",
                      "active",
                    ).length,
                    getAppointmentsByMonth(
                      userAppointments || [],
                      "02",
                      "active",
                    ).length,
                    getAppointmentsByMonth(
                      userAppointments || [],
                      "03",
                      "active",
                    ).length,
                    getAppointmentsByMonth(
                      userAppointments || [],
                      "04",
                      "active",
                    ).length,
                    getAppointmentsByMonth(
                      userAppointments || [],
                      "05",
                      "active",
                    ).length,
                    getAppointmentsByMonth(
                      userAppointments || [],
                      "06",
                      "active",
                    ).length,
                    getAppointmentsByMonth(
                      userAppointments || [],
                      "07",
                      "active",
                    ).length,
                    getAppointmentsByMonth(
                      userAppointments || [],
                      "08",
                      "active",
                    ).length,
                    getAppointmentsByMonth(
                      userAppointments || [],
                      "09",
                      "active",
                    ).length,
                    getAppointmentsByMonth(
                      userAppointments || [],
                      "10",
                      "active",
                    ).length,
                    getAppointmentsByMonth(
                      userAppointments || [],
                      "11",
                      "active",
                    ).length,
                    getAppointmentsByMonth(
                      userAppointments || [],
                      "12",
                      "active",
                    ).length,
                  ],
                },
                {
                  label: t("appointment:status.canceled"),
                  data: [
                    getAppointmentsByMonth(
                      userAppointments || [],
                      "01",
                      "canceled",
                    ).length,
                    getAppointmentsByMonth(
                      userAppointments || [],
                      "02",
                      "canceled",
                    ).length,
                    getAppointmentsByMonth(
                      userAppointments || [],
                      "03",
                      "canceled",
                    ).length,
                    getAppointmentsByMonth(
                      userAppointments || [],
                      "04",
                      "canceled",
                    ).length,
                    getAppointmentsByMonth(
                      userAppointments || [],
                      "05",
                      "canceled",
                    ).length,
                    getAppointmentsByMonth(
                      userAppointments || [],
                      "06",
                      "canceled",
                    ).length,
                    getAppointmentsByMonth(
                      userAppointments || [],
                      "07",
                      "canceled",
                    ).length,
                    getAppointmentsByMonth(
                      userAppointments || [],
                      "08",
                      "canceled",
                    ).length,
                    getAppointmentsByMonth(
                      userAppointments || [],
                      "09",
                      "canceled",
                    ).length,
                    getAppointmentsByMonth(
                      userAppointments || [],
                      "10",
                      "canceled",
                    ).length,
                    getAppointmentsByMonth(
                      userAppointments || [],
                      "11",
                      "canceled",
                    ).length,
                    getAppointmentsByMonth(
                      userAppointments || [],
                      "12",
                      "canceled",
                    ).length,
                  ],
                },
              ]}
              slotProps={{
                legend: {
                  itemMarkWidth: 16,
                  itemMarkHeight: 16,
                },
              }}
              width={undefined}
              xAxis={[
                {
                  id: "barCategories",
                  data: [
                    t(translateMonths("january")),
                    t(translateMonths("february")),
                    t(translateMonths("march")),
                    t(translateMonths("april")),
                    t(translateMonths("may")),
                    t(translateMonths("june")),
                    t(translateMonths("july")),
                    t(translateMonths("august")),
                    t(translateMonths("september")),
                    t(translateMonths("october")),
                    t(translateMonths("november")),
                    t(translateMonths("december")),
                  ],
                  scaleType: "band",
                },
              ]}
              yAxis={[
                {
                  label: t("common:appointmentsNumber"),
                },
              ]}
            />
          </Paper>
        </Grid>
        <Grid lg={4} xs={12} item>
          <Typography component="h4" mb={2} variant="h5">
            {t("common:upcomingAppointments")}
          </Typography>
          <List
            sx={{
              width: "100%",
              height: "calc(100% - 46px)",
              bgcolor: "background.paper",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              borderRadius: theme.spacing(2.5),
              boxShadow: theme.mainShadow.main,
            }}
          >
            {upcomingAppointments && upcomingAppointments.length > 0 ? (
              upcomingAppointments.slice(0, 5).map((el) => {
                return (
                  <div key={el._id}>
                    <ListItem>
                      {user?.role === UserRoles.PATIENT && el.doctorInfo && (
                        <>
                          <ListItemAvatar>
                            <Avatar
                              key={el._id}
                              src={
                                upcomingAppointments &&
                                upcomingAppointments.length > 0
                                  ? BASE_URL + `${el.doctorInfo.photo}`
                                  : ""
                              }
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={`${el.doctorInfo.name} ${el.doctorInfo.surname}`}
                            secondary={`${el.appointmentDate}`}
                          />
                        </>
                      )}
                      {user?.role === UserRoles.DOCTOR && el.patientInfo && (
                        <>
                          <ListItemAvatar>
                            <Avatar
                              key={el._id}
                              src={
                                upcomingAppointments &&
                                upcomingAppointments.length > 0
                                  ? BASE_URL + `${el.patientInfo.photo}`
                                  : ""
                              }
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={`${el.patientInfo.name} ${el.patientInfo.surname}`}
                            secondary={`${el.appointmentDate}`}
                          />
                        </>
                      )}
                    </ListItem>
                    <Divider orientation="horizontal" />
                  </div>
                )
              })
            ) : (
              <ListItem key={"last"}>
                <ListItemText sx={{ textAlign: "center" }}>
                  {t("common:noUpcomingAppointments")}
                </ListItemText>
              </ListItem>
            )}
            <LinkButton
              key={"link-button"}
              sx={{ alignSelf: "flex-end", mr: "16px", mt: "8px" }}
              to={RouteNames.MY_APPOINTMENTS}
            >
              {t("buttons:seeMore")}
            </LinkButton>
          </List>
        </Grid>
      </Grid>
    </div>
  )
}

export default Start
