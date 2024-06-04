import { useFormik } from "formik"

import { useAppDispatch } from "@/app/hooks"
import { registerUser } from "@/shared/store"

import { registerPatientSchema } from "../schemas/register"
import { RegisterPatientValues } from "../types/index"

import { mapDataToRegisterPatientForm } from "./mapDataToRegisterPatientForm"
import RegisterPatientFormFields from "./RegisterPatientFormFields"

const RegisterPatientForm = () => {
  const dispatch = useAppDispatch()

  const submit = async (values: RegisterPatientValues) =>
    await dispatch(
      registerUser({
        ...values,
        phoneNumber: +values.phoneNumber,
      }),
    )

  const registerPatientFormik = useFormik<RegisterPatientValues>({
    initialValues: mapDataToRegisterPatientForm,
    onSubmit: (values) => submit(values),
    validationSchema: registerPatientSchema,
  })

  return (
    <RegisterPatientFormFields formikProviderValue={registerPatientFormik} />
  )
}

export default RegisterPatientForm
