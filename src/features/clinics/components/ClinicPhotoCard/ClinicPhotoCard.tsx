import { Box, Card, CardContent } from "@mui/material"

import ChangeClinicPhotoForm from "../ChangeClinicPhotoForm/ChangeClinicPhotoForm"

const ClinicPhotoCard = () => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "100%",
        pb: 0.5,
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
            pb: 0,
          }}
        >
          <ChangeClinicPhotoForm />
        </Box>
      </CardContent>
    </Card>
  )
}

export default ClinicPhotoCard
