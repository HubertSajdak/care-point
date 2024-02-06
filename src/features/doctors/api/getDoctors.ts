import { Endpoints } from "@/constants"
import { axiosPrivateInstance } from "@/shared"
import { IDoctorUser, ParamsValues, SuccessReqData } from "@/types/api-types"

export const getDoctors = (params: ParamsValues) => {
  return axiosPrivateInstance<SuccessReqData<IDoctorUser[]>>(
    Endpoints.GET_ALL_DOCTORS,
    {
      params: { ...params },
    },
  )
}
