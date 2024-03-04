import { Endpoints } from "@/constants"
import { axiosPrivateInstance } from "@/shared"
import { SuccessReqMsg } from "@/types/api-types"

export const removeClinicPhoto = (clinicId: string) => {
  return axiosPrivateInstance.delete<SuccessReqMsg>(
    `${Endpoints.UPLOAD_CLINIC_PHOTO}/${clinicId}`,
  )
}
