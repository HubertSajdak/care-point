import { Endpoints } from "@/constants"
import { axiosPrivateInstance } from "@/shared"
import { SuccessReqMsg } from "@/types/api-types"

export const deleteUserSpecialization = (specializationId: string) => {
  return axiosPrivateInstance.delete<SuccessReqMsg>(
    `${Endpoints.GET_USER_SPECIALIZATIONS}/${specializationId}`,
  )
}
