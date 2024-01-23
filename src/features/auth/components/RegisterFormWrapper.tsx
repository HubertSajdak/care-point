import { RouteNames } from "@/constants/routes"
import Link from "@/shared/Link/Link"
import { Box, Divider, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"

const RegisterFormWrapper = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation()

  return (
    <Box maxWidth={800}>
      <Typography component="h2" variant="h4" textAlign="center" mb={2}>
        {t("authPages:signUp")}
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
      <Box>{children}</Box>
      <Divider sx={{ margin: "1rem 0rem 1.5rem" }} />
      <Typography variant="body1" component="p" textAlign="center">
        {t("authPages:alreadyHaveAcc")}{" "}
        <Link to={RouteNames.LOGIN}>{t("authPages:signIn")}</Link>
      </Typography>
    </Box>
  )
}

export default RegisterFormWrapper
