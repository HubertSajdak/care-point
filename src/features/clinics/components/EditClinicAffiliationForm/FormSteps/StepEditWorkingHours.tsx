import { Box, Container, Grid, Typography } from "@mui/material"
import dayjs from "dayjs"
import { FormikContextType, FormikProvider } from "formik"
import React from "react"
import { useTranslation } from "react-i18next"

import { useAppSelector } from "@/app/hooks"

import { AddClinicAffiliationValues } from "../../../schemas/addClinicAffiliation"
import WorkingDayRow from "../../WorkingDayRow/WorkingDayRow"
import WorkingHoursRow from "../../WorkingHoursRow/WorkingHoursRow"

interface EditClinicAffiliationValues extends AddClinicAffiliationValues {
  clinicAffiliationId: string
}

interface StepEditWorkingHoursProps {
  formikProviderValue: FormikContextType<EditClinicAffiliationValues>
}

function StepEditWorkingHours({
  formikProviderValue,
}: StepEditWorkingHoursProps) {
  const { t } = useTranslation()
  const singleClinic = useAppSelector((state) => state.clinics.singleClinic)

  return (
    <FormikProvider value={formikProviderValue}>
      <form>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 0,
            py: 6,
            gap: 2,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box sx={{ alignSelf: { xs: "center", md: "flex-start" } }}>
            <Typography mb={4} textAlign="center" variant="h6">
              {singleClinic?.clinicName} {t("clinic:openHours")}:
            </Typography>

            {singleClinic?.workingTime && (
              <WorkingHoursRow workingTime={singleClinic?.workingTime} />
            )}
          </Box>
          <Box>
            <Typography mb={4} textAlign="center" variant="h6">
              {t("clinic:selectYourWorkingHours")}:
            </Typography>
            <Grid maxWidth={800} rowSpacing={2} container>
              <WorkingDayRow
                disableStartTime={(workingDayId) => {
                  return (
                    !singleClinic?.workingTime[workingDayId].startTime ||
                    !singleClinic?.workingTime[workingDayId].stopTime
                  )
                }}
                disableStopTime={(workingDayId) => {
                  return (
                    !singleClinic?.workingTime[workingDayId].startTime ||
                    !singleClinic?.workingTime[workingDayId].stopTime ||
                    !formikProviderValue.values.workingTime[workingDayId]
                      .startTime
                  )
                }}
                startTimeMinTime={(workingDayId) => {
                  return dayjs(
                    `2018-04-04 ${singleClinic?.workingTime[workingDayId].startTime}`,
                  ).add(15, "minute")
                }}
                stopTimeMaxTime={(workingDayId) => {
                  return dayjs(
                    `2018-04-04 ${singleClinic?.workingTime[workingDayId].stopTime}`,
                  )
                }}
                stopTimeMinTime={(workingDayId) => {
                  return dayjs(
                    `2018-04-04 ${formikProviderValue.values.workingTime[workingDayId].startTime}`,
                  ).add(15, "minute")
                }}
              />
            </Grid>
          </Box>
        </Container>
      </form>
    </FormikProvider>
  )
}

export default StepEditWorkingHours
