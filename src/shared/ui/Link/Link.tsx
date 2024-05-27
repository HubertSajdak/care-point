import { Typography } from "@mui/material"
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom"
import styled from "styled-components"

export interface LinkProps extends RouterLinkProps {
  children: React.ReactNode
}

const Link = ({ children, ...linkProps }: LinkProps) => {
  return (
    <StyledLink {...linkProps}>
      <Typography className="text" color={linkProps.color}>
        {children}
      </Typography>
    </StyledLink>
  )
}

export default Link

export const StyledLink = styled(RouterLink)(({ theme }) => ({
  color: theme.palette.primary.main,
  ".text": {
    display: "inline-block",
    fontWeight: "bold",
  },
}))
