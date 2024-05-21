import { Box, Divider, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"

import { RouteNames } from "@/constants"
import { Link } from "@/shared"

// this is container. What container means? in container - component/smart - dumb components pattern component/dumb component is component without state. smart component/container has state. here is no state, and components has state

const RegisterFormWrapper = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation()

  return (
    <Box maxWidth={800}>
      <Typography component="h2" mb={2} textAlign="center" variant="h4">
        {t("authPages:signUp")}
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
      <Box>{children}</Box>
      <Divider sx={{ margin: "1rem 0rem 1.5rem" }} />
      <Typography component="p" textAlign="center" variant="body1">
        {t("authPages:alreadyHaveAcc")}{" "}
        <Link to={RouteNames.LOGIN}>{t("authPages:signIn")}</Link>
      </Typography>
    </Box>
  )
}

export default RegisterFormWrapper
