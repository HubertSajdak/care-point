import { Endpoints } from "@/constants"
import { axiosPrivateInstance } from "@/shared"
import { IDoctorUser, IPatientUser } from "@/types/api-types"

export const getUser = () => {
  return axiosPrivateInstance<IDoctorUser | IPatientUser>(Endpoints.USER_DATA)
}
