import { Endpoints } from "@/constants"
import { axiosPrivateInstance } from "@/shared"
import { ReqChangePassword, SuccessReqMsg } from "@/types/api-types"

export const changePassword = (data: ReqChangePassword) => {
  return axiosPrivateInstance.put<SuccessReqMsg>(
    Endpoints.UPDATE_USER_PASSWORD,
    data,
  )
}
