import { Visibility, VisibilityOff } from "@mui/icons-material"
import {
  IconButton,
  InputAdornment,
  styled,
  TextField as MuiTextField,
  TextFieldProps,
} from "@mui/material"
import { useField } from "formik"
import { useState } from "react"
import { useTranslation } from "react-i18next"

import { normalizeKey } from "@/shared"

export type TextFieldFormikProps = {
  fullWidth?: boolean
  helperText?: string
  /**
   * "id" has initial value. User is supposed to add "id" prop in case of using "TextFieldFormik" more than once.
   */
  id?: string
  /**
   * Helps formik identify to which "useFormik" hook you refer to.
   *
   * Pass the same name as the name of a formik value you refer to.
   *
   * @example
   *
   *   const updateUserInfoFormik = useFormik({
   initialValues: {
   name: "",
   surname: "",
   email: "",
   },
   onSubmit: (values) => {},
   validationSchema: updateUserValidation,
   *
   * <TextFieldFormik name="name" />
   });
   *
   */
  name: string
  variant?: "filled" | "outlined" | "standard"
} & Omit<
  TextFieldProps,
  "error" | "onBlur" | "helperText" | "onChange" | "value" | "variant"
>

const TextFieldFormik = ({
  fullWidth = true,
  helperText,
  id = "text-field",
  name,
  type = "text",
  variant = "outlined",
  ...TextFieldProps
}: TextFieldFormikProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [field, meta] = useField(name)
  const { t } = useTranslation()

  return (
    <StyledTextFieldFormik
      error={meta.touched && Boolean(meta.error)}
      fullWidth={fullWidth}
      helperText={
        meta.error && meta.touched ? t(normalizeKey(meta.error)) : helperText
      }
      id={id}
      InputProps={
        type === "password"
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={() => {
                      setShowPassword((prev) => !prev)
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : undefined
      }
      name={name}
      type={type === "password" ? (showPassword ? "text" : "password") : type}
      value={field.value}
      variant={variant}
      onBlur={field.onBlur}
      onChange={field.onChange}
      {...TextFieldProps}
    />
  )
}

export default TextFieldFormik

export const StyledTextFieldFormik = styled(MuiTextField)`
  label::first-letter {
    text-transform: capitalize;
  }
`
