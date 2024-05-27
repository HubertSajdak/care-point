import AssignmentIndIcon from "@mui/icons-material/AssignmentInd"
import { Box, IconButton, Tooltip, Typography } from "@mui/material"
import { useCallback, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { useDebouncedCallback } from "use-debounce"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { RouteNames } from "@/constants"
import { getAllPatients, setQueryParams } from "@/features/patients"
import { Table } from "@/shared"
import { ISortDirection } from "@/types/api-types"

const AllPatients = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const {
    data,
    queryParams: { currentPage, pageSize, search, sortBy, sortDirection },
    status,
    totalItems,
  } = useAppSelector((state) => state.patients)

  useEffect(() => {
    dispatch(getAllPatients())
  }, [dispatch, search, sortBy, sortDirection, pageSize, currentPage])
  useEffect(() => {
    dispatch(setQueryParams({ pageSize: 5 }))
  }, [dispatch])
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
    await dispatch(getAllPatients())
  }, [dispatch])
  return (
    <Box>
      <Typography component="h2" fontWeight="bold" mb={2} variant="h4">
        {t("common:patients")}
      </Typography>
      <Table
        columns={[
          {
            label: t("table:heading.photo"),
            key: "photo",
            render: (row) => row.photo,
            isImage: true,
            highlight: false,
            align: "center",
          },
          {
            label: t("table:heading.name"),
            key: "name",
            highlight: true,
            render: (row) => row.name,
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
            highlight: true,
            render: (row) => row.email,
            isSortable: true,
          },
          {
            label: t("table:heading.street"),
            key: "address.street",
            highlight: true,
            render: (row) => row.address.street,
            isSortable: true,
          },
          {
            label: t("table:heading.city"),
            key: "address.city",
            highlight: true,
            render: (row) => row.address.city,
            isSortable: true,
          },
          {
            label: t("table:heading.postalCode"),
            key: "address.postalCode",
            highlight: true,
            render: (row) => row.address.postalCode,
            isSortable: true,
          },

          {
            label: t("table:heading.phoneNumber"),
            key: "phoneNumber",
            highlight: true,
            render: (row) => row.phoneNumber,
            isSortable: true,
          },
          {
            key: "actions",
            label: t("table:heading.actions"),
            render: (row) => (
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

export default AllPatients
