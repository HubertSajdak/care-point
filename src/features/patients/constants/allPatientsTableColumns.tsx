import AssignmentIndIcon from "@mui/icons-material/AssignmentInd"
import { IconButton, Tooltip } from "@mui/material"
import { t } from "i18next"
import { Link } from "react-router-dom"

import { RouteNames } from "@/constants"
import { ColumnsValues } from "@/shared/ui/Table/Table"
import { IPatientUser } from "@/types/api-types"

const TableActions = (row: IPatientUser) => {
  return (
    <>
      <Tooltip title={t("common:tooltip.patientProfile")}>
        <IconButton
          component={Link}
          to={`${RouteNames.ALL_PATIENTS}/${row._id}`}
        >
          <AssignmentIndIcon color="primary" />
        </IconButton>
      </Tooltip>
    </>
  )
}
export const allPatientsTableColumns: ColumnsValues<IPatientUser>[] = [
  {
    label: "table:heading.photo",
    key: "photo",
    render: (row) => row.photo,
    isImage: true,
    highlight: false,
    align: "center",
  },
  {
    label: "table:heading.name",
    key: "name",
    highlight: true,
    render: (row) => row.name,
    isSortable: true,
  },
  {
    label: "table:heading.surname",
    key: "surname",
    render: (row) => row.surname,
    highlight: true,
    isSortable: true,
  },
  {
    label: "table:heading.email",
    key: "email",
    highlight: true,
    render: (row) => row.email,
    isSortable: true,
  },
  {
    label: "table:heading.street",
    key: "address.street",
    highlight: true,
    render: (row) => row.address.street,
    isSortable: true,
  },
  {
    label: "table:heading.city",
    key: "address.city",
    highlight: true,
    render: (row) => row.address.city,
    isSortable: true,
  },
  {
    label: "table:heading.postalCode",
    key: "address.postalCode",
    highlight: true,
    render: (row) => row.address.postalCode,
    isSortable: true,
  },

  {
    label: "table:heading.phoneNumber",
    key: "phoneNumber",
    highlight: true,
    render: (row) => row.phoneNumber,
    isSortable: true,
  },
  {
    key: "actions",
    label: "table:heading.actions",
    render: (row) => TableActions(row),
    isImage: false,
    isSortable: false,
    highlight: false,
  },
]
