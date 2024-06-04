import { useFormik } from "formik"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { useAppDispatch } from "@/app/hooks"
import { RouteNames } from "@/constants"
import { createClinic } from "@/features/clinics"
import { capitalizeFirstChar, Stepper } from "@/shared"
import Step from "@/shared/ui/Stepper/Step"

import { AddClinicFormValues, addClinicSchema } from "../../schemas/addClinic"
import { CreateClinicValues } from "../../types/index"

import StepClinicBasicInfo from "./FormSteps/StepClinicBasicInfo"
import StepClinicPhoto from "./FormSteps/StepClinicPhoto"
import StepClinicWorkingHours from "./FormSteps/StepClinicWorkingHours"
import { mapDataToForm } from "./mapDataToForm"

const AddClinicForm = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const submit = async (values: CreateClinicValues) => {
    await dispatch(createClinic(values))
    navigate(RouteNames.START)
  }
  const addClinicFormik = useFormik<AddClinicFormValues>({
    initialValues: mapDataToForm,
    validationSchema: addClinicSchema,
    enableReinitialize: true,
    onSubmit: (values) => submit(values),
  })

  return (
    <Stepper
      disableNextButton={(currentStep) => {
        return (
          (currentStep === 0 &&
            (!addClinicFormik.values.clinicName ||
              !addClinicFormik.values.phoneNumber ||
              !addClinicFormik.values.address.street ||
              !addClinicFormik.values.address.city ||
              !addClinicFormik.values.address.postalCode)) ||
          (currentStep === 1 &&
            addClinicFormik.values.workingTime.every(
              (day) => !day.startTime || !day.stopTime,
            ))
        )
      }}
      onSubmit={() => addClinicFormik.handleSubmit()}
    >
      <Step
        content={<StepClinicBasicInfo formikProviderValue={addClinicFormik} />}
        stepLabel={capitalizeFirstChar(t("form:clinic.addAddress"))}
      />
      <Step
        content={
          <StepClinicWorkingHours formikProviderValue={addClinicFormik} />
        }
        stepLabel={capitalizeFirstChar(t("form:clinic.addWorkingTime"))}
      />
      <Step
        content={<StepClinicPhoto formikProviderValue={addClinicFormik} />}
        stepLabel={capitalizeFirstChar(t("form:clinic.addPhoto"))}
      />
    </Stepper>
  )
}

export default AddClinicForm
