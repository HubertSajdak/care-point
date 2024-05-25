import { IClinicAffiliation } from "@/types/api-types"

import { AddClinicAffiliationValues } from "../../schemas/addClinicAffiliation"

interface EditClinicAffiliationValues extends AddClinicAffiliationValues {
  clinicAffiliationId: string
}

export const mapDataToForm = (
  singleClinicAffiliation: IClinicAffiliation | null,
): EditClinicAffiliationValues => {
  return {
    doctorId: singleClinicAffiliation?.doctorId || "",
    clinicId: singleClinicAffiliation?.clinicId || "",
    clinicName: singleClinicAffiliation?.clinicName || "",
    clinicAffiliationId: singleClinicAffiliation?._id || "",
    workingTime: [
      {
        weekDay: "monday",
        startTime: singleClinicAffiliation?.workingTime[0].startTime || "",
        stopTime: singleClinicAffiliation?.workingTime[0].stopTime || "",
      },
      {
        weekDay: "tuesday",
        startTime: singleClinicAffiliation?.workingTime[1].startTime || "",
        stopTime: singleClinicAffiliation?.workingTime[1].stopTime || "",
      },
      {
        weekDay: "wednesday",
        startTime: singleClinicAffiliation?.workingTime[2].startTime || "",
        stopTime: singleClinicAffiliation?.workingTime[2].stopTime || "",
      },
      {
        weekDay: "thursday",
        startTime: singleClinicAffiliation?.workingTime[3].startTime || "",
        stopTime: singleClinicAffiliation?.workingTime[3].stopTime || "",
      },
      {
        weekDay: "friday",
        startTime: singleClinicAffiliation?.workingTime[4].startTime || "",
        stopTime: singleClinicAffiliation?.workingTime[4].stopTime || "",
      },
      {
        weekDay: "saturday",
        startTime: singleClinicAffiliation?.workingTime[5].startTime || "",
        stopTime: singleClinicAffiliation?.workingTime[5].stopTime || "",
      },
      {
        weekDay: "sunday",
        startTime: singleClinicAffiliation?.workingTime[6].startTime || "",
        stopTime: singleClinicAffiliation?.workingTime[6].stopTime || "",
      },
    ],
    available: true,
    reasonOfAbsence: "",
    absenceTime: {
      from: "",
      to: "",
    },
    consultationFee: singleClinicAffiliation?.consultationFee || 0,
    timePerPatient: singleClinicAffiliation?.timePerPatient || 15,
  }
}
