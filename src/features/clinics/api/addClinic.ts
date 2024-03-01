import { Endpoints } from "@/constants"
import { axiosPrivateInstance } from "@/shared"
import { IAddress, SuccessReqMsg } from "@/types/api-types"
interface ResponseData extends SuccessReqMsg {
  id: string
}

interface RequestData {
  address: IAddress
  clinicName: string
  phoneNumber: number
  photo?: string
  workingTime: {
    startTime?: string | undefined
    stopTime?: string | undefined
    weekDay: string
  }[]
}
export const addClinic = (data: RequestData) => {
  return axiosPrivateInstance.post<ResponseData>(Endpoints.GET_ALL_CLINICS, {
    ...data,
  })
}
