import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { UserRoles } from "@/constants/userRoles"
import { updateUserInfo } from "@/features/auth/authThunks"
import {
  updateDoctorInfoSchema,
  updatePatientInfoSchema,
} from "@/libs/yup/schemas/updateUserInfo"
import Button from "@/shared/Button/Button"
import TextFieldFormik from "@/shared/TextFieldFormik/TextFieldFormik"
import {
  IUserRoles,
  ReqeustRegisterDoctorCredentials,
  ReqeustRegisterPatientCredentials,
} from "@/types/api-types"
import { Either } from "@/types/globals"
import { handlePostalCodeKeyUp } from "@/utils/functions"
import { Box, Divider, Unstable_Grid2 as Grid } from "@mui/material"
import { FormikProvider, useFormik } from "formik"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"
interface ChangeUserInfoValues
  extends Omit<
    Either<ReqeustRegisterPatientCredentials, ReqeustRegisterDoctorCredentials>,
    "password" | "role"
  > {
  role: IUserRoles | string
}
const ChangeUserInfoForm = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector((state) => state.auth.user)
  const status = useAppSelector((state) => state.auth.status)
  const [values, setValues] = useState({
    firstName: "Anika",
    lastName: "Visser",
    email: "demo@devias.io",
    phone: "",
    state: "los-angeles",
    country: "USA",
  })

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
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      const { name, surname, phoneNumber, email, address } = values
      await dispatch(
        updateUserInfo({
          name,
          surname,
          phoneNumber,
          email,
          address,
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
      <StyledForm onSubmit={updateUserInfoFormik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <TextFieldFormik
              id="name"
              name="name"
              label={t("form:common.name")}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <TextFieldFormik
              id="surname"
              name="surname"
              label={t("form:common.surname")}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <TextFieldFormik
              id="email"
              name="email"
              label={t("form:common.email")}
            />
          </Grid>
          {currentUser && currentUser.role === UserRoles.PATIENT && (
            <>
              <Grid xs={12} md={6}>
                <TextFieldFormik
                  id="phoneNumber"
                  name="phoneNumber"
                  label={t("form:common.phoneNumber")}
                  type="tel"
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextFieldFormik
                  id="street"
                  name="address.street"
                  label={t("form:common.street")}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextFieldFormik
                  id="city"
                  name="address.city"
                  label={t("form:common.city")}
                />
              </Grid>
              <Grid xs={12} md={6}>
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
            </>
          )}
        </Grid>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button
            variant="contained"
            type="submit"
            isSubmitting={updateUserInfoFormik.isSubmitting}
          >
            {t("buttons:saveDetails")}
          </Button>
        </Box>
      </StyledForm>
    </FormikProvider>
  )
}

export default ChangeUserInfoForm

const StyledForm = styled.form`
  display: "flex";
  flex-direction: "column";
  justify-content: "space-between";
  height: "100%";
`
