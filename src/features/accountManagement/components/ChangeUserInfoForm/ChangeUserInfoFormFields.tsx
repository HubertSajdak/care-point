import { Box, Unstable_Grid2 as Grid } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import dayjs, { Dayjs } from "dayjs"
import { FormikContextType, FormikProvider } from "formik"
import React from "react"
import { useTranslation } from "react-i18next"

import { useAppSelector } from "@/app/hooks"
import { UserRoles } from "@/constants"
import {
  Button,
  handlePostalCodeKeyUp,
  normalizeKey,
  TextFieldFormik,
} from "@/shared"
import {
  IUserRoles,
  ReqeustRegisterDoctorCredentials,
  ReqeustRegisterPatientCredentials,
} from "@/types/api-types"
import { Either } from "@/types/globals"

import { StyledForm } from "./ChangeUserInfoForm.styled"

interface ChangeUserInfoValues
  extends Omit<
    Either<ReqeustRegisterPatientCredentials, ReqeustRegisterDoctorCredentials>,
    "password" | "role"
  > {
  role: IUserRoles | string
}

interface ChangeUserInfoFormFieldsProps {
  formikProviderValue: FormikContextType<ChangeUserInfoValues>
  onChangeBirthday: (value: Dayjs | null) => Promise<void>
}

function ChangeUserInfoFormFields({
  formikProviderValue,
  onChangeBirthday,
}: ChangeUserInfoFormFieldsProps) {
  const currentUser = useAppSelector((state) => state.auth.user)

  const { t } = useTranslation()
  return (
    <FormikProvider value={formikProviderValue}>
      <StyledForm onSubmit={formikProviderValue.handleSubmit}>
        <Grid spacing={3} container>
          <Grid md={6} xs={12}>
            <TextFieldFormik
              id="name"
              label={t("form:common.name")}
              name="name"
            />
          </Grid>
          <Grid md={6} xs={12}>
            <TextFieldFormik
              id="surname"
              label={t("form:common.surname")}
              name="surname"
            />
          </Grid>
          <Grid md={6} xs={12}>
            <TextFieldFormik
              id="email"
              label={t("form:common.email")}
              name="email"
            />
          </Grid>
          {currentUser && currentUser.role === UserRoles.PATIENT && (
            <>
              <Grid md={6} xs={12}>
                <TextFieldFormik
                  id="phoneNumber"
                  label={t("form:common.phoneNumber")}
                  name="phoneNumber"
                  type="tel"
                />
              </Grid>
              <Grid md={6} xs={12}>
                <TextFieldFormik
                  id="street"
                  label={t("form:common.street")}
                  name="address.street"
                />
              </Grid>
              <Grid md={6} xs={12}>
                <TextFieldFormik
                  id="city"
                  label={t("form:common.city")}
                  name="address.city"
                />
              </Grid>
              <Grid md={6} xs={12}>
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
              <Grid md={6} xs={12}>
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
                  onChange={(val) => onChangeBirthday(val)}
                />
              </Grid>
              <Grid md={6} xs={12}>
                <TextFieldFormik
                  id="height"
                  label={t("form:common.height")}
                  name="height"
                  type="number"
                />
              </Grid>
              <Grid md={6} xs={12}>
                <TextFieldFormik
                  id="weight"
                  label={t("form:common.weight")}
                  name="weight"
                  type="number"
                />
              </Grid>
            </>
          )}
        </Grid>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button
            isSubmitting={formikProviderValue.isSubmitting}
            type="submit"
            variant="contained"
          >
            {t("buttons:saveDetails")}
          </Button>
        </Box>
      </StyledForm>
    </FormikProvider>
  )
}

export default ChangeUserInfoFormFields
