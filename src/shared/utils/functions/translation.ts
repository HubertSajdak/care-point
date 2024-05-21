import { IAppointmentStatus, IMonths, IWeekDays } from "@/types/api-types"

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
    return "common:weekDays.friday" // what about types?
  }
  if (day === "saturday") {
    return "common:weekDays.saturday"
  }
  if (day === "sunday") {
    return "common:weekDays.sunday"
  }
}

export const translateMonths = (month: IMonths) => {
  if (month === "january") {
    return "common:months.january" // what about types?
  }
  if (month === "february") {
    return "common:months.february"
  }
  if (month === "march") {
    return "common:months.march"
  }
  if (month === "april") {
    return "common:months.april"
  }
  if (month === "may") {
    return "common:months.may"
  }
  if (month === "june") {
    return "common:months.june"
  }
  if (month === "july") {
    return "common:months.july"
  }
  if (month === "august") {
    return "common:months.august"
  }
  if (month === "september") {
    return "common:months.september"
  }
  if (month === "october") {
    return "common:months.october"
  }
  if (month === "november") {
    return "common:months.november"
  }
  if (month === "december") {
    return "common:months.december"
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
