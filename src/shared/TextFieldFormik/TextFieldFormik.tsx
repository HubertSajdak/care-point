import { Visibility, VisibilityOff } from "@mui/icons-material"
import {
  IconButton,
  InputAdornment,
  TextField as MuiTextField,
  TextFieldProps,
  styled,
} from "@mui/material"
import { useField } from "formik"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
export type TextFieldFormikProps = {
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
  fullWidth?: boolean
  helperText?: string
} & Omit<
  TextFieldProps,
  "error" | "onBlur" | "helperText" | "onChange" | "value" | "variant"
>

const TextFieldFormik = ({
  id = "text-field",
  variant = "outlined",
  type = "text",
  name,
  fullWidth = true,
  helperText,
  ...TextFieldProps
}: TextFieldFormikProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [field, meta, helpers] = useField(name)
  const { t } = useTranslation()

  return (
    <StyledTextFieldFormik
      id={id}
      name={name}
      value={field.value}
      onChange={field.onChange}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.error && meta.touched ? t(meta.error) : helperText}
      onBlur={field.onBlur}
      type={type === "password" ? (showPassword ? "text" : "password") : type}
      variant={variant}
      fullWidth={fullWidth}
      InputProps={
        type === "password"
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowPassword((prev) => !prev)
                    }}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : undefined
      }
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
