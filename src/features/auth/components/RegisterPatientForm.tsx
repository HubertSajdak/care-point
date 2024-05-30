import { Grid } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import dayjs, { Dayjs } from "dayjs"
import { FormikProvider, useFormik } from "formik"
import { useTranslation } from "react-i18next"

import { useAppDispatch } from "@/app/hooks"
import {
  Button,
  CheckboxFormik,
  handlePostalCodeKeyUp,
  normalizeKey,
  TextFieldFormik,
} from "@/shared"
import { registerUser } from "@/shared/store"
import { ReqeustRegisterPatientCredentials } from "@/types/api-types"

import { registerPatientSchema } from "../schemas/register"

import { mapDataToRegisterPatientForm } from "./mapDataToRegisterPatientForm"
import TermsAndConditionsLabel from "./TermsAndConditionsLabel"

interface RegisterPatientValues extends ReqeustRegisterPatientCredentials {
  confirmPassword: string
  role: "patient"
  termsAndConditions: boolean
}

const RegisterPatientForm = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const registerPatientFormik = useFormik<RegisterPatientValues>({
    initialValues: mapDataToRegisterPatientForm,
    onSubmit: async (values) => {
      dispatch(
        registerUser({
          ...values,
          phoneNumber: +values.phoneNumber,
        }),
      )
    },
    validationSchema: registerPatientSchema,
  })

  return (
    <FormikProvider value={registerPatientFormik}>
      <form onSubmit={registerPatientFormik.handleSubmit}>
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
              id="phoneNumber"
              label={t("form:common.phoneNumber")}
              name="phoneNumber"
              type="tel"
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
          <Grid sm={4} xs={12} item>
            <TextFieldFormik
              id="street"
              label={t("form:common.street")}
              name="address.street"
            />
          </Grid>
          <Grid sm={4} xs={12} item>
            <TextFieldFormik
              id="city"
              label={t("form:common.city")}
              name="address.city"
            />
          </Grid>
          <Grid sm={4} xs={12} item>
            <TextFieldFormik
              id="postalCode"
              inputProps={{
                maxLength: 6,
              }}
              label={t("form:common.postalCode")}
              name="address.postalCode"
              onKeyUp={handlePostalCodeKeyUp}
            />
          </Grid>
          <Grid sm={4} xs={12} item>
            <DatePicker
              format={"YYYY-MM-DD"}
              label={t("form:common.birthDate")}
              slotProps={{
                textField: {
                  id: "datepicker",
                  fullWidth: true,
                  error: Boolean(registerPatientFormik.errors.birthDate),
                  helperText: registerPatientFormik.errors.birthDate
                    ? t(normalizeKey(registerPatientFormik.errors.birthDate))
                    : "",
                  disabled: registerPatientFormik.isSubmitting,
                },
              }}
              value={dayjs(registerPatientFormik.values.birthDate)}
              disableFuture
              onChange={(val: Dayjs | null) => {
                registerPatientFormik.setFieldValue(
                  "birthDate",
                  dayjs(val).format("YYYY-MM-DD"),
                )
              }}
            />
          </Grid>
          <Grid sm={4} xs={12} item>
            <TextFieldFormik
              id="height"
              label={t("form:common.height")}
              name="height"
              type="number"
            />
          </Grid>
          <Grid sm={4} xs={12} item>
            <TextFieldFormik
              id="weight"
              label={t("form:common.weight")}
              name="weight"
              type="number"
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
              isSubmitting={registerPatientFormik.isSubmitting}
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

export default RegisterPatientForm
