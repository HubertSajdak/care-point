import { Endpoints } from "@/constants"
import { axiosPrivateInstance } from "@/shared"
import { IClinicInfo, ParamsValues, SuccessReqData } from "@/types/api-types"

export const getClinics = (params: ParamsValues) => {
  return axiosPrivateInstance<SuccessReqData<IClinicInfo[]>>(
    Endpoints.GET_ALL_CLINICS,
    { params: { ...params } },
  )
}
