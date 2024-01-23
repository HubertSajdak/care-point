import yup from "../config"

const changePasswordSchema = yup.object({
  password: yup.string().password(),
  confirmPassword: yup.string().isMatch("password"),
})

export type ChangePasswordSchema = yup.InferType<typeof changePasswordSchema>

export { changePasswordSchema }
