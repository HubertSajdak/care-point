import { Endpoints } from "@/constants"
import { axiosPrivateInstance } from "@/shared"
import { IPatientUser, ParamsValues, SuccessReqData } from "@/types/api-types"

export const getPatients = (params: ParamsValues) => {
  return axiosPrivateInstance<SuccessReqData<IPatientUser[]>>(
    Endpoints.GET_ALL_PATIENTS,
    {
      params: { ...params },
    },
  )
}
