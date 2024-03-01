import { Endpoints } from "@/constants"
import { axiosPrivateInstance } from "@/shared"
import { SuccessReqMsg } from "@/types/api-types"

export const uploadPhoto = (data: FormData, id: string) => {
  return axiosPrivateInstance.put<SuccessReqMsg>(
    `${Endpoints.UPLOAD_CLINIC_PHOTO}/${id}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  )
}
