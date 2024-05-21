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

// this component is hard to read:
// mixed logic with presentation
// callbacks used deep inside
// useFormik could be moved to separate hook
// DatePicker could be created as separate component (there is component passed via slotProps={{ textField: { which decerease code readibility
// no type validation for form

const ChangeUserInfoForm = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector((state) => state.auth.user)

  const submit = async (values) => await dispatch(updateUserInfo(values))

  const updateUserInfoFormik = useFormik<ChangeUserInfoValues>({
    initialValues: getValues(),
    enableReinitialize: true,
    onSubmit: submit,
    validationSchema: getSchemaForPatient(currentUser?.role),
  })

  ///

  return (
    <FormikProvider value={updateUserInfoFormik}>
      <StyledForm onSubmit={updateUserInfoFormik.handleSubmit}>
        <Grid spacing={3} container></Grid>
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
