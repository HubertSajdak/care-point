import { Divider, Grid, Typography } from "@mui/material"
import { Dayjs } from "dayjs"
import { useFormikContext } from "formik"

import { AddClinicFormValues } from "@/libs"
import { TimePicker } from "@/shared"
interface WorkingDayRowProps {
  disableStartTime?: boolean
  disableStopTime?: boolean
  id: number
  label: string
  startTimeLabel: string
  startTimeMaxTime?: Dayjs | undefined
  startTimeMinTime?: Dayjs | undefined
  startTimeName: string
  stopTimeLabel: string
  stopTimeMaxTime?: Dayjs | undefined
  stopTimeMinTime?: Dayjs | undefined
  stopTimeName: string
}
const WorkingDayRow = ({
  disableStartTime,
  disableStopTime,
  id,
  label,
  startTimeLabel,
  startTimeMaxTime,
  startTimeMinTime,
  startTimeName,
  stopTimeLabel,
  stopTimeMaxTime,
  stopTimeMinTime,
  stopTimeName,
}: WorkingDayRowProps) => {
  const { setFieldValue, values } = useFormikContext<AddClinicFormValues>()
  return (
    <>
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
          disabled={disableStartTime}
          label={startTimeLabel}
          maxTime={startTimeMaxTime}
          minTime={startTimeMinTime}
          minutesStep={5}
          name={startTimeName}
          onChange={() => {
            setFieldValue(`${stopTimeName}`, "")
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
          disabled={disableStopTime}
          label={stopTimeLabel}
          maxTime={stopTimeMaxTime}
          minTime={stopTimeMinTime}
          minutesStep={5}
          name={stopTimeName}
        />
      </Grid>
    </>
  )
}

export default WorkingDayRow
