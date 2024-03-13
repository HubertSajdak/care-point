import { Typography } from "@mui/material"
import Box from "@mui/material/Box"
import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"

import { useAppDispatch } from "@/app/hooks"
import {
  getAllSpecializations,
  getDoctorSpecializations,
} from "@/features/specializations"

import AddDoctorSpecializationForm from "../components/AddDoctorSpecializationForm/AddDoctorSpecializationForm"

const MySpecializations = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllSpecializations())
    dispatch(getDoctorSpecializations())
  }, [dispatch])

  return (
    <div>
      <Typography component="h2" fontWeight="bold" mb={2} variant="h4">
        {t("specializations:mySpecializationsTitle")}
      </Typography>
      <Typography component="h3" mb={2} variant="subtitle1">
        {t("specializations:mySpecializationsSubtitle")}
      </Typography>
      <Box display="flex" justifyContent="center">
        <AddDoctorSpecializationForm />
      </Box>
    </div>
  )
}

export default MySpecializations
