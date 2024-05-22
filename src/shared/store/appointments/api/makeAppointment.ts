import { Endpoints } from "@/constants"
import { axiosPrivateInstance } from "@/shared"
import { IAddress, IAppointmentStatus, SuccessReqMsg } from "@/types/api-types"

export interface MakeAppointmentValues {
  appointmentAddress: IAddress
  appointmentDate: string
  appointmentStatus: IAppointmentStatus
  clinicAffiliationId: string
  clinicId: string
  consultationFee: number
  doctorId: string
  patientId: string
  timePerPatient: number
}

export const makeAppointment = (data: MakeAppointmentValues) => {
  return axiosPrivateInstance.post<SuccessReqMsg>(
    Endpoints.CREATE_APPOINTMENT,
    {
      ...data,
    },
  )
}
