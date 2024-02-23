import { IAppointmentStatus, IWeekDays } from "@/types/api-types"

export const translateWeekDays = (day: IWeekDays) => {
  if (day === "monday") {
    return "common:weekDays.monday"
  }
  if (day === "tuesday") {
    return "common:weekDays.tuesday"
  }
  if (day === "wednesday") {
    return "common:weekDays.wednesday"
  }
  if (day === "thursday") {
    return "common:weekDays.thursday"
  }
  if (day === "friday") {
    return "common:weekDays.friday"
  }
  if (day === "saturday") {
    return "common:weekDays.saturday"
  }
  if (day === "sunday") {
    return "common:weekDays.sunday"
  }
}

export const translateAppointmentStatus = (status: IAppointmentStatus) => {
  if (status === "active") {
    return "appointment:status.active"
  }
  if (status === "completed") {
    return "appointment:status.completed"
  }
  if (status === "canceled") {
    return "appointment:status.canceled"
  }
  if (status === "postponed") {
    return "appointment:status.postponed"
  }
}
