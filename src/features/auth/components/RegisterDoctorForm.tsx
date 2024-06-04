import { Grid } from "@mui/material"
import { FormikProvider, useFormik } from "formik"
import { useTranslation } from "react-i18next"

import { useAppDispatch } from "@/app/hooks"
import { Button, CheckboxFormik, TextFieldFormik } from "@/shared"
import { registerUser } from "@/shared/store"
import {
  ReqeustRegisterDoctorCredentials,
  ReqeustRegisterPatientCredentials,
} from "@/types/api-types"

import { registerDoctorSchema } from "../schemas/register"

import { mapDataToRegisterDoctorForm } from "./mapDataToRegisterDoctorForm"
import TermsAndConditionsLabel from "./TermsAndConditionsLabel"

interface RegisterDoctorValues extends ReqeustRegisterDoctorCredentials {
  confirmPassword: string
  termsAndConditions: boolean
}

const RegisterDoctorForm = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const submit = async (
    values:
      | ReqeustRegisterPatientCredentials
      | ReqeustRegisterDoctorCredentials,
  ) => {
    const { email, name, password, role, surname } = values
    await dispatch(registerUser({ name, surname, email, password, role }))
  }

  const registerDoctorFormik = useFormik<RegisterDoctorValues>({
    initialValues: mapDataToRegisterDoctorForm,
    onSubmit: (values) => submit(values),
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
          <Grid
            md={12}
            minHeight={(theme) => theme.spacing(12.5)}
            sm={12}
            xs={12}
            item
          >
            <CheckboxFormik
              id="termsAndConditions"
              label={<TermsAndConditionsLabel />}
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
