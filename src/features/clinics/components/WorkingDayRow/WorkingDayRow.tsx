import { Divider, Grid, Typography } from "@mui/material"
import { Dayjs } from "dayjs"
import { useFormikContext } from "formik"
import { Fragment, useCallback } from "react"
import { useTranslation } from "react-i18next"

import { TimePicker } from "@/shared"

import { AddClinicFormValues } from "../../schemas/addClinic"

import { workingDayConfig } from "./workingDayConfig"

interface WorkingDayRowProps {
  disableStartTime?: ((workingDayId: number) => boolean | undefined) | undefined
  disableStopTime?: ((workingDayId: number) => boolean | undefined) | undefined
  startTimeMaxTime?: ((workingDayId: number) => Dayjs | undefined) | undefined
  startTimeMinTime?: ((workingDayId: number) => Dayjs | undefined) | undefined
  stopTimeMaxTime?: ((workingDayId: number) => Dayjs | undefined) | undefined
  stopTimeMinTime?: ((workingDayId: number) => Dayjs | undefined) | undefined
}

const WorkingDayRow = ({
  disableStartTime,
  disableStopTime,
  startTimeMaxTime,
  startTimeMinTime,
  stopTimeMaxTime,
  stopTimeMinTime,
}: WorkingDayRowProps) => {
  const { setFieldValue } = useFormikContext<AddClinicFormValues>()
  const { t } = useTranslation()

  const checkStopTimeDisabled = useCallback(
    (id: number) => {
      if (disableStopTime) {
        return disableStopTime(id)
      }
      return undefined
    },
    [disableStopTime],
  )
  const checkStartTimeDisabled = useCallback(
    (id: number) => {
      if (disableStartTime) {
        return disableStartTime(id)
      }
      return undefined
    },
    [disableStartTime],
  )
  const checkStopTimeMinTime = useCallback(
    (id: number) => {
      if (stopTimeMinTime) {
        return stopTimeMinTime(id)
      }
      return undefined
    },
    [stopTimeMinTime],
  )
  const checkStartTimeMinTime = useCallback(
    (id: number) => {
      if (startTimeMinTime) {
        return startTimeMinTime(id)
      }
      return undefined
    },
    [startTimeMinTime],
  )
  const checkStopTimeMaxTime = useCallback(
    (id: number) => {
      if (stopTimeMaxTime) {
        return stopTimeMaxTime(id)
      }
      return undefined
    },
    [stopTimeMaxTime],
  )
  const checkStartTimeMaxTime = useCallback(
    (id: number) => {
      if (startTimeMaxTime) {
        return startTimeMaxTime(id)
      }
      return undefined
    },
    [startTimeMaxTime],
  )
  return (
    <>
      {workingDayConfig.map(
        ({
          id,
          label,
          startTimeLabel,
          startTimeName,
          stopTimeLabel,
          stopTimeName,
        }) => {
          const isStopTimeDisabled = checkStopTimeDisabled(id)
          const isStartTimeDisabled = checkStartTimeDisabled(id)
          const startMaxTime = checkStartTimeMaxTime(id)
          const startMinTime = checkStartTimeMinTime(id)
          const stopMaxTime = checkStopTimeMaxTime(id)
          const stopMinTime = checkStopTimeMinTime(id)
          return (
            <Fragment key={id}>
              <Grid
                alignItems="center"
                display="flex"
                justifyContent="center"
                sm={3}
                xs={12}
                item
              >
                <Typography variant="h6">{label}</Typography>
              </Grid>
              <Grid sm={3} xs={12} item>
                <TimePicker
                  ampm={false}
                  disabled={isStartTimeDisabled}
                  label={t(`form:common.${startTimeLabel}`)}
                  maxTime={startMaxTime}
                  minTime={startMinTime}
                  minutesStep={5}
                  name={startTimeName}
                  onChange={async () => {
                    await setFieldValue(`${stopTimeName}`, "")
                  }}
                />
              </Grid>
              <Grid
                alignItems="center"
                display="flex"
                justifyContent="center"
                sm={3}
                xs={12}
                item
              >
                <Divider orientation="horizontal" sx={{ width: "50%" }} />
              </Grid>
              <Grid sm={3} xs={12} item>
                <TimePicker
                  ampm={false}
                  disabled={isStopTimeDisabled}
                  label={t(`form:common.${stopTimeLabel}`)}
                  maxTime={stopMaxTime}
                  minTime={stopMinTime}
                  minutesStep={5}
                  name={stopTimeName}
                />
              </Grid>
            </Fragment>
          )
        },
      )}
    </>
  )
}

export default WorkingDayRow
