import EditNoteIcon from "@mui/icons-material/EditNote"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { Box, IconButton, Typography } from "@mui/material"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { useDebouncedCallback } from "use-debounce"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { RouteNames } from "@/constants"
import { Table } from "@/shared"
import { ISortDirection } from "@/types/api-types"

import {
  changePage,
  changeRowsPerPage,
  changeSearch,
  changeSort,
} from "../store/clinicsSlice"
import { getAllClinics } from "../store/clinicsThunks"
const AllClinics = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const {
    clinics,
    currentPage,
    pageSize,
    search,
    sortBy,
    sortDirection,
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
                <IconButton>
                  <VisibilityIcon color="primary" />
                </IconButton>
                <IconButton
                  component={Link}
                  to={`${RouteNames.EDIT_CLINIC}/${row._id}`}
                >
                  <EditNoteIcon color="primary" />
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
