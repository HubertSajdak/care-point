import { Endpoints } from "@/constants"
import { axiosPrivateInstance } from "@/shared"
import { IClinicInfo } from "@/types/api-types"

export const getClinic = (id: string) => {
  return axiosPrivateInstance<IClinicInfo>(`${Endpoints.GET_ALL_CLINICS}/${id}`)
}
