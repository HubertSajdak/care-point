import { Endpoints } from "@/constants"
import { axiosPrivateInstance } from "@/shared"
import { SuccessReqMsg } from "@/types/api-types"

export interface RequestUpdateClinicAffiliationData {
  absenceTime: {
    from: string
    to: string
  }
  available: boolean
  clinicAffiliationId: string
  clinicId: string
  clinicName: string
  consultationFee: number
  reasonOfAbsence: string
  timePerPatient: number
  workingTime: {
    startTime?: string | undefined
    stopTime?: string | undefined
    weekDay: string
  }[]
}

export const updateAffiliation = (
  id: string,
  data: RequestUpdateClinicAffiliationData,
) => {
  const { clinicAffiliationId, ...rest } = data
  return axiosPrivateInstance.put<SuccessReqMsg>(
    `${Endpoints.GET_CLINIC_AFFILIATIONS}/${id}`,
    {
      ...rest,
    },
  )
}
