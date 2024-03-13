import { Endpoints } from "@/constants"
import { axiosPrivateInstance } from "@/shared"
import { ISpecializations, SuccessReqData } from "@/types/api-types"

export const getSpecializations = () => {
  return axiosPrivateInstance<SuccessReqData<ISpecializations[]>>(
    Endpoints.GET_SPECIALIZATIONS,
  )
}
