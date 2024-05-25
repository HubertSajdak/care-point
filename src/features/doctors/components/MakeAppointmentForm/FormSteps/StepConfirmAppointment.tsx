import { FormikContextType } from "formik"
import React from "react"

import { MakeAppointmentValues } from "@/shared/store"
import { IClinicAffiliation, IDoctorUser } from "@/types/api-types"

import ConfirmAppointment from "../../ConfirmAppointment/ConfirmAppointment"

interface StepConfirmAppointmentProps {
  formikProviderValue: FormikContextType<MakeAppointmentValues>
  selectedClinic: IClinicAffiliation | undefined
  selectedDoctor: IDoctorUser | undefined
}

function StepConfirmAppointment({
  formikProviderValue,
  selectedClinic,
  selectedDoctor,
}: StepConfirmAppointmentProps) {
  return (
    <ConfirmAppointment
      address={selectedClinic?.clinicInfo?.address}
      appointmentDate={formikProviderValue.values.appointmentDate}
      clinicName={selectedClinic?.clinicName}
      consultationFee={formikProviderValue.values.consultationFee}
      doctorName={`${selectedDoctor?.name} ${selectedDoctor?.surname}`}
    />
  )
}

export default StepConfirmAppointment
