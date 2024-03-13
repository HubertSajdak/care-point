import dayjs, { Dayjs } from "dayjs"

import { IAppointment, IWorkingHours } from "@/types/api-types"

export const mapDayNamesToNumbers = (weekDay: string): number | undefined => {
  if (weekDay === "monday") return 1
  if (weekDay === "tuesday") return 2
  if (weekDay === "wednesday") return 3
  if (weekDay === "thursday") return 4
  if (weekDay === "friday") return 5
  if (weekDay === "saturday") return 6
  if (weekDay === "sunday") return 0
}

export const enabledDays = (date: Dayjs, workingTime: IWorkingHours[]) => {
  const day = dayjs(date).day()
  const disabledDays = workingTime.map((day) => {
    if (!day.startTime && !day.stopTime) {
      return mapDayNamesToNumbers(day.weekDay)
    }
    return null
  })
  if (disabledDays) {
    return disabledDays.includes(day)
  }
  return true
}

export const enabledTime = (
  date: Dayjs,
  workingTime: IWorkingHours[],
  appointments: IAppointment[],
) => {
  const formattedSelectedDate = date.format("YYYY-MM-DD HH:mm")
  const findAppointmentDate = appointments?.filter(
    (appointment) =>
      appointment.appointmentDate.split(" ")[0] ===
      formattedSelectedDate.split(" ")[0],
  )
  const getHoursFromAppointments = findAppointmentDate.map((appointment) => {
    return appointment.appointmentDate
  })
  const findWorkingDay = workingTime.find(
    (el) => el.weekDay === dayjs(date).format("dddd").toLowerCase(),
  )
  if (
    !findWorkingDay ||
    !findWorkingDay.startTime ||
    !findWorkingDay.stopTime
  ) {
    return false
  }
  const getHoursFromDate = dayjs(date).format("HH:mm")

  return (
    dayjs(getHoursFromDate, "HH:mm") >
      dayjs(findWorkingDay.startTime, "HH:mm") &&
    dayjs(getHoursFromDate, "HH:mm") <
      dayjs(findWorkingDay.stopTime, "HH:mm") &&
    !getHoursFromAppointments.some((el) => {
      return (
        dayjs(el).format("YYYY-MM-DD HH:mm").split(" ")[1] ===
        dayjs(getHoursFromDate, "HH:mm")
          .format("YYYY-MM-DD HH:mm")
          .split(" ")[1]
      )
    })
  )
}
