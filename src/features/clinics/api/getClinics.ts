import { Endpoints } from "@/constants"
import { axiosPrivateInstance } from "@/shared"
import { IClinicInfo, SuccessReqData } from "@/types/api-types"

export const getClinics = () => {
  return axiosPrivateInstance<SuccessReqData<IClinicInfo[]>>(
    Endpoints.GET_ALL_CLINICS,
  )
}
