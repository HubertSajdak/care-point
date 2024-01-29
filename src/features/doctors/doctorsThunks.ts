import { createAsyncThunk } from "@reduxjs/toolkit"

import { RootState } from "@/app/store"
import { Endpoints } from "@/constants/endpoints"
import { IDoctorUser, SuccessReqData } from "@/types/api-types"
import axiosPrivateInstance from "@/utils/axios/axiosPrivate"
import { errorHandler } from "@/utils/axios/axiosPublic"

export const getAllDoctors = createAsyncThunk(
  "doctors/getAllDoctors",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    const { currentPage, pageSize, search, sortBy, sortDirection } =
      state.doctors

    try {
      const res = await axiosPrivateInstance<SuccessReqData<IDoctorUser[]>>(
        Endpoints.GET_ALL_DOCTORS,
        {
          params: {
            sortBy,
            sortDirection,
            pageSize,
            currentPage,
            ...(search && { search }),
          },
        },
      )
      return res.data
    } catch (error) {
      errorHandler({ error, thunkAPI })
    }
  },
)
