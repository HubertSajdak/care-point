import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import { Chip } from "@mui/material"

import { UserRoles } from "@/constants"
import { Modal } from "@/shared"
import { ColumnsValues } from "@/shared/ui/Table/Table"
import { IAppointment } from "@/types/api-types"
//
// const TableActions = (row: IAppointment) => {
//   return (
//     <Modal
//       acceptBtnVariant="text"
//       disableOpenModalBtn={
//         row.appointmentStatus === "canceled" ||
//         row.appointmentStatus === "completed"
//       }
//       openModalBtnText={
//         <RemoveCircleOutlineIcon
//           color={
//             row.appointmentStatus === "canceled" ||
//             row.appointmentStatus === "completed"
//               ? "inherit"
//               : "warning"
//           }
//         />
//       }
//       rejectBtnVariant="contained"
//       text={t("appointment:cancelAppointment.text")}
//       title={t("appointment:cancelAppointment.title")}
//       isOpenModalIconBtn
//       onAsyncClick={() => handleCancelAppointment(row._id)}
//     />
//   )
// }
export const myAppointmentsTableColumns = (
  role: "patient" | "doctor" | undefined,
  onCancelAppointment: (appointmentId: string) => Promise<void>,
): ColumnsValues<IAppointment>[] => {
  return [
    {
      key: "name",
      label:
        role && role === UserRoles.PATIENT
          ? "table:heading.doctor"
          : "table:heading.patient",
      render: (row) =>
        role && role === UserRoles.PATIENT && row.doctorInfo
          ? row.doctorInfo.name + " " + row.doctorInfo.surname
          : role && role === UserRoles.DOCTOR && row.patientInfo
          ? row.patientInfo.name + " " + row.patientInfo.surname
          : "",
      isImage: false,
      isSortable: true,
      highlight: true,
    },
    {
      key: "appointmentDate",
      label: "table:heading.appointmentDate",
      render: (row) =>
        row.appointmentDate.split(" ")[1] +
        " | " +
        row.appointmentDate.split(" ")[0].split("-").reverse().join("-"),
      isImage: false,
      isSortable: true,
      highlight: false,
    },
    {
      key: "clinicName",
      label: "table:heading.clinicName",
      render: (row) => row.clinicInfo.clinicName,
      isImage: false,
      isSortable: true,
      highlight: true,
    },
    {
      key: "appointmentAddress",
      label: "table:heading.appointmentAddress",
      render: (row) =>
        row.appointmentAddress.street +
        ", " +
        row.appointmentAddress.city +
        ", " +
        row.appointmentAddress.postalCode,
      isImage: false,
      highlight: true,
    },
    {
      key: "appointmentStatus",
      label: "table:heading.appointmentStatus",
      align: "center",
      render: (row) => (
        <Chip
          color={
            row.appointmentStatus === "active"
              ? "primary"
              : row.appointmentStatus === "canceled"
              ? "warning"
              : "default"
          }
          label={row.appointmentStatus}
          sx={{ fontWeight: "bold" }}
        />
      ),

      isImage: false,
      isSortable: false,
      highlight: false,
    },
    {
      key: "phoneNumber",
      label: "table:heading.phoneNumber",
      render: (row) => row.clinicInfo.phoneNumber,

      isImage: false,
      isSortable: false,
      highlight: true,
    },
    {
      key: "actions",
      label: "table:heading.actions",
      render: (row) => (
        <Modal
          acceptBtnVariant="text"
          disableOpenModalBtn={
            row.appointmentStatus === "canceled" ||
            row.appointmentStatus === "completed"
          }
          openModalBtnText={
            <RemoveCircleOutlineIcon
              color={
                row.appointmentStatus === "canceled" ||
                row.appointmentStatus === "completed"
                  ? "inherit"
                  : "warning"
              }
            />
          }
          rejectBtnVariant="contained"
          text={"appointment:cancelAppointment.text"}
          title={"appointment:cancelAppointment.title"}
          isOpenModalIconBtn
          onAsyncClick={() => onCancelAppointment(row._id)}
        />
      ),
      isImage: false,
      isSortable: false,
      highlight: false,
    },
  ]
}
