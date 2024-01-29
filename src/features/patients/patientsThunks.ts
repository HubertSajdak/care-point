import { createAsyncThunk } from "@reduxjs/toolkit"

import { RootState } from "@/app/store"
import { Endpoints } from "@/constants/endpoints"
import { IPatientUser, SuccessReqData } from "@/types/api-types"
import axiosPrivateInstance from "@/utils/axios/axiosPrivate"
import { errorHandler } from "@/utils/axios/axiosPublic"

export const getAllPatients = createAsyncThunk(
  "patients/getAllPatients",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState

    const { currentPage, pageSize, search, sortBy, sortDirection } =
      state.patients

    try {
      const res = await axiosPrivateInstance<SuccessReqData<IPatientUser[]>>(
        Endpoints.GET_ALL_PATIENTS,
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
