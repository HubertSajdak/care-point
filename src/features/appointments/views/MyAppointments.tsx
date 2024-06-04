import { Box, MenuItem, Select, Typography } from "@mui/material"
import { useCallback, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDebouncedCallback } from "use-debounce"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { capitalizeFirstChar, Table } from "@/shared"
import {
  cancelAppointment,
  getCurrentUserAppointments,
  setQueryParams,
} from "@/shared/store"
import { ISortDirection } from "@/types/api-types"

import { myAppointmentsTableColumns } from "../constants/myAppointmentsTableColumns"

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
  }, 300)
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
        columns={myAppointmentsTableColumns(
          user?.role,
          handleCancelAppointment,
        )}
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
