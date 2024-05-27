import {
  Avatar,
  Card,
  CardContent,
  Divider,
  ListItem,
  ListItemAvatar,
  Typography,
} from "@mui/material"
import List from "@mui/material/List"
import ListItemText from "@mui/material/ListItemText"
import React from "react"
import { useTranslation } from "react-i18next"
import { useTheme } from "styled-components"

import { useAppSelector } from "@/app/hooks"
import { BASE_URL } from "@/constants"

const DoctorClinicsCard = () => {
  const doctorClinics = useAppSelector(
    (state) => state.doctors.selectedDoctorData?.ClinicAffiliation,
  )
  const { t } = useTranslation()
  const theme = useTheme()
  return (
    <Card>
      <CardContent>
        <List>
          {doctorClinics && doctorClinics.length > 0 ? (
            doctorClinics.map((el, idx, arr) => {
              return (
                <div key={el._id}>
                  <ListItem
                    key={el._id}
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", lg: "row" },
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={
                          el.clinicInfo.photo
                            ? `${BASE_URL}/` + el.clinicInfo.photo
                            : ""
                        }
                        sx={{
                          width: {
                            xs: 100,
                            md: 50,
                          },
                          height: {
                            xs: 100,
                            md: 50,
                          },
                          border: `${theme.spacing(0.25)} solid ${
                            theme.palette.primary.main
                          }`,
                        }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={el.clinicName}
                      secondary={`${el.clinicInfo.address.street}, ${el.clinicInfo.address.city}, ${el.clinicInfo.address.postalCode}`}
                      sx={{ width: "100%" }}
                    />
                    <ListItemText
                      primary={t("table:heading.phoneNumber")}
                      secondary={el.clinicInfo.phoneNumber}
                      sx={{ width: "100%" }}
                    />
                    <ListItemText
                      primary={t("clinic:consultationFee")}
                      secondary={el.consultationFee}
                      sx={{ width: "100%" }}
                    />
                    <ListItemText
                      primary={t("clinic:consultationTime")}
                      secondary={`${el.timePerPatient} min`}
                      sx={{ width: "100%", mb: 2 }}
                    />
                  </ListItem>
                  {idx + 1 !== arr.length && (
                    <Divider orientation="horizontal" sx={{ mb: 2 }} />
                  )}
                </div>
              )
            })
          ) : (
            <Typography>
              {t("appointment:doctorCard.noOfficeAssigned")}
            </Typography>
          )}
        </List>
      </CardContent>
    </Card>
  )
}

export default DoctorClinicsCard
