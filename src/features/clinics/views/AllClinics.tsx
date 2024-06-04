import { Box, Typography } from "@mui/material"
import { useCallback, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDebouncedCallback } from "use-debounce"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { getAllClinics, setQueryParams } from "@/features/clinics"
import { Table } from "@/shared"
import { ISortDirection } from "@/types/api-types"

import allClinicsTableColumns from "../constants/allClinicsTableColumns"

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
    await dispatch(getAllClinics())
  }, [dispatch])
  return (
    <Box>
      <Typography component="h2" fontWeight="bold" mb={2} variant="h4">
        {t("clinic:allClinicsTitle")}
      </Typography>
      <Table
        columns={allClinicsTableColumns}
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
