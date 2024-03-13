import { Endpoints } from "@/constants"
import { axiosPrivateInstance } from "@/shared"
import { SuccessReqMsg } from "@/types/api-types"

export const createUserSpecialization = (specializationId: string) => {
  return axiosPrivateInstance.post<SuccessReqMsg>(
    Endpoints.GET_CURRENT_USER_SPECIALIZATIONS,
    { specializationId },
  )
}
