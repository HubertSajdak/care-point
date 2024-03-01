import { createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

import { errorHandler, generateUniqueFileName } from "@/shared"
import { IAddress, IClinicInfo } from "@/types/api-types"

import { addClinic } from "../api/addClinic"
import { getClinics } from "../api/getClinics"
import { uploadPhoto } from "../api/uploadPhoto"

interface CreateClinicValues {
  address: IAddress
  clinicName: string
  phoneNumber: string
  photo?: File | null
  workingTime: {
    startTime?: string | undefined
    stopTime?: string | undefined
    weekDay: string
  }[]
}

export const createClinic = createAsyncThunk(
  "doctors/getAllDoctors",
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
export const getAllClinics = createAsyncThunk(
  "doctors/getAllDoctors",
  async (values: Omit<IClinicInfo, "_id">, thunkAPI) => {
    try {
      const res = await getClinics()
      return res.data
    } catch (error) {
      errorHandler({ error, thunkAPI })
    }
  },
)
export const uploadClinicPhoto = createAsyncThunk(
  "doctors/getAllDoctors",
  async (values: { clinicId: string; file: File }, thunkAPI) => {
    const uniqueFileName = generateUniqueFileName(values.file.name)
    const formData = new FormData()
    formData.append("file", values.file, uniqueFileName)
    try {
      const res = await uploadPhoto(formData, values.clinicId)
      toast.success(res.data.message)
    } catch (error) {
      errorHandler({ error, thunkAPI })
    }
  },
)
