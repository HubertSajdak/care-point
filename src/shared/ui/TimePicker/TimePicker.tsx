import { Box } from "@mui/material"
import {
  DesktopTimePicker as MuiDesktopTimePicker,
  DesktopTimePickerProps as MuiDesktopTimePickerProps,
} from "@mui/x-date-pickers"
import dayjs, { Dayjs } from "dayjs"
import { useField } from "formik"
import { useTranslation } from "react-i18next"

import { normalizeKey } from "@/shared"

interface DesktopTimePickerProps extends MuiDesktopTimePickerProps<Dayjs> {
  helperText?: string
  name: string
}

const TimePicker = ({
  helperText,
  name,
  onChange,
  ...DesktopTimePickerProps
}: DesktopTimePickerProps) => {
  const { t } = useTranslation()
  const [field, meta, { setTouched, setValue }] = useField(name)
  const onKeyDown = (e: { preventDefault: () => void }) => {
    e.preventDefault()
  }

  const formatTime = dayjs()
    .set("hour", field.value.split(":")[0])
    .set("minute", field.value.split(":")[1])
  return (
    <Box display="flex" flexDirection="column">
      <MuiDesktopTimePicker
        ampm={false}
        formatDensity="spacious"
        slotProps={{
          actionBar: {
            actions: ["clear", "accept"],
          },
          field: {
            ...(!field.value && { value: null }),
          },
          textField: {
            error: meta.touched && Boolean(meta.error),
            onBlur: field.onBlur,
            helperText:
              meta.touched && meta.error
                ? t(normalizeKey(meta.error))
                : helperText
                ? helperText
                : null,
            name: name,
            onKeyDown: onKeyDown,
          },
        }}
        value={formatTime}
        onChange={(value, context) => {
          if (onChange) {
            onChange(value, context)
          }
          if (!value) {
            return setValue("")
          }
          const time = dayjs(value).format("HH:mm")
          setValue(time)
        }}
        onClose={() => setTouched(true)}
        {...DesktopTimePickerProps}
      />
    </Box>
  )
}

export default TimePicker
