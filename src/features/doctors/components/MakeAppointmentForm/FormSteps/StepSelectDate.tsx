import { Box } from "@mui/material"
import { DateOrTimeView } from "@mui/x-date-pickers"
import dayjs, { Dayjs } from "dayjs"
import { FormikContextType, FormikProvider } from "formik"
import React from "react"

import { useAppSelector } from "@/app/hooks"
import { enabledDays, enabledTime, StaticDateTimePicker } from "@/shared"
import { MakeAppointmentValues } from "@/shared/store"
import { IClinicAffiliation } from "@/types/api-types"

interface StepSelectDateProps {
  currentView: DateOrTimeView | undefined
  formikProviderValue: FormikContextType<MakeAppointmentValues>
  isActionSubmitDisabled: boolean
  selectedClinic: IClinicAffiliation | undefined
  selectedDate: Dayjs | null | undefined
  setCurrentView: (value: DateOrTimeView) => void
  setSelectedDate: (value: Dayjs | null) => void
}

function StepSelectDate({
  currentView,
  formikProviderValue,
  isActionSubmitDisabled,
  selectedClinic,
  selectedDate,
  setCurrentView,
  setSelectedDate,
}: StepSelectDateProps) {
  const selectedDoctorAppointments = useAppSelector(
    (state) => state.appointments.doctorAppointments,
  )
  return (
    <FormikProvider value={formikProviderValue}>
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
            return formikProviderValue.setFieldValue(
              "appointmentDate",
              `${dayjs(newValue).format("YYYY-MM-DD HH:mm")}`,
            )
          }}
          onChange={(value) => {
            setSelectedDate(value)
          }}
          onViewChange={(view) => {
            setCurrentView(view)
            return formikProviderValue.setFieldValue("appointmentDate", "")
          }}
        />
      </Box>
    </FormikProvider>
  )
}

export default StepSelectDate
