import { yup } from "@/libs"

const makeAppointmentSchema = yup.object().shape({
  clinicAffiliationId: yup.string().required(),
  appointmentDate: yup.string().required(),
  clinicId: yup.string().required(),
  patientId: yup.string().required(),
  doctorId: yup.string().required(),
  appointmentStatus: yup.string().required(),
  consultationFee: yup.number().required(),
  appointmentAddress: yup.object({
    street: yup.string().required(),
    city: yup.string().required(),
    postalCode: yup.string().postalCode(),
  }),
  timePerPatient: yup.number().required(),
})

export type MakeAppointmentFormValues = yup.InferType<
  typeof makeAppointmentSchema
>
export { makeAppointmentSchema }
