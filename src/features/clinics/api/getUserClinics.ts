import { Endpoints } from "@/constants"
import { axiosPrivateInstance } from "@/shared"
import { IClinicAffiliation } from "@/types/api-types"

export const getUserClinics = () => {
  return axiosPrivateInstance<{
    data: IClinicAffiliation[]
    totalItems: number
  }>(`${Endpoints.GET_USER_CLINIC_AFFILIATIONS}`)
}
