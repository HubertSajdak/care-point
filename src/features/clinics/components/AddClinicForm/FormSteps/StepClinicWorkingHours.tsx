import { Container, Grid, Typography } from "@mui/material"
import dayjs from "dayjs"
import { FormikContextType, FormikProvider } from "formik"
import React from "react"
import { useTranslation } from "react-i18next"

import { workingDayConfig } from "@/constants/workingDayConfig"
import { translateWeekDays } from "@/shared"

import { AddClinicFormValues } from "../../../schemas/addClinic"
import WorkingDayRow from "../../WorkingDayRow/WorkingDayRow"

interface StepClinicWorkingHoursProps {
  formikProviderValue: FormikContextType<AddClinicFormValues>
}

function StepClinicWorkingHours({
  formikProviderValue,
}: StepClinicWorkingHoursProps) {
  const { t } = useTranslation()
  return (
    <FormikProvider value={formikProviderValue}>
      <form>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 2,
          }}
        >
          <Typography component="h3" mb={4} variant="h5">
            {t("form:clinic.chooseWorkingTime")}
          </Typography>
          <Grid maxWidth={800} rowSpacing={2} container>
            {workingDayConfig.map((day) => {
              return (
                <WorkingDayRow
                  disableStopTime={
                    !formikProviderValue.values.workingTime[day.id].startTime
                  }
                  key={day.id}
                  label={t(translateWeekDays(day.label))}
                  startTimeLabel={t(`form:common.${day.startTimeLabel}`)}
                  startTimeName={day.startTimeName}
                  stopTimeLabel={t(`form:common.${day.stopTimeLabel}`)}
                  stopTimeMinTime={dayjs(
                    `2018-04-04 ${
                      formikProviderValue.values.workingTime[day.id].startTime
                    }`,
                  ).add(15, "minute")}
                  stopTimeName={day.stopTimeName}
                />
              )
            })}
          </Grid>
        </Container>
      </form>
    </FormikProvider>
  )
}

export default StepClinicWorkingHours
