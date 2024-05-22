import { Endpoints } from "@/constants"
import { axiosPrivateInstance } from "@/shared"
import { IAppointment, ParamsValues, SuccessReqData } from "@/types/api-types"

export const getUserAppointments = (params: ParamsValues) => {
  return axiosPrivateInstance<SuccessReqData<IAppointment[]>>(
    Endpoints.MY_APPOINTMENTS,
    {
      params: { ...params },
    },
  )
}
