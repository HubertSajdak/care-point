import { Box, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"

import Img from "@/assets/images/common-error.svg?react"

const CommonError = ({ translationKey }: { translationKey: string }) => {
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
      <Img height={180} width={400} />
      <Typography component="h3" variant="h5">
        {t(translationKey)}
      </Typography>
    </Box>
  )
}

export default CommonError
