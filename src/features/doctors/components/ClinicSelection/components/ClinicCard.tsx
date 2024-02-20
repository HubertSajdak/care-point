import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Stack,
  Typography,
} from "@mui/material"
import { useTranslation } from "react-i18next"
import styled from "styled-components"

import { BASE_URL } from "@/constants"
import { translateWeekDays } from "@/shared"
import { IAddress, IWorkingHours } from "@/types/api-types"

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
    consulationFee: number,
    clinicId: string,
  ) => void
  photo?: string
  workingHours: IWorkingHours[]
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
  workingHours,
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
        image={photo ? `${BASE_URL}/${photo}` : ""}
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
          {workingHours.map((el) => {
            return (
              <Typography
                color="text.secondary"
                display="flex"
                justifyContent="space-between"
                key={el._id}
                variant="body2"
              >
                <span>{t(translateWeekDays(el.weekDay))}:</span>
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
        onClick={() => onClick(id, address, consultationFee, clinicId)}
      >
        {t("buttons:select")}
      </Button>
    </StyledCard>
  )
}

export default ClinicCard

const StyledCard = styled(Card)<{ $isSelected: boolean }>(
  ({ $isSelected, theme }) => ({
    maxWidth: 345,
    ...($isSelected && {
      boxShadow: `rgb(204, 219, 232) 3px 3px 12px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset`,
      outline: `2px solid ${theme.palette.primary.light}`,
    }),
    "&:hover": {
      outline: `1px solid ${theme.palette.primary.light}`,
    },
  }),
)
