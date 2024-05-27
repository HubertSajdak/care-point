import {
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
  FormControlLabel,
  FormControlLabelProps as MuiFormControlLabelProps,
  FormHelperText,
} from "@mui/material"
import { useTheme } from "styled-components"

export type CheckboxTypesCombined = Omit<
  MuiCheckboxProps,
  "id" | "checked" | "onChange" | "error"
> &
  Omit<
    MuiFormControlLabelProps,
    "control" | "checked" | "onChange" | "label" | "disabled"
  >

export interface CheckboxProps extends CheckboxTypesCombined {
  /**
   * Pass a boolean value (f.e. from useState) to determine if checkbox component is checked.
   */
  checked: boolean
  /**
   * Use "error" prop to make error text appear.
   *
   * "CheckboxFormik" adds and handles this prop automatically.
   */
  error?: string
  /**
   * Allows user to make a helper text.
   */
  helperText?: string
  /**
   * Add this prop if there is more than one "Checkbox" component.
   */
  id?: string
  label: React.ReactNode
  /**
   * Pass the function that will change the checked state.
   */
  onChange: (
    event: React.SyntheticEvent<Element, Event>,
    checked: boolean,
  ) => void
}

const Checkbox = ({
  checked,
  error,
  helperText,
  id = "checkbox",
  label,
  onChange,
  ...CheckboxProps
}: CheckboxProps) => {
  const theme = useTheme()
  return (
    <>
      <FormControlLabel
        control={<MuiCheckbox checked={checked} id={id} {...CheckboxProps} />}
        id={id}
        label={label}
        onChange={onChange}
        {...CheckboxProps}
      />
      {(helperText || error) && (
        <FormHelperText
          sx={{
            color: error ? "error.main" : "text.primary",
            margin: `${theme.spacing(0.375)} ${theme.spacing(1.75)} 0`,
          }}
        >
          {error ? error : helperText}
        </FormHelperText>
      )}
    </>
  )
}

export default Checkbox
