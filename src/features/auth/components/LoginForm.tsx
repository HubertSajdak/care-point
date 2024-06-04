import { Grid } from "@mui/material"
import { FormikProvider, useFormik } from "formik"
import { useTranslation } from "react-i18next"

import { useAppDispatch } from "@/app/hooks"
import { Button, TextFieldFormik } from "@/shared"
import { loginUser } from "@/shared/store"
import { ReqLoginCredentials } from "@/types/api-types"

import { loginSchema } from "../schemas/login"

const LoginForm = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const submit = async (values: ReqLoginCredentials) =>
    await dispatch(loginUser(values))

  const loginFormik = useFormik<ReqLoginCredentials>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => submit(values),
    validationSchema: loginSchema,
  })

  return (
    <FormikProvider value={loginFormik}>
      <form onSubmit={loginFormik.handleSubmit}>
        <Grid direction="column" justifyContent="center" spacing={4} container>
          <Grid xs={8} item>
            <TextFieldFormik
              id="email"
              label={t("form:common.email")}
              name="email"
            />
          </Grid>
          <Grid xs={8} item>
            <TextFieldFormik
              id="password"
              label={t("form:common.password")}
              name="password"
              type="password"
            />
          </Grid>
          <Grid xs={12} item>
            <Button
              isSubmitting={loginFormik.isSubmitting}
              type="submit"
              variant="contained"
              fullWidth
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
