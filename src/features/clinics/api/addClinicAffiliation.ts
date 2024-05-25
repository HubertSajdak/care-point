import { Endpoints } from "@/constants"
import { axiosPrivateInstance } from "@/shared"
import { SuccessReqMsg } from "@/types/api-types"

export interface RequestAddClinicAffiliationData {
  absenceTime: {
    from: string
    to: string
  }
  available: boolean
  clinicId: string
  clinicName: string
  consultationFee: number
  reasonOfAbsence?: string
  timePerPatient: number
  workingTime: {
    startTime: string
    stopTime: string
    weekDay: string
  }[]
}

export const addClinicAffiliation = (data: RequestAddClinicAffiliationData) => {
  return axiosPrivateInstance.post<SuccessReqMsg>(
    Endpoints.GET_CLINIC_AFFILIATIONS,
    {
      ...data,
    },
  )
}
