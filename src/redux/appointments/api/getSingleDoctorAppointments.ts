import { Endpoints } from "@/constants"
import { axiosPrivateInstance } from "@/shared"
import { IAppointment, SuccessReqData } from "@/types/api-types"

export const getSingleDoctorAppointments = (id: string) => {
  return axiosPrivateInstance<SuccessReqData<IAppointment[]>>(
    `${Endpoints.CREATE_APPOINTMENT}/${id}`,
  )
}
