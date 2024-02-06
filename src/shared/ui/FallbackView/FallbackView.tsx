import { Box, CircularProgress } from "@mui/material"

import Logo from "@/assets/images/care-point-full-logo.svg?react"

const FallbackView = () => {
  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      gap={1}
      height="100vh"
      justifyContent="center"
      width="100vw"
    >
      <Logo height={100} width={200} />
      <CircularProgress size={60} />
    </Box>
  )
}

export default FallbackView
