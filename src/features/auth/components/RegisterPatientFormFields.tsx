import { Grid } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import dayjs, { Dayjs } from "dayjs"
import { FormikContextType, FormikProvider } from "formik"
import React from "react"
import { useTranslation } from "react-i18next"

import {
  Button,
  CheckboxFormik,
  handlePostalCodeKeyUp,
  normalizeKey,
  TextFieldFormik,
} from "@/shared"

import TermsAndConditionsLabel from "../components/TermsAndConditionsLabel"
import { RegisterPatientValues } from "../types/index"

interface RegisterPatientFormFieldsProps {
  formikProviderValue: FormikContextType<RegisterPatientValues>
}

function RegisterPatientFormFields({
  formikProviderValue,
}: RegisterPatientFormFieldsProps) {
  const { t } = useTranslation()
  return (
    <FormikProvider value={formikProviderValue}>
      <form onSubmit={formikProviderValue.handleSubmit}>
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
                  error: Boolean(formikProviderValue.errors.birthDate),
                  helperText: formikProviderValue.errors.birthDate
                    ? t(normalizeKey(formikProviderValue.errors.birthDate))
                    : "",
                  disabled: formikProviderValue.isSubmitting,
                },
              }}
              value={dayjs(formikProviderValue.values.birthDate)}
              disableFuture
              onChange={(val: Dayjs | null) => {
                formikProviderValue.setFieldValue(
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
              isSubmitting={formikProviderValue.isSubmitting}
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

export default RegisterPatientFormFields
