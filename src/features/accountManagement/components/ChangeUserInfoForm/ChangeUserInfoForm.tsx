import { Box, Unstable_Grid2 as Grid } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import dayjs, { Dayjs } from "dayjs"
import { FormikProvider, useFormik } from "formik"
import { useTranslation } from "react-i18next"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { UserRoles } from "@/constants"
import { Button, handlePostalCodeKeyUp, TextFieldFormik } from "@/shared"
import { updateUserInfo } from "@/shared/store"
import {
  IUserRoles,
  ReqeustRegisterDoctorCredentials,
  ReqeustRegisterPatientCredentials,
} from "@/types/api-types"
import { Either } from "@/types/globals"

import {
  updateDoctorInfoSchema,
  updatePatientInfoSchema,
} from "../../schemas/updateUserInfo"
import { StyledForm } from "../ChangeUserInfoForm/ChangeUserInfoForm.styled"

import { mapDataToForm } from "./mapDataToForm"

interface ChangeUserInfoValues
  extends Omit<
    Either<ReqeustRegisterPatientCredentials, ReqeustRegisterDoctorCredentials>,
    "password" | "role"
  > {
  role: IUserRoles | string
}

const getUserRoleValidationSchema = (role: IUserRoles | undefined | null) => {
  return role && role === UserRoles.DOCTOR
    ? updateDoctorInfoSchema
    : updatePatientInfoSchema
}
const ChangeUserInfoForm = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector((state) => state.auth.user)

  const updateUserInfoFormik = useFormik<ChangeUserInfoValues>({
    initialValues: mapDataToForm(currentUser || null),
    enableReinitialize: true,
    onSubmit: async (values) => {
      await dispatch(updateUserInfo(values))
    },
    validationSchema: getUserRoleValidationSchema(currentUser?.role),
  })

  return (
    <FormikProvider value={updateUserInfoFormik}>
      <StyledForm onSubmit={updateUserInfoFormik.handleSubmit}>
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
                      error: Boolean(updateUserInfoFormik.errors.birthDate),
                      helperText: updateUserInfoFormik.errors.birthDate
                        ? t(updateUserInfoFormik.errors.birthDate)
                        : "",
                      disabled: updateUserInfoFormik.isSubmitting,
                    },
                  }}
                  value={dayjs(updateUserInfoFormik.values.birthDate)}
                  disableFuture
                  onChange={(val: Dayjs | null) => {
                    updateUserInfoFormik.setFieldValue(
                      "birthDate",
                      dayjs(val).format("YYYY-MM-DD"),
                    )
                  }}
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
            isSubmitting={updateUserInfoFormik.isSubmitting}
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

export default ChangeUserInfoForm
