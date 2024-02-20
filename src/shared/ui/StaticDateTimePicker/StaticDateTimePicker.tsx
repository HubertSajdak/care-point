import { Paper } from "@mui/material"
import {
  StaticDateTimePicker as MuiStaticDateTimePicker,
  StaticDateTimePickerProps as MuiStaticDateTimePickerProps,
} from "@mui/x-date-pickers"
import dayjs, { Dayjs } from "dayjs"
import updateLocale from "dayjs/plugin/updateLocale"
dayjs.extend(updateLocale)
dayjs.updateLocale("en", {
  weekStart: 1,
})
const StaticDateTimePicker = (props: MuiStaticDateTimePickerProps<Dayjs>) => {
  return (
    <Paper sx={{ maxWidth: 350 }}>
      <MuiStaticDateTimePicker ampm={false} {...props} />
    </Paper>
  )
}

export default StaticDateTimePicker
