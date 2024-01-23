import { useAppDispatch } from "@/app/hooks"
import pdf from "@/documents/Terms.pdf"
import { registerDoctorSchema } from "@/libs/yup/schemas/register"
import Button from "@/shared/Button/Button"
import CheckboxFormik from "@/shared/CheckboxFormik/CheckboxFormik"
import TextFieldFormik from "@/shared/TextFieldFormik/TextFieldFormik"
import { ReqeustRegisterDoctorCredentials } from "@/types/api-types"
import { Grid, Typography } from "@mui/material"
import { FormikProvider, useFormik } from "formik"
import { useTranslation } from "react-i18next"
import { useTheme } from "styled-components"
import { registerUser } from "../authThunks"
interface RegisterDoctorValues extends ReqeustRegisterDoctorCredentials {
  confirmPassword: string
  termsAndConditions: boolean
}
const RegisterDoctorForm = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const label = (
    <Typography>
      {t("authPages:iAgreeOn")}{" "}
      <a
        href={pdf}
        target="_blank"
        rel="noreferrer"
        style={{ color: theme.palette.primary.main }}
      >
        {t("authPages:terms")}{" "}
      </a>
      {t("authPages:conditions")}
    </Typography>
  )

  const registerDoctorFormik = useFormik<RegisterDoctorValues>({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "doctor",
      termsAndConditions: false,
    },
    onSubmit: async (values) => {
      const { name, surname, email, password, role } = values
      await dispatch(registerUser({ name, surname, email, password, role }))
    },
    validationSchema: registerDoctorSchema,
  })
  return (
    <FormikProvider value={registerDoctorFormik}>
      <form onSubmit={registerDoctorFormik.handleSubmit}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <TextFieldFormik
              id="name"
              name="name"
              label={t("form:common.name")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextFieldFormik
              id="surname"
              name="surname"
              label={t("form:common.surname")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldFormik
              id="email"
              name="email"
              label={t("form:common.email")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldFormik
              id="password"
              name="password"
              label={t("form:common.password")}
              type="password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldFormik
              id="confirmPassword"
              name="confirmPassword"
              label={t("form:common.confirmPassword")}
              type="password"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} minHeight="100px">
            <CheckboxFormik
              id="termsAndConditions"
              name="termsAndConditions"
              label={label}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              isSubmitting={registerDoctorFormik.isSubmitting}
            >
              {t("buttons:submit")}
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormikProvider>
  )
}

export default RegisterDoctorForm
