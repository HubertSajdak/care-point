import { Box, Container, Grid, Typography } from "@mui/material"
import dayjs from "dayjs"
import { FormikContextType, FormikProvider } from "formik"
import React from "react"
import { useTranslation } from "react-i18next"

import { useAppSelector } from "@/app/hooks"
import { workingDayConfig } from "@/constants/workingDayConfig"

import { AddClinicAffiliationValues } from "../../../schemas/addClinicAffiliation"
import WorkingDayRow from "../../WorkingDayRow/WorkingDayRow"
import WorkingHoursRow from "../../WorkingHoursRow/WorkingHoursRow"

interface StepAffiliationWorkingHoursProps {
  formikProviderValue: FormikContextType<AddClinicAffiliationValues>
}

function StepAffiliationWorkingHours({
  formikProviderValue,
}: StepAffiliationWorkingHoursProps) {
  const singleClinic = useAppSelector((state) => state.clinics.singleClinic)
  const { t } = useTranslation()
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
            {singleClinic?.workingTime.map((el) => {
              return (
                <WorkingHoursRow
                  key={el._id}
                  startTime={el.startTime}
                  stopTime={el.stopTime}
                  weekDay={el.weekDay}
                />
              )
            })}
          </Box>
          <Box>
            <Typography mb={4} textAlign="center" variant="h6">
              {t("clinic:selectYourWorkingHours")}:
            </Typography>
            <Grid maxWidth={800} rowSpacing={2} container>
              <WorkingDayRow
                disableStartTime={(workingDayId) => {
                  if (typeof workingDayId === "number") {
                    return (
                      !singleClinic?.workingTime[workingDayId].startTime ||
                      !singleClinic?.workingTime[workingDayId].stopTime
                    )
                  }
                }}
                disableStopTime={(workingDayId) => {
                  if (typeof workingDayId === "number") {
                    return (
                      !singleClinic?.workingTime[workingDayId].startTime ||
                      !singleClinic?.workingTime[workingDayId].stopTime ||
                      !formikProviderValue.values.workingTime[workingDayId]
                        .startTime
                    )
                  }
                }}
                startTimeMinTime={(workingDayId) => {
                  if (typeof workingDayId === "number") {
                    return dayjs(
                      `2018-04-04 ${singleClinic?.workingTime[workingDayId].startTime}`,
                    ).add(15, "minute")
                  }
                }}
                stopTimeMaxTime={(workingDayId) => {
                  if (typeof workingDayId === "number") {
                    return dayjs(
                      `2018-04-04 ${singleClinic?.workingTime[workingDayId].stopTime}`,
                    )
                  }
                }}
                stopTimeMinTime={(workingDayId) => {
                  if (typeof workingDayId === "number") {
                    return dayjs(
                      `2018-04-04 ${formikProviderValue.values.workingTime[workingDayId].startTime}`,
                    ).add(15, "minute")
                  }
                }}
                workingDays={workingDayConfig}
              />
            </Grid>
          </Box>
        </Container>
      </form>
    </FormikProvider>
  )
}

export default StepAffiliationWorkingHours
