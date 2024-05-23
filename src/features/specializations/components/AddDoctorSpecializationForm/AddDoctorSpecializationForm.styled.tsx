import List from "@mui/material/List"
import styled from "styled-components"

export const StyledList = styled(List)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}))

export const StyledForm = styled.form(() => ({
  display: "flex",
  justifyContent: "center",
  width: "100%",
}))
