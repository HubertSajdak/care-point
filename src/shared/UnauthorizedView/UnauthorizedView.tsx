import { RouteNames } from "@/constants/routes"
import { capitalizeFirstChar } from "@/utils/functions"
import { Box, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import Link from "../Link/Link"

const UnauthorizedView = () => {
  const { t } = useTranslation(["common", "buttons", "sidebar"])
  return (
    <Box>
      <Typography variant="h2" component="h1" color="error">
        {capitalizeFirstChar(t("common:unauthorized"))}
      </Typography>
      <Typography variant="h5" mt={4} textAlign="center">
        <Link to="..">{capitalizeFirstChar(t("buttons:return"))}</Link>{" "}
        {t("common:orNavigateTo")}{" "}
        <Link to={RouteNames.START}>
          {capitalizeFirstChar(t("sidebar:start"))}
        </Link>
      </Typography>
    </Box>
  )
}

export default UnauthorizedView
