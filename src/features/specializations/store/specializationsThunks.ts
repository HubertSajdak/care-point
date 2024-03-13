import { createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

import {
  createUserSpecialization,
  deleteUserSpecialization,
  getCurrentUserSpecializations,
  getSpecializations,
} from "@/features/specializations"
import { errorHandler } from "@/shared"

export const getAllSpecializations = createAsyncThunk(
  "specializations/getAllSpecializations",
  async (_, thunkAPI) => {
    try {
      const res = await getSpecializations()
      return res.data
    } catch (error) {
      errorHandler({ error, thunkAPI })
    }
  },
)
export const getDoctorSpecializations = createAsyncThunk(
  "specializations/getDoctorSpecializations",
  async (_, thunkAPI) => {
    try {
      const res = await getCurrentUserSpecializations()
      return res.data
    } catch (error) {
      errorHandler({ error, thunkAPI })
    }
  },
)

export const createDoctorSpecialization = createAsyncThunk(
  "specializations/createDoctorSpecialization",
  async (specializationId: string, thunkAPI) => {
    try {
      const res = await createUserSpecialization(specializationId)
      toast.success(res.data.message)
      thunkAPI.dispatch(getDoctorSpecializations())
    } catch (error) {
      errorHandler({ error, thunkAPI })
    }
  },
)
export const deleteDoctorSpecialization = createAsyncThunk(
  "specializations/deleteDoctorSpecialization",
  async (specializationId: string, thunkAPI) => {
    try {
      const res = await deleteUserSpecialization(specializationId)
      toast.success(res.data.message)
      thunkAPI.dispatch(getDoctorSpecializations())
    } catch (error) {
      errorHandler({ error, thunkAPI })
    }
  },
)
