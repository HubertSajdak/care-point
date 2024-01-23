import { Box, Typography } from "@mui/material"
import Chip from "@mui/material/Chip"
import { useEffect, useState } from "react"

const PasswordStrengthIndicator = ({ password }: { password: string }) => {
  const [strength, setStrength] = useState({})
  const passwordStrengthCount = () => {
    let options = {
      isLength: false,
      isSpecialChar: false,
      isNumber: false,
      isUpperCaseChar: false,
    }
    if (password.length > 7) {
      // setStrength((prev) => ({ ...prev, isLength: true }))
      console.log("length")
      options = { ...options, isLength: true }
    } else if (!Boolean(password.length > 7)) {
      // setStrength((prev) => ({ ...prev, isLength: false }))
      options = { ...options, isLength: false }
    }
    if (Boolean(/[ -\/:-@\[-\`{-~]/.test(password))) {
      console.log("special")
      options = { ...options, isSpecialChar: true }
      // setStrength((prev) => ({ ...prev, isSpecialChar: true }))
    } else if (!Boolean(/[ -\/:-@\[-\`{-~]/.test(password))) {
      options = { ...options, isSpecialChar: false }
      // setStrength((prev) => ({ ...prev, isSpecialChar: false }))
    }
    if (Boolean(/[A-Z]/.test(password))) {
      console.log("uppercase")
      options = { ...options, isUpperCaseChar: true }
      // setStrength((prev) => ({ ...prev, isUpperCaseChar: true }))
    } else if (!Boolean(/[A-Z]/.test(password))) {
      options = { ...options, isUpperCaseChar: false }
      // setStrength((prev) => ({ ...prev, isUpperCaseChar: false }))
    }
    if (Boolean(/\d/.test(password))) {
      console.log("numer")
      // setStrength((prev) => ({ ...prev, isLength: true }))
      options = { ...options, isNumber: true }
    } else if (!Boolean(/\d/.test(password))) {
      options = { ...options, isNumber: false }

      // setStrength((prev) => ({ ...prev, isLength: false }))
    }
    return options
  }
  useEffect(() => {
    const payload = passwordStrengthCount()
    setStrength(payload)
    console.log(password)
    console.log(strength)
  }, [password])
  useEffect(() => {}, [])
  return (
    <Box display="flex" gap={2}>
      <Typography>Password strength</Typography>
      <Chip
        variant="filled"
        color="primary"
        sx={{ maxHeight: 20, width: 50 }}
      />
    </Box>
  )
}

export default PasswordStrengthIndicator
