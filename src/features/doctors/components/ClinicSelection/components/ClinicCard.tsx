import {
  Button,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Stack,
  Typography,
} from "@mui/material"
import { useTranslation } from "react-i18next"

import img from "@/assets/images/no-clinic.png"
import { BASE_URL } from "@/constants"
import { normalizeKey, translateWeekDays } from "@/shared"
import { IAddress, IWorkingHours } from "@/types/api-types"

import { StyledCard } from "./ClinicCard.styled"

export interface ClinicCardProps {
  $isSelected: boolean
  address: IAddress
  clinicId: string
  clinicName: string
  consultationFee: number
  id: string
  onClick: (
    id: string,
    address: IAddress,
    consultationFee: number,
    clinicId: string,
    timePerPatient: number,
  ) => void
  photo?: string
  timePerPatient: number
  workingTime: IWorkingHours[]
}

const ClinicCard = ({
  $isSelected,
  address,
  clinicId,
  clinicName,
  consultationFee,
  id,
  onClick,
  photo,
  timePerPatient,
  workingTime,
}: ClinicCardProps) => {
  const { t } = useTranslation()
  return (
    <StyledCard $isSelected={$isSelected}>
      <CardHeader
        subheader={`${address.street}, ${address.city}, ${address.postalCode}`}
        title={clinicName}
      />
      <CardMedia
        alt="clinic photo"
        component="img"
        height="194"
        image={photo ? `${BASE_URL}/${photo}` : img}
      />
      <CardContent>
        <Typography
          color="text.secondary"
          fontWeight="bold"
          mb={1}
          variant="body1"
        >
          {t("appointment:clinicCard.consultationFee")}: {consultationFee}
        </Typography>
        <Stack gap={0.5}>
          <Typography
            color="text.secondary"
            fontWeight="bold"
            mb={1}
            variant="body1"
          >
            {t("appointment:clinicCard.workingHours")}:
          </Typography>
          {workingTime.map((el) => {
            return (
              <Typography
                color="text.secondary"
                display="flex"
                justifyContent="space-between"
                key={el._id}
                variant="body2"
              >
                <span>{t(normalizeKey(translateWeekDays(el.weekDay)!))}:</span>
                <span>
                  {el.startTime} - {el.stopTime}
                </span>
              </Typography>
            )
          })}
        </Stack>
      </CardContent>
      <Divider sx={{ mb: 2 }} />
      <Button
        disabled={$isSelected}
        variant="contained"
        fullWidth
        onClick={() =>
          onClick(id, address, consultationFee, clinicId, timePerPatient)
        }
      >
        {t("buttons:select")}
      </Button>
    </StyledCard>
  )
}

export default ClinicCard
