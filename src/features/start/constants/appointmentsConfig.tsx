import HowToRegIcon from "@mui/icons-material/HowToReg"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import PersonRemoveIcon from "@mui/icons-material/PersonRemove"
import React from "react"

import { getCurrentMonthAppointments } from "@/shared"
import { theme } from "@/styles/theme"
import { IAppointment } from "@/types/api-types"

export const appointmentsConfig = (userAppointments: IAppointment[]) => {
  return [
    {
      id: 0,
      text:
        userAppointments && userAppointments.length > 0
          ? getCurrentMonthAppointments(userAppointments, "completed").length
          : 0,
      title: "common:appointmentText.completed",
      iconColor: "",
      icon: <HowToRegIcon />,
    },
    {
      id: 1,
      text:
        userAppointments && userAppointments.length > 0
          ? getCurrentMonthAppointments(userAppointments, "active").length
          : 0,
      title: "common:appointmentText.active",
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
      title: "common:appointmentText.canceled",
      iconColor: theme.palette.warning.main,
      icon: <PersonRemoveIcon />,
      titleColor: theme.palette.warning.main,
    },
  ]
}
