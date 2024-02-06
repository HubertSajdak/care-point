import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material"
import { Link } from "react-router-dom"
interface ButtonLinkProps extends MuiButtonProps {
  children: React.ReactNode
  to: string
}
const ButtonLink = ({ children, to, ...rest }: ButtonLinkProps) => {
  return (
    <MuiButton component={Link} to={to} {...rest}>
      {children}
    </MuiButton>
  )
}

export default ButtonLink
