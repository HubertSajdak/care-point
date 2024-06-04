import { MakeAppointmentValues } from "@/types/api-types"

export const mapDataToForm = (
  patientId: string | undefined,
  doctorId: string | undefined,
): MakeAppointmentValues => {
  return {
    clinicAffiliationId: "",
    appointmentDate: "",
    clinicId: "",
    patientId: patientId || "",
    doctorId: doctorId || "",
    appointmentAddress: {
      street: "",
      city: "",
      postalCode: "",
    },
    appointmentStatus: "active",
    consultationFee: 0,
    timePerPatient: 0,
  }
}
