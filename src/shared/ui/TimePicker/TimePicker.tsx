import { Box } from "@mui/material"
import {
  DesktopTimePicker as MuiDesktopTimePicker,
  DesktopTimePickerProps as MuiDesktopTimePickerProps,
} from "@mui/x-date-pickers"
import dayjs, { Dayjs } from "dayjs"
import { useField } from "formik"
import { useTranslation } from "react-i18next"
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
                ? t(meta.error)
                : helperText
                ? helperText
                : null,
            name: name,
            onKeyDown: onKeyDown,
          },
        }}
        value={field.value}
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
