import { Endpoints } from "@/constants"
import { axiosPrivateInstance } from "@/shared"
import { SuccessReqMsg } from "@/types/api-types"

export const deletePhoto = () => {
  return axiosPrivateInstance.put<SuccessReqMsg>(Endpoints.DELETE_PHOTO)
}
