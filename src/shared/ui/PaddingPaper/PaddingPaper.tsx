import { Paper } from "@mui/material"
import styled from "styled-components"

const PaddingPaper = styled(Paper)<{ padding?: number }>(
  ({ padding, theme }) => ({
    borderRadius: theme.shape.borderRadius,
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
    padding: theme.spacing(padding ?? 2),
  }),
)

export default PaddingPaper
