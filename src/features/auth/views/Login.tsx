import { Box, Divider, Typography, styled } from "@mui/material"
import { useTranslation } from "react-i18next"

import { RouteNames } from "@/constants"
import { Link } from "@/shared"

import LoginForm from "../components/LoginForm"

const Login = () => {
  const { t } = useTranslation()
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
