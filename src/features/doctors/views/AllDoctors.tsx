import AssignmentIcon from "@mui/icons-material/Assignment"
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd"
import { Box, IconButton, Tooltip, Typography } from "@mui/material"
import { useEffect } from "react"
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

  const handleChangeSort = (
    sortingProperty: string,
    sortingDirection: ISortDirection,
  ) => {
    dispatch(
      setTableQueryParams({
        sortBy: sortingProperty,
        sortDirection: sortingDirection,
      }),
    )
  }
  const handleChangePage = (page: number) => {
    dispatch(setTableQueryParams({ currentPage: page }))
  }

  const handleChangeRowsPerPage = (rowsPerPage: number) => {
    dispatch(setTableQueryParams({ pageSize: rowsPerPage }))
  }
  const handleOnChangeSearch = useDebouncedCallback((search: string) => {
    dispatch(setTableQueryParams({ search }))
  }, 1000)
  const handleRefreshContent = async () => {
    await dispatch(getAllDoctors(false))
  }
  return (
    <Box>
      <Typography component="h2" fontWeight="bold" mb={2} variant="h4">
        {t("common:doctors")}
      </Typography>
      <Table
        columns={[]}
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
