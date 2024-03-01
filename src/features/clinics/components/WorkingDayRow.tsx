import { Divider, Grid, Typography } from "@mui/material"
import dayjs from "dayjs"
import { useFormikContext } from "formik"

import { AddClinicFormValues } from "@/libs"
import { TimePicker } from "@/shared"
interface WorkingDayRowProps {
  id: number
  label: string
  startTimeLabel: string
  startTimeName: string
  stopTimeLabel: string
  stopTimeName: string
}
const WorkingDayRow = ({
  id,
  label,
  startTimeLabel,
  startTimeName,
  stopTimeLabel,
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
          label={startTimeLabel}
          minutesStep={5}
          name={startTimeName}
          onChange={() => {
            setFieldValue(`workingTime[${id}].stopTime`, "")
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
          disabled={!values.workingTime[id].startTime}
          label={stopTimeLabel}
          minTime={dayjs(`2018-04-04 ${values.workingTime[id].startTime}`).add(
            15,
            "minute",
          )}
          minutesStep={5}
          name={stopTimeName}
        />
      </Grid>
    </>
  )
}

export default WorkingDayRow
