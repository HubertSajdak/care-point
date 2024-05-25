import { CircularProgress } from "@mui/material"
import { useFormik } from "formik"
import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { RouteNames } from "@/constants"
import {
  getSingleClinic,
  getSingleClinicAffiliation,
  updateClinicAffiliation,
} from "@/features/clinics"
import { capitalizeFirstChar, Stepper } from "@/shared"
import CommonError from "@/shared/ui/CommonError/CommonError"
import Step from "@/shared/ui/Stepper/Step"

import { AddClinicAffiliationValues } from "../../schemas/addClinicAffiliation"

import StepEditBasicInfo from "./FormSteps/StepEditBasicInfo"
import StepEditWorkingHours from "./FormSteps/StepEditWorkingHours"
import { mapDataToForm } from "./mapDataToForm"

interface EditClinicAffiliationValues extends AddClinicAffiliationValues {
  clinicAffiliationId: string
}

const EditClinicAffiliationForm = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const singleClinicAffiliation = useAppSelector(
    (state) => state.clinics.singleClinicAffiliation,
  )
  const status = useAppSelector((state) => state.clinics.status)
  const navigate = useNavigate()
  const params = useParams()
  useEffect(() => {
    if (params.clinicAffiliationId) {
      dispatch(getSingleClinicAffiliation(params.clinicAffiliationId))
    }
  }, [dispatch, params.clinicAffiliationId])

  useEffect(() => {
    if (singleClinicAffiliation?.clinicId) {
      dispatch(getSingleClinic(singleClinicAffiliation?.clinicId))
    }
  }, [singleClinicAffiliation?.clinicId, dispatch])

  const editClinicAffiliationFormik = useFormik<EditClinicAffiliationValues>({
    initialValues: mapDataToForm(singleClinicAffiliation || null),
    onSubmit: async (values) => {
      await dispatch(updateClinicAffiliation(values))
      navigate(RouteNames.START)
    },
    enableReinitialize: true,
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
            (!editClinicAffiliationFormik.values.consultationFee ||
              !editClinicAffiliationFormik.values.timePerPatient)) ||
          (currentStep === 1 &&
            editClinicAffiliationFormik.values.workingTime.every(
              (day) => !day.startTime || !day.stopTime,
            ))
        )
      }}
      onSubmit={() => editClinicAffiliationFormik.handleSubmit()}
    >
      <Step
        content={
          <StepEditBasicInfo
            formikProviderValue={editClinicAffiliationFormik}
          />
        }
        stepLabel={capitalizeFirstChar(t("clinic:editBasicInfo"))}
      />
      <Step
        content={
          <StepEditWorkingHours
            formikProviderValue={editClinicAffiliationFormik}
          />
        }
        stepLabel={capitalizeFirstChar(t("clinic:editWorkingHours"))}
      />
    </Stepper>
  )
}

export default EditClinicAffiliationForm
