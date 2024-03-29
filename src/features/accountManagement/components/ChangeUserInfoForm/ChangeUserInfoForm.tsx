import { Box, Unstable_Grid2 as Grid } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import dayjs, { Dayjs } from "dayjs"
import { FormikProvider, useFormik } from "formik"
import { useTranslation } from "react-i18next"
import styled from "styled-components"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { UserRoles } from "@/constants"
import { updateDoctorInfoSchema, updatePatientInfoSchema } from "@/libs"
import { updateUserInfo } from "@/redux"
import { Button, handlePostalCodeKeyUp, TextFieldFormik } from "@/shared"
import {
  IUserRoles,
  ReqeustRegisterDoctorCredentials,
  ReqeustRegisterPatientCredentials,
} from "@/types/api-types"
import { Either } from "@/types/globals"

interface ChangeUserInfoValues
  extends Omit<
    Either<ReqeustRegisterPatientCredentials, ReqeustRegisterDoctorCredentials>,
    "password" | "role"
  > {
  role: IUserRoles | string
}

const StyledForm = styled.form`
  display: "flex";
  flex-direction: "column";
  justify-content: "space-between";
  height: "100%";
`

const ChangeUserInfoForm = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector((state) => state.auth.user)

  const updateUserInfoFormik = useFormik<ChangeUserInfoValues>({
    initialValues: {
      name: currentUser?.name || "",
      surname: currentUser?.surname || "",
      phoneNumber: currentUser?.phoneNumber || "",
      email: currentUser?.email || "",
      role: currentUser?.role || "",
      address: {
        street: currentUser?.address?.street || "",
        city: currentUser?.address?.city || "",
        postalCode: currentUser?.address?.postalCode || "",
      },
      birthDate: currentUser?.birthDate || "",
      height: currentUser?.height || 0,
      weight: currentUser?.weight || 0,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      const {
        address,
        birthDate,
        email,
        height,
        name,
        phoneNumber,
        surname,
        weight,
      } = values
      await dispatch(
        updateUserInfo({
          name,
          surname,
          phoneNumber,
          email,
          address,
          birthDate,
          height,
          weight,
        }),
      )
    },
    validationSchema:
      currentUser?.role === UserRoles.PATIENT
        ? updatePatientInfoSchema
        : updateDoctorInfoSchema,
  })

  return (
    <FormikProvider value={updateUserInfoFormik}>
      <StyledForm
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        onSubmit={updateUserInfoFormik.handleSubmit}
      >
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
