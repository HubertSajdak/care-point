import { Endpoints } from "@/constants"
import { axiosPrivateInstance } from "@/shared"
import { SuccessReqMsg } from "@/types/api-types"

export const deleteAppointment = (appointmentId: string) => {
  return axiosPrivateInstance.delete<SuccessReqMsg>(
    `${Endpoints.MY_APPOINTMENTS}/${appointmentId}`,
  )
}
