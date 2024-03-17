import { createAsyncThunk } from "@reduxjs/toolkit"

import { RootState } from "@/app/store"
import { errorHandler } from "@/shared"

import { getDoctors } from "../api/getDoctors"
import { getSingleDoctorData } from "../api/getSingleDoctor"

export const getAllDoctors = createAsyncThunk(
  "doctors/getAllDoctors",
  async (appointmentParams: boolean, thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    const { appointmentsQueryParams, tableQueryParams } = state.doctors

    try {
      const res = await getDoctors(
        appointmentParams
          ? { ...appointmentsQueryParams }
          : { ...tableQueryParams },
      )
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
