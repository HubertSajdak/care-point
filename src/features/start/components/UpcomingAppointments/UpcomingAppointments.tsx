import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  Typography,
} from "@mui/material"
import List from "@mui/material/List"
import ListItemText from "@mui/material/ListItemText"
import React from "react"
import { useTranslation } from "react-i18next"
import { useTheme } from "styled-components"

import { useAppSelector } from "@/app/hooks"
import { BASE_URL, RouteNames, UserRoles } from "@/constants"
import { getUpcomingAppointments, LinkButton } from "@/shared"

function UpcomingAppointments() {
  const theme = useTheme()
  const userAppointments = useAppSelector(
    (state) => state.appointments.userAppointmentsData,
  )
  const { t } = useTranslation()
  const upcomingAppointments = getUpcomingAppointments(userAppointments || [])
  const user = useAppSelector((state) => state.auth.user)

  return (
    <>
      <Typography component="h4" mb={2} variant="h5">
        {t("common:upcomingAppointments")}
      </Typography>
      <List
        sx={{
          width: "100%",
          height: `calc(100% - ${theme.spacing(6)})`,
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
          sx={{ alignSelf: "flex-end", mr: 2, mt: 1 }}
          to={RouteNames.MY_APPOINTMENTS}
        >
          {t("buttons:seeMore")}
        </LinkButton>
      </List>
    </>
  )
}

export default UpcomingAppointments
