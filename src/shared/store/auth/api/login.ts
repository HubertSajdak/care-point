import { Endpoints } from "@/constants"
import { axiosPublicInstance } from "@/shared"
import { ReqLoginCredentials, ResLogin } from "@/types/api-types"

export const login = (data: ReqLoginCredentials) => {
  return axiosPublicInstance.post<ResLogin>(Endpoints.LOGIN, data)
}
