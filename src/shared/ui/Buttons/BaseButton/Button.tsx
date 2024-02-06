import {
  CircularProgress,
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material"
import { useState } from "react"
interface ButtonProps extends MuiButtonProps {
  isSubmitting?: boolean
  onAsyncClick?: () => Promise<void>
  onClick?: () => void
}
const Button = ({
  children,
  isSubmitting,
  onAsyncClick,
  onClick,
  ...restProps
}: ButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleOnClick = () => {
    if (onClick) {
      return onClick()
    }
    if (onAsyncClick) {
      const handleAsyncClick = async () => {
        setIsLoading(true)
        try {
          await onAsyncClick()
          setIsLoading(false)
        } catch (error) {
          setIsLoading(false)
        }
      }
      return handleAsyncClick()
    }
  }
  return (
    <MuiButton
      disabled={isLoading || isSubmitting}
      onClick={handleOnClick}
      {...restProps}
    >
      {children}
      {(isLoading || isSubmitting) && (
        <CircularProgress
          size={16}
          sx={{
            position: "absolute",
            // color: "inherit",
          }}
          thickness={6}
        />
      )}
    </MuiButton>
  )
}

export default Button
