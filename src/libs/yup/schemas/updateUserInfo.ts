import yup from "../config"
const updatePatientInfoSchema = yup.object({
  name: yup.string().name("form:name.invalid"),
  surname: yup.string().name("form:surname.invalid"),
  email: yup.string().isEmail(),
  phoneNumber: yup.string().phoneNumber(),
  address: yup.object({
    street: yup.string().required(),
    city: yup.string().required(),
    postalCode: yup.string().postalCode(),
  }),
})
const updateDoctorInfoSchema = yup.object({
  name: yup.string().name("form:name.invalid"),
  surname: yup.string().name("form:surname.invalid"),
  email: yup.string().isEmail(),
})

export type UpdatePatientInfoValues = yup.InferType<
  typeof updatePatientInfoSchema
>
export type UpadteDoctorInfoValues = yup.InferType<
  typeof updateDoctorInfoSchema
>
export { updatePatientInfoSchema, updateDoctorInfoSchema }
