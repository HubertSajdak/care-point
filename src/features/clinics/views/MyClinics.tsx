import { Box, CircularProgress, Grid, Typography } from "@mui/material"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { getUserClinicsAffiliations } from "@/features/clinics"
import { NoDataMsg } from "@/shared"

import ClinicCard from "../components/ClinicCard/ClinicCard"

const MyClinics = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { data } = useAppSelector(
    (state) => state.clinics.userClinicAffiliations,
  )
  const status = useAppSelector((state) => state.clinics.status)
  useEffect(() => {
    dispatch(getUserClinicsAffiliations())
  }, [dispatch])
  return (
    <>
      <Typography component="h2" fontWeight="bold" mb={2} variant="h4">
        {t("clinic:myClinicsTitle")}
      </Typography>
      <Typography component="h3" mb={2} variant="subtitle1">
        {t("clinic:myClinicsSubtitle")}
      </Typography>
      <Grid columnSpacing={3} marginY={4} rowSpacing={4} container>
        {data && data.length > 0 && status === "idle" ? (
          data.map(
            ({
              _id,
              clinicInfo,
              clinicName,
              consultationFee,
              timePerPatient,
              workingTime,
            }) => {
              return (
                <Grid key={_id} lg={6} sm={12} xs={12} item>
                  <ClinicCard
                    address={clinicInfo.address}
                    clinicName={clinicName}
                    clinicWorkingTime={clinicInfo.workingTime}
                    consultationFee={consultationFee}
                    doctorWorkingTime={workingTime}
                    id={_id}
                    photo={clinicInfo.photo}
                    timePerPatient={timePerPatient}
                  />
                </Grid>
              )
            },
          )
        ) : status === "loading" ? (
          <Box display="flex" justifyContent="center" width="100%">
            <CircularProgress />
          </Box>
        ) : (
          <NoDataMsg />
        )}
      </Grid>
    </>
  )
}

export default MyClinics
