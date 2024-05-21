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
                // too many indent, it's hard to read, move to component
                <div key={el._id}></div>
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
