import { Box, Typography } from "@mui/material"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDebouncedCallback } from "use-debounce"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { Table } from "@/shared"
import { ISortDirection } from "@/types/api-types"

import {
  changePage,
  changeRowsPerPage,
  changeSearch,
  changeSort,
} from "../store/doctorsSlice"
import { getAllDoctors } from "../store/doctorsThunks"

const AllDoctors = () => {
  const {
    currentPage,
    data,
    pageSize,
    search,
    sortBy,
    sortDirection,
    status,
    totalItems,
  } = useAppSelector((state) => state.doctors)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  useEffect(() => {
    dispatch(getAllDoctors())
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
    await dispatch(getAllDoctors())
  }
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
          },
          {
            label: t("table:heading.name"),
            key: "name",
            render: (row) => row.name,
            isSortable: true,
          },
          {
            label: t("table:heading.surname"),
            key: "surname",
            render: (row) => row.surname,
            isSortable: true,
          },
          {
            label: t("table:heading.email"),
            key: "email",
            render: (row) => row.email,
            isSortable: true,
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
