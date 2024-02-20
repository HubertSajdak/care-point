import { Grid } from "@mui/material"

import { IAddress, IClinicAffiliation } from "@/types/api-types"

import ClinicCard from "./components/ClinicCard"
export interface ClinicSelectionProps {
  clinicAffiliations: IClinicAffiliation[]
  onClick: (
    id: string,
    address: IAddress,
    consultationFee: number,
    clinicId: string,
  ) => void
  selectedClinicId: string
}
const ClinicSelection = ({
  clinicAffiliations,
  onClick,
  selectedClinicId,
}: ClinicSelectionProps) => {
  return (
    <Grid columnSpacing={4} rowSpacing={4} container>
      {clinicAffiliations.map((el) => {
        return (
          <Grid key={el._id} item>
            <ClinicCard
              $isSelected={selectedClinicId === el._id}
              address={el.clinicInfo.address}
              clinicId={el.clinicId}
              clinicName={el.clinicName}
              consultationFee={el.consultationFee}
              id={el._id}
              photo={el.clinicInfo.photo}
              workingHours={el.workingHours}
              onClick={onClick}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default ClinicSelection
