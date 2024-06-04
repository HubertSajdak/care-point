import dayjs, { Dayjs } from "dayjs"
import { useFormik } from "formik"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { UserRoles } from "@/constants"
import { updateUserInfo, UpdateUserValues } from "@/shared/store"
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

import ChangeUserInfoFormFields from "./ChangeUserInfoFormFields"
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
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector((state) => state.auth.user)
  const submit = async (values: UpdateUserValues) =>
    await dispatch(updateUserInfo(values))

  const updateUserInfoFormik = useFormik<ChangeUserInfoValues>({
    initialValues: mapDataToForm(currentUser || null),
    enableReinitialize: true,
    onSubmit: (values) => submit(values),
    validationSchema: getUserRoleValidationSchema(currentUser?.role),
  })
  const onChangeBirthday = async (value: Dayjs | null) => {
    await updateUserInfoFormik.setFieldValue(
      "birthDate",
      dayjs(value).format("YYYY-MM-DD"),
    )
  }
  return (
    <ChangeUserInfoFormFields
      formikProviderValue={updateUserInfoFormik}
      onChangeBirthday={onChangeBirthday}
    />
  )
}

export default ChangeUserInfoForm
