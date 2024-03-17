import { createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

import { RootState } from "@/app/store"
import { errorHandler, generateUniqueFileName } from "@/shared"
import { IAddress } from "@/types/api-types"

import { addClinic } from "../api/addClinic"
import {
  addClinicAffiliation,
  RequestAddClinicAffiliationData,
} from "../api/addClinicAffiliation"
import { getClinic } from "../api/getClinic"
import { getClinicAffiliation } from "../api/getClinicAffiliation"
import { getClinics } from "../api/getClinics"
import { getUserClinics } from "../api/getUserClinics"
import { removeClinicPhoto } from "../api/removeClinicPhoto"
import {
  RequestUpdateClinicAffiliationData,
  updateAffiliation,
} from "../api/updateAffiliation"
import { updateClinic } from "../api/updateClinic"
import { uploadPhoto } from "../api/uploadPhoto"

interface CreateClinicValues {
  address: IAddress
  clinicName: string
  phoneNumber: string | number
  photo?: File | null
  workingTime: {
    startTime?: string | undefined
    stopTime?: string | undefined
    weekDay: string
  }[]
}

interface UpdateClinicValues extends Omit<CreateClinicValues, "photo"> {
  id: string
  photo: string | undefined
}

export const createClinic = createAsyncThunk(
  "clinics/createClinic",
  async (values: CreateClinicValues, thunkAPI) => {
    const payload = { ...values, photo: "", phoneNumber: +values.phoneNumber }
    try {
      const res = await addClinic(payload)
      const createdClinicId = res.data.id
      toast.success(res.data.message)
      if (values.photo) {
        thunkAPI.dispatch(
          uploadClinicPhoto({ file: values.photo, clinicId: createdClinicId }),
        )
      }
    } catch (error) {
      errorHandler({ error, thunkAPI })
    }
  },
)
export const updateClinicInfo = createAsyncThunk(
  "clinics/updateClinic",
  async (values: UpdateClinicValues, thunkAPI) => {
    const payload = { ...values, phoneNumber: +values.phoneNumber }
    try {
      const res = await updateClinic(payload)
      thunkAPI.dispatch(getSingleClinic(values.id))
      toast.success(res.data.message)
    } catch (error) {
      errorHandler({ error, thunkAPI })
    }
  },
)
export const getAllClinics = createAsyncThunk(
  "clinics/getAllClinics",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    const { queryParams } = state.clinics
    const params = { ...queryParams }
    try {
      const res = await getClinics(params)
      return res.data
    } catch (error) {
      errorHandler({ error, thunkAPI })
    }
  },
)

export const getUserClinicsAffiliations = createAsyncThunk(
  "clinics/getUserClinicsAffiliations",
  async (_, thunkAPI) => {
    try {
      const res = await getUserClinics()
      return res.data
    } catch (error) {
      errorHandler({ error, thunkAPI })
    }
  },
)
export const getSingleClinicAffiliation = createAsyncThunk(
  "clinics/getSingleClinicAffiliation",
  async (id: string, thunkAPI) => {
    try {
      const res = await getClinicAffiliation(id)
      return res.data
    } catch (error) {
      errorHandler({ error, thunkAPI })
    }
  },
)
export const createUserClinicAffiliation = createAsyncThunk(
  "clinics/createUserClinicAffiliation",
  async (values: RequestAddClinicAffiliationData, thunkAPI) => {
    try {
      const res = await addClinicAffiliation(values)
      toast.success(res.data.message)
    } catch (error) {
      errorHandler({ error, thunkAPI })
    }
  },
)
export const updateClinicAffiliation = createAsyncThunk(
  "clinics/updateClinicAffiliation",
  async (values: RequestUpdateClinicAffiliationData, thunkAPI) => {
    try {
      const res = await updateAffiliation(values.clinicAffiliationId, {
        ...values,
      })
      toast.success(res.data.message)
    } catch (error) {
      errorHandler({ error, thunkAPI })
    }
  },
)
export const getSingleClinic = createAsyncThunk(
  "clinics/getSingleClinic",
  async (id: string, thunkAPI) => {
    try {
      const res = await getClinic(id)
      return res.data
    } catch (error) {
      errorHandler({ error, thunkAPI })
    }
  },
)
export const uploadClinicPhoto = createAsyncThunk(
  "clinics/uploadClinicPhoto",
  async (values: { clinicId: string; file: File }, thunkAPI) => {
    const uniqueFileName = generateUniqueFileName(values.file.name)
    const formData = new FormData()
    formData.append("file", values.file, uniqueFileName)
    try {
      const res = await uploadPhoto(formData, values.clinicId)
      thunkAPI.dispatch(getSingleClinic(values.clinicId))
      toast.success(res.data.message)
    } catch (error) {
      errorHandler({ error, thunkAPI })
    }
  },
)

export const deleteClinicPhoto = createAsyncThunk(
  "clinics/removeClinicPhoto",
  async (clinicId: string, thunkAPI) => {
    try {
      const res = await removeClinicPhoto(clinicId)
      thunkAPI.dispatch(getSingleClinic(clinicId))
      toast.success(res.data.message)
    } catch (error) {
      errorHandler({ error, thunkAPI })
    }
  },
)
