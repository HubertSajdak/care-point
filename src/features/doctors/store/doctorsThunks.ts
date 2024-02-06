import { createAsyncThunk } from "@reduxjs/toolkit"

import { RootState } from "@/app/store"
import { errorHandler } from "@/shared"

import { getDoctors } from "../api/getDoctors"
import { getSingleDoctorData } from "../api/getSingleDoctor"

export const getAllDoctors = createAsyncThunk(
  "doctors/getAllDoctors",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    const { currentPage, pageSize, search, sortBy, sortDirection } =
      state.doctors
    const params = {
      sortBy,
      sortDirection,
      pageSize,
      currentPage,
      ...(search && { search }),
    }
    try {
      const res = await getDoctors(params)
      return res.data
    } catch (error) {
      errorHandler({ error, thunkAPI })
    }
  },
)

export const getSingleDoctor = createAsyncThunk(
  "doctors/getSingleDoctor",
  async (id: string, thunkAPI) => {
    try {
      const res = await getSingleDoctorData(id)
      return res.data.doctor
    } catch (error) {
      errorHandler({ error, thunkAPI })
    }
  },
)
