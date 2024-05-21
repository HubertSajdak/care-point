import { Box, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import styled from "styled-components"

import { RouteNames } from "@/constants"
import { capitalizeFirstChar } from "@/shared"

import Link from "../Link/Link"

const UnauthorizedView = () => {
  const { t } = useTranslation(["common", "buttons", "sidebar"])
  return (
    <Box>
      <Typography color="error" component="h1" variant="h2">
        {capitalizeFirstChar(t("comm,on:unauthorized"))}
      </Typography>
      <Typography mt={4} sx={{ fontSize: 16 }} textAlign="center" variant="h5">
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
const StyledLink = styled(Link)(({ theme }) => ({
  fontSize: theme.spacing(2),
}))
