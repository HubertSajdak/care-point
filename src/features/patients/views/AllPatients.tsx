import { Box, Typography } from "@mui/material"
import { useCallback, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDebouncedCallback } from "use-debounce"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { getAllPatients, setQueryParams } from "@/features/patients"
import { Table } from "@/shared"
import { ISortDirection } from "@/types/api-types"

import { allPatientsTableColumns } from "../constants/allPatientsTableColumns"

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
  }, 300)
  const handleRefreshContent = useCallback(async () => {
    await dispatch(getAllPatients())
  }, [dispatch])
  return (
    <Box>
      <Typography component="h2" fontWeight="bold" mb={2} variant="h4">
        {t("common:patients")}
      </Typography>
      <Table
        columns={allPatientsTableColumns}
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
