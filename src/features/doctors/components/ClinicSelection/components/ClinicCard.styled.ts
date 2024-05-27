import { Card } from "@mui/material"
import styled from "styled-components"

export const StyledCard = styled(Card)<{ $isSelected: boolean }>(
  ({ $isSelected, theme }) => ({
    maxWidth: 345,
    ...($isSelected && {
      boxShadow: `rgb(204, 219, 232) ${theme.spacing(0.375)} ${theme.spacing(
        0.375,
      )} ${theme.spacing(
        1.5,
      )} 0 inset, rgba(255, 255, 255, 0.5) ${theme.spacing(
        -0.375,
      )} ${theme.spacing(-0.375)} ${theme.spacing(0.75)} ${theme.spacing(
        0.125,
      )} inset`,
      outline: `${theme.spacing(0.25)} solid ${theme.palette.primary.light}`,
    }),
    "&:hover": {
      outline: `${theme.spacing(0.125)} solid ${theme.palette.primary.light}`,
    },
  }),
)
