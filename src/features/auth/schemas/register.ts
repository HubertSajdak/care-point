import dayjs from "dayjs"

import { yup } from "@/libs"

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
  height: yup.number().isHeight(),
  weight: yup.number().isWeight(),
  birthDate: yup
    .date()
    .min("1900-01-01", "form:date.invalid")
    .max(dayjs().format("YYYY-MM-DD"), "form:date.invalid"),

  termsAndConditions: yup.boolean().isTrue("form:common.required"),
})
export type RegisterDoctorFormValues = yup.InferType<
  typeof registerDoctorSchema
>
export type RegisterPatientFormValues = yup.InferType<
  typeof registerPatientSchema
>

export { registerDoctorSchema, registerPatientSchema }
