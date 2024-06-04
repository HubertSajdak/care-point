import { Endpoints } from "@/constants"
import { axiosPrivateInstance } from "@/shared"
import { SuccessReqMsg } from "@/types/api-types"

import { RequestAddClinicValues } from "../types/index"

interface ResponseData extends SuccessReqMsg {
  id: string
}

export const addClinic = (data: RequestAddClinicValues) => {
  return axiosPrivateInstance.post<ResponseData>(Endpoints.GET_ALL_CLINICS, {
    ...data,
  })
}
