import { Box, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"

import Img from "@/assets/images/no-data.svg?react"

const NoDataMsg = () => {
  const { t } = useTranslation()
  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      gap={4}
      height={"auto"}
      padding={3}
      width={"100%"}
    >
      <Img height={150} width={150} />
      <Typography component="h3" variant="h5">
        {t("table:noData")}
      </Typography>
    </Box>
  )
}

export default NoDataMsg
