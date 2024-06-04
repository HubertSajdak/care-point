import { Box, Typography } from "@mui/material"
import { useCallback, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDebouncedCallback } from "use-debounce"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { getAllDoctors, setTableQueryParams } from "@/features/doctors"
import { Table } from "@/shared"
import { ISortDirection } from "@/types/api-types"

import { allDoctorsTableColumns } from "../constants/allDoctorsTableColumns"

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
  }, 300)
  const handleRefreshContent = useCallback(async () => {
    await dispatch(getAllDoctors(false))
  }, [dispatch])
  return (
    <Box>
      <Typography component="h2" fontWeight="bold" mb={2} variant="h4">
        {t("common:doctors")}
      </Typography>
      <Table
        columns={allDoctorsTableColumns}
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
