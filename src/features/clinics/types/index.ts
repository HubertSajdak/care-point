import { IAddress } from "@/types/api-types"

export * from "../schemas/addClinicAffiliation"
export * from "../schemas/addClinic"
export * from "../schemas/editClinic"
export * from "../schemas/uploadClinicPhoto"

export interface RequestAddClinicValues {
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

export interface CreateClinicValues {
  address: IAddress
  clinicName: string
  phoneNumber: string | number
  photo?: File | null
  workingTime: {
    startTime?: string | undefined
    stopTime?: string | undefined
    weekDay: string
  }[]
}
