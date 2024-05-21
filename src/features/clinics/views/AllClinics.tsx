import EditNoteIcon from "@mui/icons-material/EditNote"
import SettingsIcon from "@mui/icons-material/Settings"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { Box, IconButton, Typography } from "@mui/material"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { useDebouncedCallback } from "use-debounce"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { RouteNames } from "@/constants"
import { setQueryParams } from "@/features/clinics"
import { Table } from "@/shared"
import { ISortDirection } from "@/types/api-types"

import { getAllClinics } from "../store/clinicsThunks"

const AllClinics = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const {
    clinics,
    queryParams: { currentPage, pageSize, search, sortBy, sortDirection },
    status,
    totalItems,
  } = useAppSelector((state) => state.clinics)
  useEffect(() => {
    dispatch(getAllClinics())
  }, [dispatch, search, sortBy, sortDirection, pageSize, currentPage])
  const handleChangeSort = (
    sortingProperty: string,
    sortingDirection: ISortDirection,
  ) => {
    dispatch(
      setQueryParams({
        sortBy: sortingProperty,
        sortDirection: sortingDirection,
      }),
    )
  }
  const handleChangePage = (page: number) => {
    dispatch(setQueryParams({ currentPage: page }))
  }

  const handleChangeRowsPerPage = (rowsPerPage: number) => {
    dispatch(setQueryParams({ pageSize: rowsPerPage }))
  }
  const handleOnChangeSearch = useDebouncedCallback((search: string) => {
    dispatch(setQueryParams({ search }))
  }, 1000)
  const handleRefreshContent = async () => {
    await dispatch(getAllClinics())
  }
  return (
    <Box>
      <Typography component="h2" fontWeight="bold" mb={2} variant="h4">
        {t("clinic:allClinicsTitle")}
      </Typography>
      <Table
        columns={[
          {
            // move to configuration variable
            label: t("table:heading.photo"),
            key: "photo",
            render: (row) => row.photo,
            isImage: true,
            highlight: false,
            align: "center",
          },
          {
            label: t("table:heading.clinicName"),
            key: "clinicName",
            highlight: true,
            render: (row) => row.clinicName,
            isSortable: true,
          },
          {
            label: t("table:heading.phoneNumber"),
            key: "phoneNumber",
            highlight: true,
            render: (row) => row.phoneNumber,
            isSortable: false,
          },
          {
            label: t("table:heading.address"),
            key: "address",
            highlight: true,
            render: (row) =>
              row.address.street +
              " | " +
              row.address.city +
              " | " +
              row.address.postalCode,
            isSortable: false,
          },
          {
            key: "actions",
            label: t("table:heading.actions"),
            render: (row) => (
              <>
                <IconButton
                  component={Link}
                  to={`${RouteNames.ALL_CLINICS}/${row._id}`}
                >
                  <VisibilityIcon color="primary" />
                </IconButton>
                <IconButton
                  component={Link}
                  to={`${RouteNames.ADD_CLINIC_AFFILIATION}/${row._id}`}
                >
                  <EditNoteIcon color="primary" />
                </IconButton>
                <IconButton
                  component={Link}
                  to={`${RouteNames.EDIT_CLINIC}/${row._id}`}
                >
                  <SettingsIcon color="primary" />
                </IconButton>
              </>
            ),
            isImage: false,
            isSortable: false,
            highlight: false,
          },
        ]}
        data={clinics ? clinics : []}
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

export default AllClinics
