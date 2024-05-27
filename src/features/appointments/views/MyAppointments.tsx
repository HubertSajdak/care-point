import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import { Box, Chip, MenuItem, Select, Typography } from "@mui/material"
import { useCallback, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDebouncedCallback } from "use-debounce"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { UserRoles } from "@/constants"
import {
  capitalizeFirstChar,
  Modal,
  Table,
  translateAppointmentStatus,
} from "@/shared"
import {
  cancelAppointment,
  getCurrentUserAppointments,
  setQueryParams,
} from "@/shared/store"
import { ISortDirection } from "@/types/api-types"

const MyAppointments = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const userAppointments = useAppSelector(
    (state) => state.appointments.userAppointmentsData,
  )
  const {
    queryParams: {
      appointmentFilter,
      currentPage,
      pageSize,
      search,
      sortBy,
      sortDirection,
    },
    status,
    totalItems,
  } = useAppSelector((state) => state.appointments)
  const user = useAppSelector((state) => state.auth.user)
  const handleChangeSort = useCallback(
    (sortingProperty: string, sortingDirection: ISortDirection) => {
      dispatch(
        setQueryParams({
          sortBy: sortingProperty,
          sortDirection: sortingDirection,
        }),
      )
    },
    [dispatch],
  )
  const handleChangePage = useCallback(
    (page: number) => {
      dispatch(setQueryParams({ currentPage: page }))
    },
    [dispatch],
  )

  const handleChangeRowsPerPage = useCallback(
    (rowsPerPage: number) => {
      dispatch(setQueryParams({ pageSize: rowsPerPage }))
    },
    [dispatch],
  )
  const handleOnChangeSearch = useDebouncedCallback((search: string) => {
    dispatch(setQueryParams({ search }))
  }, 1000)
  const handleRefreshContent = useCallback(async () => {
    await dispatch(getCurrentUserAppointments())
  }, [dispatch])
  const handleCancelAppointment = useCallback(
    async (appointmentId: string) => {
      await dispatch(cancelAppointment(appointmentId))
    },
    [dispatch],
  )
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
                dispatch(setQueryParams({ appointmentFilter: newValue }))
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
            label:
              user?.role === UserRoles.PATIENT
                ? t("table:heading.doctor")
                : t("table:heading.patient"),
            render: (row) =>
              user?.role === UserRoles.PATIENT && row.doctorInfo
                ? row.doctorInfo.name + " " + row.doctorInfo.surname
                : user?.role === UserRoles.DOCTOR && row.patientInfo
                ? row.patientInfo.name + " " + row.patientInfo.surname
                : "",
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
