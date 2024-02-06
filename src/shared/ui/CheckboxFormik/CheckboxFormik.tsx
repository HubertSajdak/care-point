import { useField } from "formik"
import { useTranslation } from "react-i18next"

import Checkbox, { CheckboxProps } from "../Checkbox/Checkbox"
export type CheckboxFormikProps = {
  /**
   * Add this prop if there is more than one "CheckboxFormik" component
   */
  id?: string

  label: React.ReactNode
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
} & Omit<CheckboxProps, "id" | "checked" | "onChange" | "label" | "error">
const CheckboxFormik = ({
  id = "checkbox-formik",
  label,
  name,
  ...CheckboxFormikProps
}: CheckboxFormikProps) => {
  const [field, meta] = useField(name)
  const { t } = useTranslation()
  return (
    <Checkbox
      checked={field.value}
      error={meta.error && meta.touched ? t(meta.error) : undefined}
      id={id}
      label={label}
      name={name}
      onChange={field.onChange}
      {...CheckboxFormikProps}
    />
  )
}

export default CheckboxFormik
