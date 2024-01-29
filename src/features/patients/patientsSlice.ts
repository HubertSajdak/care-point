import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { IPatientUser, ISortDirection, ReqStatus } from "@/types/api-types"

import { getAllPatients } from "./patientsThunks"
interface InitialPatientsDataValues {
  currentPage: number
  data: IPatientUser[] | null
  pageSize: number
  search: string
  sortBy: string
  sortDirection: ISortDirection
  status: ReqStatus
  totalItems: number
}
const initialState: InitialPatientsDataValues = {
  search: "",
  sortBy: "name",
  sortDirection: "asc",
  pageSize: 5,
  currentPage: 1,
  status: "idle",
  data: null,
  totalItems: 0,
}

const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    changeSort: (
      state,
      {
        payload,
      }: PayloadAction<{
        sortingDirection: ISortDirection
        sortingProperty: string
      }>,
    ) => {
      state.sortBy = payload.sortingProperty
      state.sortDirection = payload.sortingDirection
    },
    changePage: (state, { payload }: PayloadAction<number>) => {
      state.currentPage = payload
    },
    changeRowsPerPage: (state, { payload }: PayloadAction<number>) => {
      state.pageSize = payload
      state.currentPage = 1
    },
    changeSearch: (state, { payload }: PayloadAction<string>) => {
      state.search = payload
      state.currentPage = 1
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPatients.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getAllPatients.fulfilled, (state, { payload }) => {
        if (payload) {
          state.data = payload.data
          state.totalItems = payload.totalItems
        }
        state.status = "idle"
      })
      .addCase(getAllPatients.rejected, (state) => {
        state.status = "error"
      })
  },
})
export const { changePage, changeRowsPerPage, changeSearch, changeSort } =
  patientsSlice.actions
export default patientsSlice.reducer
