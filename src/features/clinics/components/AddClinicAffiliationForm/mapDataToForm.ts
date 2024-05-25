import { AddClinicAffiliationValues } from "../../schemas/addClinicAffiliation"

export const mapDataToForm = (
  doctorId: string | undefined,
  clinicId: string | undefined,
  clinicName: string | undefined,
): AddClinicAffiliationValues => {
  return {
    doctorId: doctorId || "",
    clinicId: clinicId || "",
    clinicName: clinicName || "",
    workingTime: [
      {
        weekDay: "monday",
        startTime: "",
        stopTime: "",
      },
      {
        weekDay: "tuesday",
        startTime: "",
        stopTime: "",
      },
      {
        weekDay: "wednesday",
        startTime: "",
        stopTime: "",
      },
      {
        weekDay: "thursday",
        startTime: "",
        stopTime: "",
      },
      {
        weekDay: "friday",
        startTime: "",
        stopTime: "",
      },
      {
        weekDay: "saturday",
        startTime: "",
        stopTime: "",
      },
      {
        weekDay: "sunday",
        startTime: "",
        stopTime: "",
      },
    ],
    available: true,
    reasonOfAbsence: "",
    absenceTime: {
      from: "",
      to: "",
    },
    consultationFee: 100,
    timePerPatient: 15,
  }
}
