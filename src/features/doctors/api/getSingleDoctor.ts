import { Endpoints } from "@/constants"
import { axiosPrivateInstance } from "@/shared"
import { IDoctorUser } from "@/types/api-types"

export const getSingleDoctorData = (doctorId: string) => {
  return axiosPrivateInstance<{ doctor: IDoctorUser }>(
    `${Endpoints.GET_ALL_DOCTORS}/${doctorId}`,
  )
}
