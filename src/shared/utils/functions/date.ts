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
  comparison: "isAfter" | "isBefore" | "isSameOrBefore",
) => {
  if (comparison === "isAfter") {
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
  } else if (comparison === "isSameOrBefore") {
    return dayjs(limitTime, "HH:mm").get("hour") ===
      dayjs(comparedTime, "HH:mm").get("hour")
      ? dayjs(comparedTime, "HH:mm").get("minute") <=
          dayjs(limitTime, "HH:mm").get("minute")
      : dayjs(comparedTime, "HH:mm").get("hour") <=
          dayjs(limitTime, "HH:mm").get("hour")
  }
  // return dayjs(getHoursFromDate, "HH:mm").get("hour") ===
  //   dayjs(currentTime, "HH:mm").get("hour")
  //   ? dayjs(currentTime, "HH:mm").get("minute") <=
  //       dayjs(getHoursFromDate, "HH:mm").get("minute")
  //   : dayjs(currentTime, "HH:mm").get("hour") <=
  //       dayjs(getHoursFromDate, "HH:mm").get("hour")
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
  const currentTime = dayjs().format("HH:mm")
  if (dayjs(date).format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD")) {
    // return dayjs(getHoursFromDate, "HH:mm").get("hour") ===
    //   dayjs(currentTime, "HH:mm").get("hour")
    //   ? dayjs(currentTime, "HH:mm").get("minute") <=
    //       dayjs(getHoursFromDate, "HH:mm").get("minute")
    //   : dayjs(currentTime, "HH:mm").get("hour") <=
    //       dayjs(getHoursFromDate, "HH:mm").get("hour")
    return compareTime(currentTime, getHoursFromDate, "isSameOrBefore")
  }
  return (
    compareTime(getHoursFromDate, findWorkingDay.startTime, "isAfter") &&
    compareTime(getHoursFromDate, findWorkingDay.stopTime, "isBefore") &&
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

// export const calculateNextAvailableDates = (
//   doctorClinicsAffiliations: IClinicAffiliation[],
//   doctorAppointments: IAppointment[],
// ) => {
//   const workingTimeArr = doctorClinicsAffiliations?.map((el) => {
//     return {
//       clinicName: el.clinicName,
//       consultationTime: el.timePerPatient,
//       workingTime: el.workingTime,
//     }
//   })
//   const availableDates = workingTimeArr
//     .map((workingTime) => {
//       return workingTime.workingTime
//         .map((el) => {
//           if (el.startTime && el.stopTime) {
//             const generatedDates: {
//               availableHours: string[]
//               clinicName: string
//               date: string
//               startTime: string
//               stopTime: string
//             }[] = []
//             for (let i = 0; i < 30; i++) {
//               const currentDate = dayjs().locale("en-GB")
//               const currentDateFormatted = currentDate
//                 .add(i, "day")
//                 .format("YYYY-MM-DD,dddd")
//                 .toLowerCase()
//               if (
//                 el.weekDay.toString() ===
//                 currentDateFormatted.split(",")[1].toString()
//               )
//                 generatedDates.push({
//                   date: currentDateFormatted,
//                   availableHours: [],
//                   startTime: el.startTime,
//                   stopTime: el.stopTime,
//                   clinicName: workingTime.clinicName,
//                 })
//             }
//             return generatedDates
//           }
//         })
//         .map((workingDates) => {
//           return workingDates?.map((workingDate) => {
//             const workingTimeDiff = dayjs(
//               `2024-03-19 ${workingDate?.startTime}`,
//             ).diff(dayjs(`2024-03-19 ${workingDate?.stopTime}`), "minute")
//             const minutesStep = Math.abs(
//               workingTimeDiff / workingTime.consultationTime,
//             )
//             const availableHours = []
//             for (let n = 0; n < minutesStep; n++) {
//               const workDayStart = dayjs(`2024-03-19,${workingDate?.startTime}`)
//               const calculatedHour = workDayStart
//                 .add(n * workingTime.consultationTime, "minute")
//                 .format("HH:mm")
//
//               availableHours.push(calculatedHour)
//             }
//             return {
//               date: workingDate?.date,
//               availableHours,
//               clinicName: workingDate?.clinicName,
//             }
//           })
//         })
//         .filter((el) => el !== undefined)
//     })
//     .reduce((acc, cur) => acc?.concat(cur), [])
//     .reduce((acc, cur) => acc?.concat(cur), [])
//     ?.map((el) => {
//       return el.availableHours.map((hour) => {
//         const currentDay = dayjs().format("YYYY-MM-DD")
//         const currentTime = dayjs().format("HH:mm")
//         const relatedAppointment = doctorAppointments.find(
//           (appointment) =>
//             appointment.appointmentDate.split(" ")[0] === el.date.split(",")[0],
//         )
//         if (
//           relatedAppointment?.appointmentDate.split(" ")[1] === hour ||
//           dayjs(`${currentDay} ${currentTime}`) >=
//             dayjs(`${currentDay} ${hour}`)
//         )
//           return
//
//         return {
//           date: el.date.split(",")[0],
//           time: hour,
//           clinicName: el.clinicName,
//         }
//       })
//     })
//     .reduce((acc, cur) => (acc = acc?.concat(cur)), [])
//     .filter((el) => el !== undefined)
//     .sort((a, b) => {
//       const dateA = new Date(`${a!.date} ${a!.time}`)
//       const dateB = new Date(`${b!.date} ${b!.time}`)
//       return dateA.getTime() - dateB.getTime()
//     })
//   return availableDates
// }
