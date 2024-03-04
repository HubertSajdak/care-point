import { Endpoints } from "@/constants"
import { axiosPrivateInstance } from "@/shared"
import { IAddress, SuccessReqMsg } from "@/types/api-types"

interface RequestData {
  address: IAddress
  clinicName: string
  id: string
  phoneNumber: number
  photo?: string
  workingTime: {
    startTime?: string | undefined
    stopTime?: string | undefined
    weekDay: string
  }[]
}
export const updateClinic = (data: RequestData) => {
  return axiosPrivateInstance.put<SuccessReqMsg>(
    `${Endpoints.GET_ALL_CLINICS}/${data.id}`,
    {
      ...data,
    },
  )
}
