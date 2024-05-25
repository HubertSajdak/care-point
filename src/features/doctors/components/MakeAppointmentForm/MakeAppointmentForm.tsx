import { Box, CircularProgress } from "@mui/material"
import { DateOrTimeView } from "@mui/x-date-pickers"
import dayjs, { Dayjs } from "dayjs"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { RouteNames } from "@/constants"
import { capitalizeFirstChar, FetchDataError, Stepper } from "@/shared"
import { createAppointment, MakeAppointmentValues } from "@/shared/store"
import CommonError from "@/shared/ui/CommonError/CommonError"
import Step from "@/shared/ui/Stepper/Step"
import { IClinicAffiliation } from "@/types/api-types"

import { makeAppointmentSchema } from "../../schemas/makeAppointment"

import StepConfirmAppointment from "./FormSteps/StepConfirmAppointment"
import StepSelectClinic from "./FormSteps/StepSelectClinic"
import StepSelectDate from "./FormSteps/StepSelectDate"
import { mapDataToForm } from "./mapDataToForm"

const MakeAppointmentForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const selectedDoctor = useAppSelector(
    (state) => state.doctors.selectedDoctorData,
  )

  const status = useAppSelector((state) => state.doctors.status)
  const { t } = useTranslation()
  const user = useAppSelector((state) => state.auth.user)
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)
  const [currentView, setCurrentView] = useState<DateOrTimeView>("month")
  const [selectedClinic, setSelectedClinic] = useState<
    IClinicAffiliation | undefined
  >(undefined)
  const [isActionSubmitDisabled, setIsActionSubmitDisabled] = useState(true)

  const makeAppointmentFormik = useFormik<MakeAppointmentValues>({
    initialValues: mapDataToForm(user?._id, selectedDoctor?._id),
    enableReinitialize: true,
    validationSchema: makeAppointmentSchema,
    onSubmit: async (values) => {
      await dispatch(createAppointment(values))
      navigate(RouteNames.START)
    },
  })

  useEffect(() => {
    if (selectedDate && selectedDate >= dayjs() && currentView === "minutes") {
      setIsActionSubmitDisabled(false)
    } else {
      setIsActionSubmitDisabled(true)
    }
  }, [currentView, selectedDate])
  if (status === "loading") {
    return (
      <Box display="flex" justifyContent="center" width="100%">
        <CircularProgress />
      </Box>
    )
  }
  if (!selectedDoctor) {
    return <FetchDataError />
  }
  if (selectedDoctor && selectedDoctor.ClinicAffiliation.length === 0) {
    return <CommonError translationKey="common:errors.noClinicAffiliations" />
  }

  return (
    <Stepper
      disableNextButton={(currentView) => {
        return (
          (currentView === 0 &&
            !makeAppointmentFormik.values.clinicAffiliationId) ||
          (currentView === 1 &&
            !makeAppointmentFormik.values.appointmentDate) ||
          (currentView === 1 &&
            makeAppointmentFormik.values.appointmentDate === "Invalid Date")
        )
      }}
      onSubmit={async () => makeAppointmentFormik.handleSubmit()}
    >
      <Step
        content={
          <StepSelectClinic
            formikProviderValue={makeAppointmentFormik}
            setSelectedClinic={(clinicAffiliation) =>
              setSelectedClinic(clinicAffiliation)
            }
          />
        }
        stepLabel={capitalizeFirstChar(t("form:appointment.selectClinic"))}
      />
      <Step
        content={
          <StepSelectDate
            currentView={currentView}
            formikProviderValue={makeAppointmentFormik}
            isActionSubmitDisabled={isActionSubmitDisabled}
            selectedClinic={selectedClinic}
            selectedDate={selectedDate}
            setCurrentView={(value) => setCurrentView(value)}
            setSelectedDate={(value) => setSelectedDate(value)}
          />
        }
        stepLabel={capitalizeFirstChar(t("form:appointment.selectDate"))}
      />
      <Step
        content={
          <StepConfirmAppointment
            formikProviderValue={makeAppointmentFormik}
            selectedClinic={selectedClinic}
            selectedDoctor={selectedDoctor}
          />
        }
        stepLabel={capitalizeFirstChar(t("form:appointment.confirm"))}
      />
    </Stepper>
  )
}

export default MakeAppointmentForm
