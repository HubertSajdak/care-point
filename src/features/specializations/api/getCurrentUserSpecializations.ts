import { Endpoints } from "@/constants"
import { axiosPrivateInstance } from "@/shared"
import { IUserSpecializations, SuccessReqData } from "@/types/api-types"

export const getCurrentUserSpecializations = () => {
  return axiosPrivateInstance<SuccessReqData<IUserSpecializations[]>>(
    Endpoints.GET_CURRENT_USER_SPECIALIZATIONS,
  )
}
