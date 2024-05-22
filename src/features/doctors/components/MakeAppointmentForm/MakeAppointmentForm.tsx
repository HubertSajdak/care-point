import { Box, CircularProgress } from "@mui/material"
import { DateOrTimeView } from "@mui/x-date-pickers"
import dayjs, { Dayjs } from "dayjs"
import { FormikProvider, useFormik } from "formik"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { RouteNames } from "@/constants"
import { makeAppointmentSchema } from "@/libs"
import {
  capitalizeFirstChar,
  enabledDays,
  enabledTime,
  FetchDataError,
  StaticDateTimePicker,
  Stepper,
} from "@/shared"
import { createAppointment, MakeAppointmentValues } from "@/shared/store"
import CommonError from "@/shared/ui/CommonError/CommonError"
import { IAddress, IClinicAffiliation } from "@/types/api-types"

import ClinicSelection from "../ClinicSelection/ClinicSelection"
import ConfirmAppointment from "../ConfirmAppointment/ConfirmAppointment"

const MakeAppointmentForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const selectedDoctor = useAppSelector(
    (state) => state.doctors.selectedDoctorData,
  )
  const selectedDoctorAppointments = useAppSelector(
    (state) => state.appointments.doctorAppointments,
  )
  const status = useAppSelector((state) => state.doctors.status)
  const { t } = useTranslation()
  const user = useAppSelector((state) => state.auth.user)
  const [activeStep, setActiveStep] = useState(0)
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)
  const [currentView, setCurrentView] = useState<DateOrTimeView>("month")
  const [selectedClinic, setSelectedClinic] = useState<
    IClinicAffiliation | undefined
  >(undefined)
  const [isActionSubmitDisabled, setIsActionSubmitDisabled] = useState(true)
  const handleClinicSelection = (
    id: string,
    address: IAddress,
    consultationFee: number,
    clinicId: string,
    timePerPatient: number,
  ) => {
    makeAppointmentFormik.setFieldValue("clinicAffiliationId", id)
    if (selectedDoctor && selectedDoctor.ClinicAffiliation.length > 0) {
      const findClinicAffiliation = selectedDoctor.ClinicAffiliation.find(
        (clinic) => clinic._id === id,
      )
      setSelectedClinic(findClinicAffiliation)
    }
    makeAppointmentFormik.setFieldValue("appointmentAddress", address)
    makeAppointmentFormik.setFieldValue("consultationFee", consultationFee)
    makeAppointmentFormik.setFieldValue("clinicId", clinicId)
    makeAppointmentFormik.setFieldValue("timePerPatient", timePerPatient)
  }

  const makeAppointmentFormik = useFormik<MakeAppointmentValues>({
    initialValues: {
      clinicAffiliationId: "",
      appointmentDate: "",
      clinicId: "",
      patientId: user?._id || "",
      doctorId: selectedDoctor?._id || "",
      appointmentAddress: {
        street: "",
        city: "",
        postalCode: "",
      },
      appointmentStatus: "active",
      consultationFee: 0,
      timePerPatient: 0,
    },
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

  const steps = [
    {
      id: 0,
      stepLabel: `${capitalizeFirstChar(t("form:appointment.selectClinic"))}`,
      stepElement: (
        <FormikProvider value={makeAppointmentFormik}>
          <ClinicSelection
            clinicAffiliations={selectedDoctor?.ClinicAffiliation || []}
            selectedClinicId={makeAppointmentFormik.values.clinicAffiliationId}
            onClick={handleClinicSelection}
          />
        </FormikProvider>
      ),
    },
    {
      id: 1,
      stepLabel: `${capitalizeFirstChar(t("form:appointment.selectDate"))}`,
      stepElement: (
        <FormikProvider value={makeAppointmentFormik}>
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            width="100%"
          >
            <StaticDateTimePicker
              ampm={false}
              displayStaticWrapperAs="mobile"
              minutesStep={5}
              shouldDisableDate={(date) =>
                enabledDays(date, selectedClinic!.workingTime)
              }
              shouldDisableTime={(date, view) => {
                return !enabledTime(
                  date,
                  selectedClinic!.workingTime,
                  selectedDoctorAppointments?.data || [],
                  view,
                  selectedClinic?.timePerPatient || 0,
                )
              }}
              slotProps={{
                actionBar: {
                  actions: !isActionSubmitDisabled
                    ? ["clear", "accept"]
                    : ["clear"],
                },
              }}
              value={selectedDate}
              view={currentView}
              disablePast
              onAccept={(newValue) => {
                return makeAppointmentFormik.setFieldValue(
                  "appointmentDate",
                  `${dayjs(newValue).format("YYYY-MM-DD HH:mm")}`,
                )
              }}
              onChange={(value) => {
                setSelectedDate(value)
              }}
              onViewChange={(view) => {
                setCurrentView(view)
                return makeAppointmentFormik.setFieldValue(
                  "appointmentDate",
                  "",
                )
              }}
            />
          </Box>
        </FormikProvider>
      ),
    },
    {
      id: 2,
      stepLabel: `${capitalizeFirstChar(t("form:appointment.confirm"))}`,
      stepElement: (
        <ConfirmAppointment
          address={selectedClinic?.clinicInfo?.address}
          appointmentDate={makeAppointmentFormik.values.appointmentDate}
          clinicName={selectedClinic?.clinicName}
          consultationFee={makeAppointmentFormik.values.consultationFee}
          doctorName={`${selectedDoctor?.name} ${selectedDoctor?.surname}`}
        />
      ),
    },
  ]

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      return makeAppointmentFormik.handleSubmit()
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <Stepper
      activeStep={activeStep}
      handleBack={handleBack}
      handleNext={handleNext}
      isNextButtonDisabled={
        (activeStep === 0 &&
          !makeAppointmentFormik.values.clinicAffiliationId) ||
        (activeStep === 1 && !makeAppointmentFormik.values.appointmentDate) ||
        (activeStep === 1 &&
          makeAppointmentFormik.values.appointmentDate === "Invalid Date")
      }
      isSubmitting={makeAppointmentFormik.isSubmitting}
      steps={steps}
    />
  )
}

export default MakeAppointmentForm
