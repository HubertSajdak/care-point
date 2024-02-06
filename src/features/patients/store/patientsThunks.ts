import { createAsyncThunk } from "@reduxjs/toolkit"

import { RootState } from "@/app/store"
import { errorHandler } from "@/shared"

import { getPatients } from "../api/getPatients"

export const getAllPatients = createAsyncThunk(
  "patients/getAllPatients",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState

    const { currentPage, pageSize, search, sortBy, sortDirection } =
      state.patients
    const params = {
      sortBy,
      sortDirection,
      pageSize,
      currentPage,
      ...(search && { search }),
    }
    try {
      const res = await getPatients(params)
      return res.data
    } catch (error) {
      errorHandler({ error, thunkAPI })
    }
  },
)
