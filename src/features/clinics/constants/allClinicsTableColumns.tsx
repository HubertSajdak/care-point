import EditNoteIcon from "@mui/icons-material/EditNote"
import SettingsIcon from "@mui/icons-material/Settings"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { IconButton } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"

import { RouteNames } from "@/constants"
import { ColumnsValues } from "@/shared/ui/Table/Table"
import { IClinicInfo } from "@/types/api-types"

const TableActions = (row: IClinicInfo) => {
  return (
    <>
      <IconButton component={Link} to={`${RouteNames.ALL_CLINICS}/${row._id}`}>
        <VisibilityIcon color="primary" />
      </IconButton>
      <IconButton
        component={Link}
        to={`${RouteNames.ADD_CLINIC_AFFILIATION}/${row._id}`}
      >
        <EditNoteIcon color="primary" />
      </IconButton>
      <IconButton component={Link} to={`${RouteNames.EDIT_CLINIC}/${row._id}`}>
        <SettingsIcon color="primary" />
      </IconButton>
    </>
  )
}
export const allClinicsTableColumns: ColumnsValues<IClinicInfo>[] = [
  {
    align: "center",
    highlight: false,
    isImage: true,
    key: "photo",
    label: "table:heading.photo",
    render: (row) => row.photo,
  },
  {
    label: "table:heading.clinicName",
    key: "clinicName",
    highlight: true,
    render: (row) => row.clinicName,
    isSortable: true,
  },
  {
    label: "table:heading.phoneNumber",
    key: "phoneNumber",
    highlight: true,
    render: (row) => row.phoneNumber,
    isSortable: false,
  },
  {
    label: "table:heading.address",
    key: "address",
    highlight: true,
    render: (row: IClinicInfo) =>
      row.address.street +
      " | " +
      row.address.city +
      " | " +
      row.address.postalCode,
    isSortable: false,
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

export default allClinicsTableColumns
