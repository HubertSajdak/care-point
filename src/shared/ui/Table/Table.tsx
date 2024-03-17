import {
  Avatar,
  Box,
  Card,
  CircularProgress,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material"
import React from "react"
import Highlighter from "react-highlight-words"
import styled, { useTheme } from "styled-components"

import { BASE_URL, SortDirection } from "@/constants"
import Search from "@/shared/ui/Search/Search"
import { ISortDirection } from "@/types/api-types"

import NoDataMsg from "../NoDataMsg/NoDataMsg"

export type ColumnsValues<T> = {
  align?: "left" | "center" | "right"
  highlight: boolean
  isImage?: boolean
  isSortable?: boolean
  /**
   * "key" prop makes sorting options possible and provides unique value.
   */
  key: string
  /**
   * Title of displayed column heading.
   */
  label: string
  /**
   * Used to refer to certain key value from "data" array of objects and based on that column's row values are being rendered.
   */
  render: (row: T) => React.ReactNode
}

export interface TableProps<T> {
  /**
   * Render additional filters for search tab inside the table
   */
  additionalOptions?: React.ReactNode
  /**
     * Based on "columns" prop, column headings are being rendered.
     *
     * @example
     *  columns={[
     {
     title: t("tableHeadings.name"),
     key: "name",
     render: (row) => row.name,
     sortable: true,
     },...
     */
  columns: ColumnsValues<T>[]
  /**
   * Data based on which the column's row values are rendered.
   */
  data: T[]
  /**
     * Use this prop to add your own filters (such as search input).
     *
     * @example
     *  filter={
     <div style={{ marginRight: "1rem" }}>
     <TextField
     placeholder="search..."
     defaultValue={search || ""}
     onChange={(e) => onChangeSearch(e.target.value)}
     size="small"
     />
     </div>
     }
     */
  filter?: React.ReactNode
  /**
   * Provide "isLoading" prop to prevent user from taking any actions.
   */
  isLoading: boolean
  /**
     * Pass a function that takes number as an argument. The Previous button passes number: (-1) to the function, and the Next button passes number: (1) to the function. Based on that create a logic that will update the current page.
     *
     * @example
     * Function that triggers the update:
     *
     *  const changePageHandler = (page: number) => {
     dispatch(patientsActions.changePage(page));
     };
     *
     * Function that updates the current page state:
     *
     *  changePage: (state, { payload }: PayloadAction<number>) => {
     if (payload === 1) {
     state.currentPage++;
     }
     if (payload !== 1) {
     state.currentPage--;
     }
     },
     */
  onChangePage: (page: number) => void
  /**
     * Pass a function that will change the number of visible rows per page.
     *
     * @example
     *
     * Function that triggers the update:
     *
     * const changeRowsPerPageHandler = (rowsPerPage: number) => {
     dispatch(patientsActions.changeRowsPerPage(rowsPerPage));
     };

     Function that updates the rows per page state:

     changeRowsPerPage: (state, { payload }: PayloadAction<number>) => {
     state.pageSize = payload;
     },
     */
  onChangeRowsPerPage: (rowsPerPage: number) => void
  onChangeSearch: (search: string) => void
  /**
     * Pass a function that will change the sorting property. Sorting is based on provided to columns "key" prop.
     *
     * @example
     *
     * Function that triggers the update:
     *
     * const changeSortHandler = (sortingProperty: string) => {
     dispatch(patientsActions.changeSort(sortingProperty));
     };

     Sorting logic:

     changeAllPatientsSort: (state, { payload }: PayloadAction<string>) => {
     if (state.sortBy === payload) {
     state.sortDirection === "desc"
     ? (state.sortDirection = "asc")
     : (state.sortDirection = "desc");
     }
     if (state.sortBy !== payload) {
     state.sortBy = payload;
     state.sortDirection = "desc";
     }
     },
     */
  onChangeSort: (
    sortingProperty: string,
    sortingDirection: ISortDirection,
  ) => void
  onRefreshContent?: (() => void) | undefined
  /**
   * Pass the "pagination" props to properly display information on the pagination bar.
   */
  pagination: {
    currentPage: number
    pageSize: number
    totalItems: number
  }
  /**
   * Pass values from search bar to make the words highliter work
   */
  searchWords: string
  /**
   * Pass the "sort" props to properly display sorting arrow icon.
   */
  sort: {
    sortBy: string
    sortDirection: ISortDirection
  }
  tableName?: string
}

const Table = <T,>({
  additionalOptions,
  columns,
  data,
  isLoading,
  onChangePage,
  onChangeRowsPerPage,
  onChangeSearch,
  onChangeSort,
  onRefreshContent,
  pagination,
  searchWords,
  sort,
}: // filter,
// onChangeSort,
// refreshTableContent,
// tableName,
TableProps<T>) => {
  const theme = useTheme()
  return (
    <Box display="flex" flexDirection="column" gap={4} sx={{ py: 0 }}>
      <Search
        additionalOptions={additionalOptions}
        onChangeSearch={onChangeSearch}
        onRefreshContent={onRefreshContent}
      />
      <Box sx={{ p: 0, position: "relative" }}>
        {isLoading && (
          <Box
            position="absolute"
            sx={{
              backgroundColor: theme.palette.grey[200],
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.6,
              display: "grid",
              placeItems: "center",
            }}
          >
            <CircularProgress size={70} />
          </Box>
        )}
        <Card sx={{ padding: 0 }}>
          <TableContainer>
            <MuiTable>
              <StyledTableHead>
                <TableRow>
                  {columns.map(({ isSortable, key, label }) => {
                    return isSortable ? (
                      <TableCell key={key}>
                        <TableSortLabel
                          active={sort.sortBy === key}
                          direction={
                            sort.sortDirection === SortDirection.ASCENDING
                              ? SortDirection.ASCENDING
                              : SortDirection.DESCENDING
                          }
                          sx={{
                            "&:hover": {
                              color: theme.palette.primary.main,
                              "& .MuiTableSortLabel-icon": {
                                color: theme.palette.primary.main,
                              },
                            },
                          }}
                          onClick={() =>
                            onChangeSort(
                              key,
                              sort.sortBy !== key
                                ? SortDirection.ASCENDING
                                : sort.sortBy === key &&
                                  sort.sortDirection ===
                                    SortDirection.DESCENDING
                                ? SortDirection.ASCENDING
                                : SortDirection.DESCENDING,
                            )
                          }
                        >
                          <span>{label}</span>
                        </TableSortLabel>
                      </TableCell>
                    ) : (
                      <TableCell key={key}>{label}</TableCell>
                    )
                  })}
                </TableRow>
              </StyledTableHead>
              <TableBody sx={{ position: "relative" }}>
                {data.map((item, index) => {
                  return (
                    <StyledTableRow key={index}>
                      {columns.map(
                        ({ align, highlight, isImage, key, render }) => {
                          if (isImage) {
                            return (
                              <TableCell align={align} key={key}>
                                <Avatar
                                  src={`${BASE_URL}/${render(item)}` || ""}
                                  sx={{
                                    outline: `1px solid ${theme.palette.primary.main}`,
                                  }}
                                />
                              </TableCell>
                            )
                          }
                          return (
                            <TableCell align={align} key={key}>
                              {highlight ? (
                                <Highlighter
                                  autoEscape={true}
                                  highlightClassName="highlighter"
                                  highlightStyle={{
                                    color: theme.palette.primary.contrastText,
                                    backgroundColor:
                                      theme.palette.primary.light,
                                  }}
                                  searchWords={searchWords.split(" ")}
                                  textToHighlight={`${render(item)}`}
                                />
                              ) : (
                                render(item)
                              )}
                            </TableCell>
                          )
                        },
                      )}
                    </StyledTableRow>
                  )
                })}
              </TableBody>
            </MuiTable>
            {data.length < 1 && <NoDataMsg />}
          </TableContainer>

          <TablePagination
            component="div"
            count={pagination.totalItems}
            page={pagination.currentPage - 1}
            rowsPerPage={pagination.pageSize}
            rowsPerPageOptions={[5, 10, 25]}
            sx={{
              "& .MuiTablePagination-select, .MuiTablePagination-selectLabel, .MuiSelect-icon, .MuiTablePagination-displayedRows,.MuiTablePagination-actions":
                {
                  color: (theme) => theme.palette.primary.dark,
                },
            }}
            onPageChange={(_, page) => onChangePage(page + 1)}
            onRowsPerPageChange={(e) => onChangeRowsPerPage(+e.target.value)}
          />
        </Card>
      </Box>
    </Box>
  )
}

export default Table

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.grey[50],
  },
}))

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
}))
