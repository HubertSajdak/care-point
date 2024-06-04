import { Endpoints } from "@/constants"
import { axiosPrivateInstance } from "@/shared"
import { MakeAppointmentValues, SuccessReqMsg } from "@/types/api-types"

export const makeAppointment = (data: MakeAppointmentValues) => {
  return axiosPrivateInstance.post<SuccessReqMsg>(
    Endpoints.CREATE_APPOINTMENT,
    {
      ...data,
    },
  )
}
