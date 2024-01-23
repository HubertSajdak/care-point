import { useAppDispatch } from "@/app/hooks"
import pdf from "@/documents/Terms.pdf"
import { registerPatientSchema } from "@/libs/yup/schemas/register"
import Button from "@/shared/Button/Button"
import CheckboxFormik from "@/shared/CheckboxFormik/CheckboxFormik"
import PasswordStrengthIndicator from "@/shared/PasswordStrengthIndicator/PasswordStrengthIndicator"
import TextFieldFormik from "@/shared/TextFieldFormik/TextFieldFormik"
import { ReqeustRegisterPatientCredentials } from "@/types/api-types"
import { handlePostalCodeKeyUp } from "@/utils/functions"
import { Grid, Typography } from "@mui/material"
import { FormikProvider, useFormik } from "formik"
import { useTranslation } from "react-i18next"
import { useTheme } from "styled-components"
import { registerUser } from "../authThunks"
interface RegisterPatientValues extends ReqeustRegisterPatientCredentials {
  termsAndConditions: boolean
  confirmPassword: string
  role: "patient"
}
const RegisterPatientForm = () => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
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
  const registerPatientFormik = useFormik<RegisterPatientValues>({
    initialValues: {
      name: "",
      surname: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "patient",
      address: {
        street: "",
        city: "",
        postalCode: "",
      },
      termsAndConditions: false,
    },
    onSubmit: async (values) => {
      const { name, surname, phoneNumber, email, password, role, address } =
        values
      dispatch(
        registerUser({
          name,
          surname,
          phoneNumber: +phoneNumber,
          email,
          password,
          role,
          address,
        }),
      )
    },
    validationSchema: registerPatientSchema,
  })
  return (
    <FormikProvider value={registerPatientFormik}>
      <form onSubmit={registerPatientFormik.handleSubmit}>
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
              id="phoneNumber"
              name="phoneNumber"
              label={t("form:common.phoneNumber")}
              type="tel"
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
          {registerPatientFormik.values.password.length > 0 && (
            <Grid item alignSelf="flex-start" width="100%">
              <PasswordStrengthIndicator
                password={registerPatientFormik.values.password}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <TextFieldFormik
              id="confirmPassword"
              name="confirmPassword"
              label={t("form:common.confirmPassword")}
              type="password"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextFieldFormik
              id="street"
              name="address.street"
              label={t("form:common.street")}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextFieldFormik
              id="city"
              name="address.city"
              label={t("form:common.city")}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextFieldFormik
              id="postalCode"
              name="address.postalCode"
              onKeyUp={handlePostalCodeKeyUp}
              inputProps={{
                maxLength: 6,
              }}
              label={t("form:common.postalCode")}
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
              isSubmitting={registerPatientFormik.isSubmitting}
            >
              {t("buttons:submit")}
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormikProvider>
  )
}

export default RegisterPatientForm
