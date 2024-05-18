import { TimeView } from "@mui/x-date-pickers"
import dayjs, { Dayjs } from "dayjs"

import {
  IAppointment,
  IAppointmentStatus,
  IWorkingHours,
} from "@/types/api-types"

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
export const compareTime = (
  comparedTime: string,
  limitTime: string,
  comparison: "isAfter" | "isBefore" | "isAfterOrEqual" | "isBeforeOrEqual",
) => {
  if (comparison === "isAfterOrEqual") {
    return dayjs(comparedTime, "HH:mm").get("hour") ===
      dayjs(limitTime, "HH:mm").get("hour")
      ? dayjs(comparedTime, "HH:mm").get("minute") >=
          dayjs(limitTime, "HH:mm").get("minute")
      : dayjs(comparedTime, "HH:mm").get("hour") >=
          dayjs(limitTime, "HH:mm").get("hour")
  } else if (comparison === "isBefore") {
    return dayjs(comparedTime, "HH:mm").get("hour") ===
      dayjs(limitTime, "HH:mm").get("hour")
      ? dayjs(comparedTime, "HH:mm").get("minute") <
          dayjs(limitTime, "HH:mm").get("minute")
      : dayjs(comparedTime, "HH:mm").get("hour") <
          dayjs(limitTime, "HH:mm").get("hour")
  } else if (comparison === "isBeforeOrEqual") {
    return dayjs(comparedTime, "HH:mm").get("hour") ===
      dayjs(limitTime, "HH:mm").get("hour")
      ? dayjs(comparedTime, "HH:mm").get("minute") <=
          dayjs(limitTime, "HH:mm").get("minute")
      : dayjs(comparedTime, "HH:mm").get("hour") <=
          dayjs(limitTime, "HH:mm").get("hour")
  } else if (comparison === "isAfter") {
    return dayjs(comparedTime, "HH:mm").get("hour") ===
      dayjs(limitTime, "HH:mm").get("hour")
      ? dayjs(comparedTime, "HH:mm").get("minute") >
          dayjs(limitTime, "HH:mm").get("minute")
      : dayjs(comparedTime, "HH:mm").get("hour") >
          dayjs(limitTime, "HH:mm").get("hour")
  }
}

export const enabledTime = (
  date: Dayjs,
  workingTime: IWorkingHours[],
  appointments: IAppointment[],
  view: TimeView,
  consultationTime: number,
) => {
  const formattedSelectedDate = date.format("YYYY-MM-DD HH:mm")
  const findAppointmentDate = appointments?.filter(
    (appointment) =>
      appointment.appointmentDate.split(" ")[0] ===
      formattedSelectedDate.split(" ")[0],
  )
  const getHoursFromAppointments = findAppointmentDate.map((appointment) => {
    return {
      appointmentStart: appointment.appointmentDate,
      appointmentStop: appointment.estimatedEndDate,
    }
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
  let isEnabled =
    compareTime(getHoursFromDate, findWorkingDay.startTime, "isAfterOrEqual") &&
    compareTime(getHoursFromDate, findWorkingDay.stopTime, "isBefore")
  if (isEnabled && view === "minutes") {
    isEnabled = !getHoursFromAppointments.some((el) => {
      return (
        (compareTime(
          dayjs(getHoursFromDate, "HH:mm").format("HH:mm"),
          dayjs(el.appointmentStart, "YYYY-MM-DD HH:mm").format("HH:mm"),
          "isAfterOrEqual",
        ) &&
          compareTime(
            dayjs(getHoursFromDate, "HH:mm").format("HH:mm"),
            dayjs(el.appointmentStop, "YYYY-MM-DD HH:mm").format("HH:mm"),
            "isBefore",
          )) ||
        (compareTime(
          dayjs(getHoursFromDate, "HH:mm").format("HH:mm"),
          dayjs(el.appointmentStart, "YYYY-MM-DD HH:mm")
            .subtract(consultationTime, "minute")
            .format("HH:mm"),
          "isAfter",
        ) &&
          compareTime(
            dayjs(getHoursFromDate, "HH:mm").format("HH:mm"),
            dayjs(el.appointmentStart, "YYYY-MM-DD HH:mm").format("HH:mm"),
            "isBeforeOrEqual",
          )) ||
        (compareTime(
          dayjs(getHoursFromDate, "HH:mm").format("HH:mm"),
          dayjs(findWorkingDay.startTime, "HH:mm").format("HH:mm"),
          "isBeforeOrEqual",
        ) &&
          compareTime(
            dayjs(getHoursFromDate, "HH:mm").format("HH:mm"),
            dayjs(findWorkingDay.stopTime, "HH:mm")
              .subtract(consultationTime, "minute")
              .format("HH:mm"),
            "isAfter",
          ))
      )
    })
  }
  if (isEnabled && view === "hours") {
    // const findCurrentHourRelatedAppointments = appointments.filter(
    //   (el) =>
    //     dayjs(el.appointmentDate, "YYYY-MM-DD HH:mm").format(
    //       "YYYY-MM-DD HH",
    //     ) === date.format("YYYY-MM-DD HH") ||
    //     dayjs(el.estimatedEndDate, "YYYY-MM-DD HH:mm").format(
    //       "YYYY-MM-DD HH",
    //     ) === date.format("YYYY-MM-DD HH"),
    // )
    const isHourDisabled = false
    isEnabled = !isHourDisabled
  }
  return isEnabled
}

export const getCurrentMonthAppointments = (
  appointmentsArr: IAppointment[],
  status: IAppointmentStatus,
) => {
  const currentMonth = dayjs().format("MM")
  const currentYear = dayjs().format("YYYY")
  return appointmentsArr.filter((appointment) => {
    return (
      appointment.appointmentStatus === status &&
      dayjs(appointment.appointmentDate).format("MM") === currentMonth &&
      dayjs(appointment.appointmentDate).format("YYYY") === currentYear
    )
  })
}
export const getUpcomingAppointments = (appointmentsArr: IAppointment[]) => {
  return appointmentsArr.filter((appointment) => {
    return appointment.appointmentStatus === "active"
  })
}
export const getAppointmentsByMonth = (
  appointmentsArr: IAppointment[],
  monthInMMformat: string,
  status?: IAppointmentStatus,
) => {
  const currentYear = dayjs().format("YYYY")
  return appointmentsArr.filter((appointment) => {
    if (status) {
      return (
        dayjs(appointment.appointmentDate).format("MM") === monthInMMformat &&
        appointment.appointmentStatus === status &&
        dayjs(appointment.appointmentDate).format("YYYY") === currentYear
      )
    }
    return (
      dayjs(appointment.appointmentDate).format("MM") === monthInMMformat &&
      dayjs(appointment.appointmentDate).format("YYYY") === currentYear
    )
  })
}
export const calculateAge = (birthDate: string) => {
  const currentDate = dayjs().format("YYYY-MM-DD")
  const birth = dayjs(birthDate).format("YYYY-MM-DD")
  const calculatedAge = dayjs(birth).diff(currentDate, "years")
  return calculatedAge.toString().split("-")[1]
}
