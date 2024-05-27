import AssignmentIcon from "@mui/icons-material/Assignment"
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd"
import { Box, IconButton, Tooltip, Typography } from "@mui/material"
import { useCallback, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { useDebouncedCallback } from "use-debounce"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { RouteNames } from "@/constants"
import { setTableQueryParams } from "@/features/doctors"
import { Table } from "@/shared"
import { ISortDirection } from "@/types/api-types"

import { getAllDoctors } from "../store/doctorsThunks"

const AllDoctors = () => {
  const {
    data,
    status,
    tableQueryParams: { currentPage, pageSize, search, sortBy, sortDirection },
    totalItems,
  } = useAppSelector((state) => state.doctors)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  useEffect(() => {
    dispatch(getAllDoctors(false))
  }, [dispatch, currentPage, pageSize, search, sortBy, sortDirection])

  const handleChangeSort = useCallback(
    (sortingProperty: string, sortingDirection: ISortDirection) => {
      dispatch(
        setTableQueryParams({
          sortBy: sortingProperty,
          sortDirection: sortingDirection,
        }),
      )
    },
    [dispatch],
  )
  const handleChangePage = useCallback(
    (page: number) => {
      dispatch(setTableQueryParams({ currentPage: page }))
    },
    [dispatch],
  )

  const handleChangeRowsPerPage = useCallback(
    (rowsPerPage: number) => {
      dispatch(setTableQueryParams({ pageSize: rowsPerPage }))
    },
    [dispatch],
  )
  const handleOnChangeSearch = useDebouncedCallback((search: string) => {
    dispatch(setTableQueryParams({ search }))
  }, 1000)
  const handleRefreshContent = useCallback(async () => {
    await dispatch(getAllDoctors(false))
  }, [dispatch])
  return (
    <Box>
      <Typography component="h2" fontWeight="bold" mb={2} variant="h4">
        {t("common:doctors")}
      </Typography>
      <Table
        columns={[
          {
            label: t("table:heading.photo"),
            key: "photo",
            render: (row) => row.photo,
            isImage: true,
            align: "center",
            highlight: false,
          },
          {
            label: t("table:heading.name"),
            key: "name",
            render: (row) => row.name,
            highlight: true,
            isSortable: true,
          },
          {
            label: t("table:heading.surname"),
            key: "surname",
            render: (row) => row.surname,
            highlight: true,
            isSortable: true,
          },
          {
            label: t("table:heading.email"),
            key: "email",
            render: (row) => row.email,
            highlight: true,
            isSortable: true,
          },
          {
            key: "actions",
            label: t("table:heading.actions"),
            render: (row) => (
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
            ),
            isImage: false,
            isSortable: false,
            highlight: false,
          },
        ]}
        data={data ? data : []}
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

export default AllDoctors
