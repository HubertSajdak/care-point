import { CircularProgress } from "@mui/material"
import { useFormik } from "formik"
import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { RouteNames } from "@/constants"
import {
  createUserClinicAffiliation,
  getSingleClinic,
} from "@/features/clinics"
import { capitalizeFirstChar, Stepper } from "@/shared"
import CommonError from "@/shared/ui/CommonError/CommonError"
import Step from "@/shared/ui/Stepper/Step"

import { addClinicAffiliationSchema } from "../../schemas/addClinicAffiliation"

import StepAffiliationBasicInfo from "./FormSteps/StepAffiliationBasicInfo"
import StepAffiliationWorkingHours from "./FormSteps/StepAffiliationWorkingHours"
import { mapDataToForm } from "./mapDataToForm"

const AddClinicAffiliationForm = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const user = useAppSelector((state) => state.auth.user)
  const singleClinic = useAppSelector((state) => state.clinics.singleClinic)
  const status = useAppSelector((state) => state.clinics.status)
  useEffect(() => {
    if (params.clinicId) {
      dispatch(getSingleClinic(params.clinicId))
    }
  }, [dispatch, params.clinicId])
  const addClinicAffiliationFormik = useFormik({
    initialValues: mapDataToForm(
      user?._id,
      params?.clinicId,
      singleClinic?.clinicName,
    ),
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(createUserClinicAffiliation(values))
      navigate(RouteNames.START)
    },
    validationSchema: addClinicAffiliationSchema,
  })
  if (status === "loading") {
    return <CircularProgress />
  }
  if (status === "error") {
    return <CommonError translationKey={"common:errors.fetchDataError"} />
  }
  return (
    <Stepper
      disableNextButton={(currentStep) => {
        return (
          (currentStep === 0 &&
            (!addClinicAffiliationFormik.values.consultationFee ||
              !addClinicAffiliationFormik.values.timePerPatient)) ||
          (currentStep === 1 &&
            addClinicAffiliationFormik.values.workingTime.every(
              (day) => !day.startTime || !day.stopTime,
            ))
        )
      }}
      onSubmit={() => addClinicAffiliationFormik.handleSubmit()}
    >
      <Step
        content={
          <StepAffiliationBasicInfo
            formikProviderValue={addClinicAffiliationFormik}
          />
        }
        stepLabel={capitalizeFirstChar(t("clinic:basicInfoLabel"))}
      />
      <Step
        content={
          <StepAffiliationWorkingHours
            formikProviderValue={addClinicAffiliationFormik}
          />
        }
        stepLabel={capitalizeFirstChar(t("clinic:chooseWorkingHours"))}
      />
    </Stepper>
  )
}

export default AddClinicAffiliationForm
