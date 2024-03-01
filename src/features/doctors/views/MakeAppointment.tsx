import { Box, Typography } from "@mui/material"
import { t } from "i18next"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

import { useAppDispatch } from "@/app/hooks"
import { getSingleDoctor } from "@/features/doctors"

import MakeAppointmentForm from "../components/MakeAppointmentForm/MakeAppointmentForm"

const MakeAppointment = () => {
  const { doctorId } = useParams()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!doctorId) return
    dispatch(getSingleDoctor(doctorId))
  }, [dispatch, doctorId])

  return (
    <Box>
      <Typography component="h2" fontWeight="bold" mb={2} variant="h4">
        {t("common:makeAppointment")}
      </Typography>
      <Typography component="h3" mb={2} variant="subtitle1">
        {t("appointment:makeAppointmentDescription")}
      </Typography>
      <Box>
        <MakeAppointmentForm />
      </Box>
    </Box>
  )
}

export default MakeAppointment
