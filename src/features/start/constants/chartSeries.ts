import { t } from "i18next"

import { getAppointmentsByMonth } from "@/shared"
import { IAppointment } from "@/types/api-types"

export const chartSeries = (userAppointments: IAppointment[]) => {
  return [
    {
      label: t("appointment:status.completed"),
      data: [
        getAppointmentsByMonth(userAppointments || [], "01", "completed")
          .length,
        getAppointmentsByMonth(userAppointments || [], "02", "completed")
          .length,
        getAppointmentsByMonth(userAppointments || [], "03", "completed")
          .length,
        getAppointmentsByMonth(userAppointments || [], "04", "completed")
          .length,
        getAppointmentsByMonth(userAppointments || [], "05", "completed")
          .length,
        getAppointmentsByMonth(userAppointments || [], "06", "completed")
          .length,
        getAppointmentsByMonth(userAppointments || [], "07", "completed")
          .length,
        getAppointmentsByMonth(userAppointments || [], "08", "completed")
          .length,
        getAppointmentsByMonth(userAppointments || [], "09", "completed")
          .length,
        getAppointmentsByMonth(userAppointments || [], "10", "completed")
          .length,
        getAppointmentsByMonth(userAppointments || [], "11", "completed")
          .length,
        getAppointmentsByMonth(userAppointments || [], "12", "completed")
          .length,
      ],
    },
    {
      label: t("appointment:status.active"),
      data: [
        getAppointmentsByMonth(userAppointments || [], "01", "active").length,
        getAppointmentsByMonth(userAppointments || [], "02", "active").length,
        getAppointmentsByMonth(userAppointments || [], "03", "active").length,
        getAppointmentsByMonth(userAppointments || [], "04", "active").length,
        getAppointmentsByMonth(userAppointments || [], "05", "active").length,
        getAppointmentsByMonth(userAppointments || [], "06", "active").length,
        getAppointmentsByMonth(userAppointments || [], "07", "active").length,
        getAppointmentsByMonth(userAppointments || [], "08", "active").length,
        getAppointmentsByMonth(userAppointments || [], "09", "active").length,
        getAppointmentsByMonth(userAppointments || [], "10", "active").length,
        getAppointmentsByMonth(userAppointments || [], "11", "active").length,
        getAppointmentsByMonth(userAppointments || [], "12", "active").length,
      ],
    },
    {
      label: t("appointment:status.canceled"),
      data: [
        getAppointmentsByMonth(userAppointments || [], "01", "canceled").length,
        getAppointmentsByMonth(userAppointments || [], "02", "canceled").length,
        getAppointmentsByMonth(userAppointments || [], "03", "canceled").length,
        getAppointmentsByMonth(userAppointments || [], "04", "canceled").length,
        getAppointmentsByMonth(userAppointments || [], "05", "canceled").length,
        getAppointmentsByMonth(userAppointments || [], "06", "canceled").length,
        getAppointmentsByMonth(userAppointments || [], "07", "canceled").length,
        getAppointmentsByMonth(userAppointments || [], "08", "canceled").length,
        getAppointmentsByMonth(userAppointments || [], "09", "canceled").length,
        getAppointmentsByMonth(userAppointments || [], "10", "canceled").length,
        getAppointmentsByMonth(userAppointments || [], "11", "canceled").length,
        getAppointmentsByMonth(userAppointments || [], "12", "canceled").length,
      ],
    },
  ]
}
