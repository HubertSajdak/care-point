import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import { Box, Chip, MenuItem, Select, Typography } from "@mui/material"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDebouncedCallback } from "use-debounce"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import {
  cancelAppointment,
  changeFilters,
  changePage,
  changeRowsPerPage,
  changeSearch,
  changeSort,
  getCurrentUserAppointments,
} from "@/redux"
import {
  Modal,
  Table,
  capitalizeFirstChar,
  translateAppointmentStatus,
} from "@/shared"
import { ISortDirection } from "@/types/api-types"

const MyAppointments = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const userAppointments = useAppSelector(
    (state) => state.appointments.userAppointmentsData,
  )
  const {
    appointmentFilter,
    currentPage,
    pageSize,
    search,
    sortBy,
    sortDirection,
    status,
    totalItems,
  } = useAppSelector((state) => state.appointments)
  useEffect(() => console.log(status), [status])
  const handleChangeSort = (
    sortingProperty: string,
    sortingDirection: ISortDirection,
  ) => {
    dispatch(changeSort({ sortingProperty, sortingDirection }))
  }
  const handleChangePage = (page: number) => {
    dispatch(changePage(page))
  }

  const handleChangeRowsPerPage = (rowsPerPage: number) => {
    dispatch(changeRowsPerPage(rowsPerPage))
  }
  const handleOnChangeSearch = useDebouncedCallback((search: string) => {
    dispatch(changeSearch(search))
  }, 1000)
  const handleRefreshContent = async () => {
    await dispatch(getCurrentUserAppointments())
  }
  const handleCancelAppointment = async (appointmentId: string) => {
    await dispatch(cancelAppointment(appointmentId))
  }
  useEffect(() => {
    dispatch(getCurrentUserAppointments())
  }, [
    dispatch,
    search,
    sortBy,
    sortDirection,
    pageSize,
    currentPage,
    appointmentFilter,
  ])
  return (
    <Box>
      <Typography component="h2" fontWeight="bold" mb={2} variant="h4">
        {t("common:myAppointments")}
      </Typography>
      <Typography component="h3" mb={2} variant="subtitle1">
        {t("appointment:myAppointmentsDescription")}
      </Typography>
      <Table
        additionalOptions={
          <>
            <Select
              sx={{
                maxWidth: 500,
              }}
              value={appointmentFilter}
              fullWidth
              onChange={(e) => {
                const newValue = e.target.value as
                  | "all"
                  | "active"
                  | "canceled"
                  | "completed"
                dispatch(changeFilters(newValue))
              }}
            >
              <MenuItem value={"all"}>
                {capitalizeFirstChar(
                  t("table:searchBar.appointmentsSelector.allAppointments"),
                )}
              </MenuItem>
              <MenuItem value={"active"}>
                {capitalizeFirstChar(
                  t("table:searchBar.appointmentsSelector.activeAppointments"),
                )}
              </MenuItem>
              <MenuItem value={"completed"}>
                {capitalizeFirstChar(
                  t(
                    "table:searchBar.appointmentsSelector.completedAppointments",
                  ),
                )}
              </MenuItem>
              <MenuItem value={"canceled"}>
                {capitalizeFirstChar(
                  t(
                    "table:searchBar.appointmentsSelector.canceledAppointments",
                  ),
                )}
              </MenuItem>
            </Select>
          </>
        }
        columns={[
          {
            key: "name",
            label: t("table:heading.doctor"),
            render: (row) => row.doctorInfo.name + " " + row.doctorInfo.surname,
            isImage: false,
            isSortable: true,
            highlight: true,
          },
          {
            key: "appointmentDate",
            label: t("table:heading.appointmentDate"),
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
            label: t("table:heading.clinicName"),
            render: (row) => row.clinicInfo.clinicName,
            isImage: false,
            isSortable: true,
            highlight: true,
          },
          {
            key: "appointmentAddress",
            label: t("table:heading.appointmentAddress"),
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
            label: t("table:heading.appointmentStatus"),
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
                label={t(translateAppointmentStatus(row.appointmentStatus))}
                sx={{ fontWeight: "bold" }}
              />
            ),

            isImage: false,
            isSortable: false,
            highlight: false,
          },
          {
            key: "phoneNumber",
            label: t("table:heading.phoneNumber"),
            render: (row) => row.clinicInfo.phoneNumber,

            isImage: false,
            isSortable: false,
            highlight: true,
          },
          {
            key: "actions",
            label: t("table:heading.actions"),
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
                text={t("appointment:cancelAppointment.text")}
                title={t("appointment:cancelAppointment.title")}
                isOpenModalIconBtn
                onAsyncClick={() => handleCancelAppointment(row._id)}
              />
            ),
            isImage: false,
            isSortable: false,
            highlight: false,
          },
        ]}
        data={userAppointments ? userAppointments : []}
        isLoading={status === "loading"}
        pagination={{
          currentPage,
          pageSize,
          totalItems,
        }}
        searchWords={search}
        sort={{
          sortBy,
          sortDirection,
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        onChangeSearch={handleOnChangeSearch}
        onChangeSort={handleChangeSort}
        onRefreshContent={handleRefreshContent}
      />
    </Box>
  )
}

export default MyAppointments
