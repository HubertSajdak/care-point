import { Endpoints } from "@/constants"
import { axiosPrivateInstance } from "@/shared"
import { SuccessReqMsg } from "@/types/api-types"

// why appointmens are here? some similar files are placed in features, eg patients/api, patients/store

export const deleteAppointment = (appointmentId: string) => {
  return axiosPrivateInstance.delete<SuccessReqMsg>(
    `${Endpoints.MY_APPOINTMENTS}/${appointmentId}`,
  )
}
