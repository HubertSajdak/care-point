import { Paper } from "@mui/material"
import styled from "styled-components"

const PaddingPaper = styled(Paper)<{ padding?: number }>(
  ({ padding, theme }) => ({
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.mainShadow.main,
    padding: theme.spacing(padding ?? 2),
  }),
)

export default PaddingPaper
