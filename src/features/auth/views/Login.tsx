import { Box, Divider, Grid, styled, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"

import { useAppDispatch } from "@/app/hooks"
import { RouteNames } from "@/constants"
import {
  DEMO_EMAIL_DOCTOR,
  DEMO_EMAIL_PATIENT,
  DEMO_PASSWORD,
} from "@/constants/demoCredentials"
import { Button, Link } from "@/shared"
import { loginUser } from "@/shared/store"

import LoginForm from "../components/LoginForm"

const Login = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const loginPatientDemo = async () => {
    await dispatch(
      loginUser({ email: DEMO_EMAIL_PATIENT, password: DEMO_PASSWORD }),
    )
  }
  const loginDoctorDemo = async () => {
    await dispatch(
      loginUser({ email: DEMO_EMAIL_DOCTOR, password: DEMO_PASSWORD }),
    )
  }
  return (
    <StyledBox>
      <Typography component="h2" mb={2} textAlign="center" variant="h4">
        {t("authPages:signIn")}
      </Typography>
      <Typography
        color="grey.500"
        component="span"
        display="block"
        mb={4}
        textAlign="center"
        variant="subtitle1"
      >
        {t("authPages:enterCredentials")}
      </Typography>
      <LoginForm />
      <Grid mt={2} rowSpacing={2} container>
        <Grid xs={12} item>
          <Button
            color="secondary"
            variant="contained"
            fullWidth
            onAsyncClick={loginPatientDemo}
          >
            {t("buttons:patientDemo")}
          </Button>
        </Grid>
        <Grid xs={12} item>
          <Button
            color="secondary"
            variant="contained"
            fullWidth
            onAsyncClick={loginDoctorDemo}
          >
            {t("buttons:doctorDemo")}
          </Button>
        </Grid>
      </Grid>
      <Divider sx={{ margin: "2rem 0rem 1.5rem" }} />
      <Typography component="p" textAlign="center" variant="body1">
        {t("authPages:dontHaveAcc")}{" "}
        <Link to={RouteNames.REGISTER}>{t("authPages:signUp")}</Link>
      </Typography>
    </StyledBox>
  )
}

export default Login

export const StyledBox = styled(Box)(({ theme }) => ({
  boxShadow: theme.shadows[3],
  padding: theme.spacing(5),
  borderRadius: theme.shape.borderRadius,
  background: theme.palette.common.white,
}))
