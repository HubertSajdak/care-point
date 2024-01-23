import { useAppDispatch } from "@/app/hooks"
import loginSchema from "@/libs/yup/schemas/login"
import Button from "@/shared/Button/Button"
import TextFieldFormik from "@/shared/TextFieldFormik/TextFieldFormik"
import { ReqLoginCredentials } from "@/types/api-types"
import { Grid } from "@mui/material"
import { FormikProvider, useFormik } from "formik"
import { useTranslation } from "react-i18next"
import { loginUser } from "../authThunks"

const LoginForm = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const loginFormik = useFormik<ReqLoginCredentials>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      await dispatch(loginUser(values))
    },
    validationSchema: loginSchema,
  })
  return (
    <FormikProvider value={loginFormik}>
      <form onSubmit={loginFormik.handleSubmit}>
        <Grid container spacing={4} direction="column" justifyContent="center">
          <Grid item xs={8}>
            <TextFieldFormik
              id="email"
              name="email"
              label={t("form:common.email")}
            />
          </Grid>
          <Grid item xs={8}>
            <TextFieldFormik
              id="password"
              name="password"
              label={t("form:common.password")}
              type="password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              isSubmitting={loginFormik.isSubmitting}
            >
              {t("buttons:submit")}
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormikProvider>
  )
}

export default LoginForm
