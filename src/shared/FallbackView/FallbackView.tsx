import Logo from "@/assets/images/care-point-full-logo.svg?react"
import { Box, CircularProgress } from "@mui/material"

const FallbackView = () => {
  return (
    <Box
      display="flex"
      width="100vw"
      height="100vh"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={1}
    >
      <Logo width={200} height={100} />
      <CircularProgress size={60} />
    </Box>
  )
}

export default FallbackView
