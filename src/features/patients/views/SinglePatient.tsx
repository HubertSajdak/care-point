import { Grid, Typography } from "@mui/material"
import { t } from "i18next"
import React, { useEffect } from "react"
import { useParams } from "react-router-dom"

import { useAppDispatch } from "@/app/hooks"
import { getSinglePatient } from "@/features/patients"

import PatientBaseInfoCard from "../components/PatientBaseInfoCard"

const SinglePatient = () => {
  const params = useParams()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (params.patientId) {
      dispatch(getSinglePatient(params.patientId))
    }
  }, [params.patientId, dispatch])
  return (
    <div>
      <Typography component="h2" fontWeight="bold" mb={2} variant="h4">
        {t("common:patientProfile")}
      </Typography>
      <Grid alignItems={"stretch"} columnGap={3} rowSpacing={3} container>
        <Grid xs={12} item>
          <PatientBaseInfoCard />
        </Grid>
      </Grid>
    </div>
  )
}

export default SinglePatient
