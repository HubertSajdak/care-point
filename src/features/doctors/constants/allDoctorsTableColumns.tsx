import AssignmentIcon from "@mui/icons-material/Assignment"
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd"
import { Box, IconButton, Tooltip } from "@mui/material"
import { t } from "i18next"
import { Link } from "react-router-dom"

import { RouteNames } from "@/constants"
import { ColumnsValues } from "@/shared/ui/Table/Table"
import { IDoctorUser } from "@/types/api-types"

const TableActions = (row: IDoctorUser) => {
  return (
    <Box display="flex">
      <Tooltip title={t("common:tooltip.makeAppointment")}>
        <IconButton
          component={Link}
          to={`${RouteNames.MAKE_APPOINTMENT}/${row._id}`}
        >
          <AssignmentIcon color="primary" />
        </IconButton>
      </Tooltip>
      <Tooltip title={t("common:tooltip.doctorProfile")}>
        <IconButton
          component={Link}
          to={`${RouteNames.ALL_DOCTORS}/${row._id}`}
        >
          <AssignmentIndIcon color="primary" />
        </IconButton>
      </Tooltip>
    </Box>
  )
}
export const allDoctorsTableColumns: ColumnsValues<IDoctorUser>[] = [
  {
    label: "table:heading.photo",
    key: "photo",
    render: (row) => row.photo,
    isImage: true,
    align: "center",
    highlight: false,
  },
  {
    label: "table:heading.name",
    key: "name",
    render: (row) => row.name,
    highlight: true,
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
    render: (row) => row.email,
    highlight: true,
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
