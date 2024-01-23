import { Box, Card, CardContent, Typography } from "@mui/material"

import { useAppSelector } from "@/app/hooks"

import ChangeAvatarForm from "../ChangeAvatarForm/ChangeAvatarForm"

const AccountCard = () => {
  const user = useAppSelector((state) => state.auth.user)
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "100%",
      }}
    >
      <CardContent sx={{ height: "100%" }}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            height: "100%",
          }}
        >
          <Box height="auto">
            <ChangeAvatarForm />
          </Box>

          <Box display="grid" sx={{ placeItems: "center" }}>
            <Typography variant="h5" gutterBottom>
              {`${user?.name} ${user?.surname}`}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {user?.address?.street} {user?.address?.postalCode}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {user?.address?.city}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default AccountCard
