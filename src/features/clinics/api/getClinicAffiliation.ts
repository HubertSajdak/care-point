import { Endpoints } from "@/constants"
import { axiosPrivateInstance } from "@/shared"
import { IClinicAffiliation } from "@/types/api-types"

export const getClinicAffiliation = (clinicAffiliationId: string) => {
  return axiosPrivateInstance<IClinicAffiliation>(
    `${Endpoints.GET_CLINIC_AFFILIATIONS}/${clinicAffiliationId}`,
  )
}
