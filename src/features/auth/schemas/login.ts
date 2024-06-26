import { yup } from "@/libs"

const loginSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
})

export type LoginFormValues = yup.InferType<typeof loginSchema>

export { loginSchema }
