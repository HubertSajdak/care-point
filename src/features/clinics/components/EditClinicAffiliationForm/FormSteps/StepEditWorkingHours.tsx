import { Box, Container, Grid, Typography } from "@mui/material"
import dayjs from "dayjs"
import { FormikContextType, FormikProvider } from "formik"
import React from "react"
import { useTranslation } from "react-i18next"

import { useAppSelector } from "@/app/hooks"
import { workingDayConfig } from "@/constants/workingDayConfig"
import { translateWeekDays } from "@/shared"

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
              {workingDayConfig.map((el) => {
                return (
                  <WorkingDayRow
                    disableStartTime={
                      !singleClinic?.workingTime[el.id].startTime ||
                      !singleClinic?.workingTime[el.id].stopTime
                    }
                    disableStopTime={
                      !singleClinic?.workingTime[el.id].startTime ||
                      !singleClinic?.workingTime[el.id].stopTime ||
                      !formikProviderValue.values.workingTime[el.id].startTime
                    }
                    key={el.id}
                    label={t(translateWeekDays(el.label))}
                    startTimeLabel={t(`form:common.${el.startTimeLabel}`)}
                    startTimeMinTime={dayjs(
                      `2018-04-04 ${
                        singleClinic?.workingTime[el.id].startTime
                      }`,
                    ).add(15, "minute")}
                    startTimeName={el.startTimeName}
                    stopTimeLabel={t(`form:common.${el.stopTimeLabel}`)}
                    stopTimeMaxTime={dayjs(
                      `2018-04-04 ${singleClinic?.workingTime[el.id].stopTime}`,
                    )}
                    stopTimeMinTime={dayjs(
                      `2018-04-04 ${
                        formikProviderValue.values.workingTime[el.id].startTime
                      }`,
                    ).add(15, "minute")}
                    stopTimeName={el.stopTimeName}
                  />
                )
              })}
            </Grid>
          </Box>
        </Container>
      </form>
    </FormikProvider>
  )
}

export default StepEditWorkingHours
