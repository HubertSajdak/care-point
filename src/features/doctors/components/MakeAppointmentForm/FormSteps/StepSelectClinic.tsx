import { FormikContextType, FormikProvider } from "formik"
import React from "react"

import { useAppSelector } from "@/app/hooks"
import { MakeAppointmentValues } from "@/shared/store"
import { IAddress, IClinicAffiliation } from "@/types/api-types"

import ClinicSelection from "../../ClinicSelection/ClinicSelection"

interface StepSelectClinicProps {
  formikProviderValue: FormikContextType<MakeAppointmentValues>
  setSelectedClinic: (clinicAffiliation: IClinicAffiliation | undefined) => void
}

function StepSelectClinic({
  formikProviderValue,
  setSelectedClinic,
}: StepSelectClinicProps) {
  const selectedDoctor = useAppSelector(
    (state) => state.doctors.selectedDoctorData,
  )

  const handleClinicSelection = async (
    id: string,
    address: IAddress,
    consultationFee: number,
    clinicId: string,
    timePerPatient: number,
  ) => {
    await formikProviderValue.setFieldValue("clinicAffiliationId", id)
    if (selectedDoctor && selectedDoctor.ClinicAffiliation.length > 0) {
      const findClinicAffiliation = selectedDoctor.ClinicAffiliation.find(
        (clinic) => clinic._id === id,
      )
      setSelectedClinic(findClinicAffiliation)
    }
    await formikProviderValue.setFieldValue("appointmentAddress", address)
    await formikProviderValue.setFieldValue("consultationFee", consultationFee)
    await formikProviderValue.setFieldValue("clinicId", clinicId)
    await formikProviderValue.setFieldValue("timePerPatient", timePerPatient)
  }
  return (
    <FormikProvider value={formikProviderValue}>
      <ClinicSelection
        clinicAffiliations={selectedDoctor?.ClinicAffiliation || []}
        selectedClinicId={formikProviderValue.values.clinicAffiliationId}
        onClick={handleClinicSelection}
      />
    </FormikProvider>
  )
}

export default StepSelectClinic
