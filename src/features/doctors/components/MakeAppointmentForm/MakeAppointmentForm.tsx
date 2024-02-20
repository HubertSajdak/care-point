import { Box, CircularProgress } from "@mui/material"
import dayjs from "dayjs"
import { FormikProvider, useFormik } from "formik"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { RouteNames } from "@/constants"
import { makeAppointmentSchema } from "@/libs/yup/schemas/makeAppointment"
import { MakeAppointmentValues, createAppointment } from "@/redux"
import {
  FetchDataError,
  StaticDateTimePicker,
  Stepper,
  capitalizeFirstChar,
  enabledDays,
  enabledTime,
} from "@/shared"
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
  const status = useAppSelector((state) => state.doctors.status)
  const { t } = useTranslation()
  const user = useAppSelector((state) => state.auth.user)
  const [activeStep, setActiveStep] = useState(0)
  const [selectedClinic, setSelectedClinic] = useState<
    IClinicAffiliation | undefined
  >(undefined)

  const handleClinicSelection = (
    id: string,
    address: IAddress,
    consultationFee: number,
    clinicId: string,
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
    },
    enableReinitialize: true,
    validationSchema: makeAppointmentSchema,
    onSubmit: async (values) => {
      await dispatch(createAppointment(values))
      navigate(RouteNames.START)
    },
  })

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
              defaultValue={dayjs(makeAppointmentFormik.values.appointmentDate)}
              displayStaticWrapperAs="mobile"
              minutesStep={selectedClinic?.timePerPatient}
              shouldDisableDate={(date) =>
                enabledDays(date, selectedClinic!.workingHours)
              }
              shouldDisableTime={(date) => {
                return !enabledTime(date, selectedClinic!.workingHours)
              }}
              slotProps={{
                actionBar: {
                  actions: ["clear", "accept"],
                },
              }}
              disablePast
              onAccept={(newValue) => {
                return makeAppointmentFormik.setFieldValue(
                  "appointmentDate",
                  `${dayjs(newValue).format("YYYY-MM-DD HH:mm")}`,
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
