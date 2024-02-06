import { axiosPublicInstance } from "@/shared"
import {
  ReqeustRegisterDoctorCredentials,
  ReqeustRegisterPatientCredentials,
  SuccessReqMsg,
} from "@/types/api-types"

export const register = (
  data:
    | Omit<ReqeustRegisterPatientCredentials, "role">
    | Omit<ReqeustRegisterDoctorCredentials, "role">,
  endpoint: string,
) => {
  return axiosPublicInstance.post<SuccessReqMsg>(endpoint, data)
}
