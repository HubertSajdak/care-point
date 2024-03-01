import { Box, Grid } from "@mui/material"
import { FormikProvider, useFormik } from "formik"
import { useTranslation } from "react-i18next"

import { useAppDispatch } from "@/app/hooks"
import { changeUserPassword } from "@/features/auth"
import { ChangePasswordSchema, changePasswordSchema } from "@/libs"
import { Button, TextFieldFormik } from "@/shared"

const ChangePasswordForm = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const updatePasswordFormik = useFormik<ChangePasswordSchema>({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      const { confirmPassword, password } = values
      await dispatch(
        changeUserPassword({
          password,
          confirmPassword,
        }),
      )
    },
    validationSchema: changePasswordSchema,
  })
  return (
    <FormikProvider value={updatePasswordFormik}>
      <form onSubmit={updatePasswordFormik.handleSubmit}>
        <Grid gap={3} container>
          <Grid xs={12} item md>
            <TextFieldFormik
              id="password"
              label={t("form:common.password")}
              name="password"
              type="password"
            />
          </Grid>
          <Grid xs={12} item md>
            <TextFieldFormik
              id="confirmPassword"
              label={t("form:common.confirmPassword")}
              name="confirmPassword"
              type="password"
            />
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button
            isSubmitting={updatePasswordFormik.isSubmitting}
            type="submit"
            variant="contained"
          >
            {t("buttons:saveDetails")}
          </Button>
        </Box>
      </form>
    </FormikProvider>
  )
}

export default ChangePasswordForm
