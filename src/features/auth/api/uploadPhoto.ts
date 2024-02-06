import { Endpoints } from "@/constants"
import { axiosPrivateInstance } from "@/shared"
import { SuccessReqMsg } from "@/types/api-types"

export const uploadPhoto = (data: FormData) => {
  return axiosPrivateInstance.put<SuccessReqMsg>(Endpoints.UPLOAD_PHOTO, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}
