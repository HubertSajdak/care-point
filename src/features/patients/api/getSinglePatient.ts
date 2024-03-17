import { Endpoints } from "@/constants"
import { axiosPrivateInstance } from "@/shared"
import { IPatientUser } from "@/types/api-types"

export const getSinglePatientData = (patientId: string) => {
  return axiosPrivateInstance<{ patient: IPatientUser }>(
    `${Endpoints.GET_ALL_PATIENTS}/${patientId}`,
  )
}
