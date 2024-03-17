import { createAsyncThunk } from "@reduxjs/toolkit"

import { RootState } from "@/app/store"
import { getSinglePatientData } from "@/features/patients"
import { errorHandler } from "@/shared"

import { getPatients } from "../api/getPatients"

export const getAllPatients = createAsyncThunk(
  "patients/getAllPatients",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState

    const { queryParams } = state.patients
    const params = { ...queryParams }
    try {
      const res = await getPatients(params)
      return res.data
    } catch (error) {
      errorHandler({ error, thunkAPI })
    }
  },
)
export const getSinglePatient = createAsyncThunk(
  "patients/getSinglePatient",
  async (id: string, thunkAPI) => {
    try {
      const res = await getSinglePatientData(id)
      return res.data.patient
    } catch (error) {
      errorHandler({ error, thunkAPI })
    }
  },
)
