import { Grid, Typography } from "@mui/material"
import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

import { useAppDispatch } from "@/app/hooks"
import { getSingleClinic } from "@/features/clinics"

import ClinicBaseInfoCard from "../components/ClinicBaseInfoCard/ClinicBaseInfoCard"
import ClinicWorkingHoursCard from "../components/ClinicWorkingHoursCard/ClinicWorkingHoursCard"

const SingleClinic = () => {
  const { t } = useTranslation()
  const params = useParams()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (params.clinicId) {
      dispatch(getSingleClinic(params.clinicId))
    }
  }, [params.clinicId, dispatch])
  return (
    <div>
      <Typography component="h2" fontWeight="bold" mb={2} variant="h4">
        {t("clinic:clinicProfile")}
      </Typography>
      <Grid rowSpacing={4} container>
        <Grid xs={12} item>
          <ClinicBaseInfoCard />
        </Grid>
        <Grid xs={12} item>
          <ClinicWorkingHoursCard />
        </Grid>
      </Grid>
    </div>
  )
}

export default SingleClinic
