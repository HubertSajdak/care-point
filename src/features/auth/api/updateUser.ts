import { Endpoints } from "@/constants"
import { axiosPrivateInstance } from "@/shared"
import { SuccessReqMsg } from "@/types/api-types"

import { UpdateUserValues } from "../store/authThunks"

export const updateUser = (data: UpdateUserValues) => {
  return axiosPrivateInstance.put<SuccessReqMsg>(Endpoints.USER_DATA, data)
}
