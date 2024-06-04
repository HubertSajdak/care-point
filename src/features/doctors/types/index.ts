import { IAddress, IAppointmentStatus } from "@/types/api-types"

export * from "../schemas/makeAppointment"

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
