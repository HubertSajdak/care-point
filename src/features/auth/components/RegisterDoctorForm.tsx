import { Grid, Typography } from "@mui/material"
import { FormikProvider, useFormik } from "formik"
import { useTranslation } from "react-i18next"
import { useTheme } from "styled-components"

import { useAppDispatch } from "@/app/hooks"
import pdf from "@/documents/Terms.pdf"
import { registerDoctorSchema } from "@/libs"
import { registerUser } from "@/redux"
import { Button, CheckboxFormik, TextFieldFormik } from "@/shared"
import { ReqeustRegisterDoctorCredentials } from "@/types/api-types"

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
        rel="noreferrer"
        style={{ color: theme.palette.primary.main }}
        target="_blank"
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
      const { email, name, password, role, surname } = values
      await dispatch(registerUser({ name, surname, email, password, role }))
    },
    validationSchema: registerDoctorSchema,
  })
  return (
    <FormikProvider value={registerDoctorFormik}>
      <form onSubmit={registerDoctorFormik.handleSubmit}>
        <Grid justifyContent="center" spacing={4} container>
          <Grid sm={6} xs={12} item>
            <TextFieldFormik
              id="name"
              label={t("form:common.name")}
              name="name"
            />
          </Grid>
          <Grid sm={6} xs={12} item>
            <TextFieldFormik
              id="surname"
              label={t("form:common.surname")}
              name="surname"
            />
          </Grid>
          <Grid xs={12} item>
            <TextFieldFormik
              id="email"
              label={t("form:common.email")}
              name="email"
            />
          </Grid>
          <Grid xs={12} item>
            <TextFieldFormik
              id="password"
              label={t("form:common.password")}
              name="password"
              type="password"
            />
          </Grid>
          <Grid xs={12} item>
            <TextFieldFormik
              id="confirmPassword"
              label={t("form:common.confirmPassword")}
              name="confirmPassword"
              type="password"
            />
          </Grid>
          <Grid md={12} minHeight="100px" sm={12} xs={12} item>
            <CheckboxFormik
              id="termsAndConditions"
              label={label}
              name="termsAndConditions"
            />
          </Grid>
          <Grid xs={12} item>
            <Button
              isSubmitting={registerDoctorFormik.isSubmitting}
              type="submit"
              variant="contained"
              fullWidth
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
