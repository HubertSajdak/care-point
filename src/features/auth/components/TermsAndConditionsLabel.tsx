import { Typography } from "@mui/material"
import React from "react"
import { useTranslation } from "react-i18next"
import { useTheme } from "styled-components"

import pdf from "@/documents/Terms.pdf"

function TermsAndConditionsLabel() {
  const { t } = useTranslation()
  const theme = useTheme()
  return (
    <Typography>
      {t("authPages:iAgreeOn")}{" "}
      <a
        href={pdf}
        rel="noreferrer"
        style={{ color: theme.palette.primary.main }}
        target="_blank"
      >
        {t("authPages:terms")}{" "}
      </a>
      {t("authPages:conditions")}
    </Typography>
  )
}

export default TermsAndConditionsLabel
