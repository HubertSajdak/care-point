import { Paper } from "@mui/material"
import styled from "styled-components"

export const StyledPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(3),
  gap: theme.spacing(1.6),
  borderRadius: theme.spacing(2.5),
  height: "100%",
}))
