import { RouteNames } from "@/constants/routes"
import Link from "@/shared/Link/Link"
import { Box, Divider, Typography, styled } from "@mui/material"
import { useTranslation } from "react-i18next"
import LoginForm from "../components/LoginForm"

const Login = () => {
  const { t } = useTranslation()
  return (
    <StyledBox>
      <Typography component="h2" variant="h4" textAlign="center" mb={2}>
        {t("authPages:signIn")}
      </Typography>
      <Typography
        display="block"
        component="span"
        variant="subtitle1"
        textAlign="center"
        color="grey.500"
        mb={4}
      >
        {t("authPages:enterCredentials")}
      </Typography>
      <LoginForm />
      <Divider sx={{ margin: "2rem 0rem 1.5rem" }} />
      <Typography variant="body1" component="p" textAlign="center">
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
