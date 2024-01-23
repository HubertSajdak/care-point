import yup from "../config"

const registerDoctorSchema = yup.object().shape({
  name: yup.string().name("form:name.invalid"),
  surname: yup.string().name("form:surname.invalid"),
  email: yup.string().isEmail(),
  password: yup.string().password(),
  confirmPassword: yup.string().isMatch("password"),
  termsAndConditions: yup.boolean().isTrue("form:common.required"),
})
const registerPatientSchema = yup.object({
  name: yup.string().name("form:name.invalid"),
  surname: yup.string().name("form:surname.invalid"),
  email: yup.string().isEmail(),
  phoneNumber: yup.string().phoneNumber(),
  password: yup.string().password(),
  confirmPassword: yup.string().isMatch("password"),
  address: yup.object({
    street: yup.string().required(),
    city: yup.string().required(),
    postalCode: yup.string().postalCode(),
  }),

  termsAndConditions: yup.boolean().isTrue("form:common.required"),
})
export type RegisterDoctorFormValues = yup.InferType<
  typeof registerDoctorSchema
>
export type RegisterPatientFormValues = yup.InferType<
  typeof registerPatientSchema
>

export { registerDoctorSchema, registerPatientSchema }
