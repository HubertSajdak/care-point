import {
  StaticDateTimePicker as MuiStaticDateTimePicker,
  StaticDateTimePickerProps as MuiStaticDateTimePickerProps,
} from "@mui/x-date-pickers"
import dayjs, { Dayjs } from "dayjs"
import updateLocale from "dayjs/plugin/updateLocale"

import { PaddingPaper } from "@/shared"

dayjs.extend(updateLocale)
dayjs.updateLocale("en", {
  weekStart: 1,
})
const StaticDateTimePicker = (props: MuiStaticDateTimePickerProps<Dayjs>) => {
  return (
    <PaddingPaper sx={{ maxWidth: 350 }}>
      <MuiStaticDateTimePicker
        ampm={false}
        {...props}
        sx={{
          "& .MuiClockNumber-root": {
            fontWeight: "bold",
            fontSize: 16,
          },
        }}
      />
    </PaddingPaper>
  )
}

export default StaticDateTimePicker
