import { createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

import { Endpoints } from "@/constants/endpoints"
import { ChangePasswordSchema } from "@/libs/yup/schemas/changePassword"
import { UploadPhotoValues } from "@/libs/yup/schemas/uploadPhoto"
import {
  IDoctorUser,
  IPatientUser,
  ReqLoginCredentials,
  ReqeustRegisterDoctorCredentials,
  ReqeustRegisterPatientCredentials,
  ResLogin,
  SuccessReqMsg,
} from "@/types/api-types"
import { Either } from "@/types/globals"
import axiosPrivateInstance from "@/utils/axios/axiosPrivate"
import axiosPublicInstance, { errorHandler } from "@/utils/axios/axiosPublic"
import { generateUniqueFileName } from "@/utils/functions"
import {
  setAccessTokenToLocalStorage,
  setRefreshTokenToLocalStorage,
} from "@/utils/localStorage/localStorage"

import { setRegistrationState } from "./authSlice"

type RegisterUserValues = Either<
  ReqeustRegisterDoctorCredentials,
  ReqeustRegisterPatientCredentials
>
export interface UpdateUserValues
  extends Omit<RegisterUserValues, "password" | "role"> {}

export const registerUser = createAsyncThunk(
  "auth/register",
  async (values: RegisterUserValues, thunkAPI) => {
    const endpoint =
      values.role === "doctor"
        ? Endpoints.REGISTER_DOCTOR
        : Endpoints.REGISTER_PATIENT
    const { address, email, name, password, phoneNumber, surname } = values
    const payload = {
      name,
      surname,
      email,
      password,
      ...(phoneNumber ? { phoneNumber } : {}),
      ...(Object.keys(address ? address : {}).length ? { address } : {}),
    }
    try {
      const res = await axiosPublicInstance.post<SuccessReqMsg>(
        endpoint,
        payload,
      )
      toast.success(res.data.message)
      thunkAPI.dispatch(setRegistrationState(true))
    } catch (error) {
      errorHandler({ error, thunkAPI })
    }
  },
)

export const loginUser = createAsyncThunk(
  "auth/login",
  async (values: ReqLoginCredentials, thunkAPI) => {
    try {
      const res = await axiosPublicInstance.post<ResLogin>(
        Endpoints.LOGIN,
        values,
      )
      setAccessTokenToLocalStorage(res.data.accessToken)
      setRefreshTokenToLocalStorage(res.data.refreshToken)
      toast.success(res.data.message)
    } catch (error) {
      errorHandler({ error, thunkAPI })
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const getUserData = createAsyncThunk(
  "auth/getUserData",
  async (_, thunkAPI) => {
    try {
      const res = await axiosPrivateInstance<Either<IPatientUser, IDoctorUser>>(
        Endpoints.USER_DATA,
      )
      return res.data
    } catch (error) {
      errorHandler({ error, thunkAPI })
    }
  },
)

export const updateUserInfo = createAsyncThunk(
  "auth/updateUserInfo",
  async (values: UpdateUserValues, thunkAPI) => {
    const { address, email, name, phoneNumber, surname } = values
    const payload = {
      name,
      surname,
      email,
      ...(phoneNumber ? { phoneNumber } : {}),
      ...(Object.keys(address ? address : {}).length ? { address } : {}),
    }
    try {
      const res = await axiosPrivateInstance.put<SuccessReqMsg>(
        Endpoints.USER_DATA,
        payload,
      )
      thunkAPI.dispatch(getUserData())
      toast.success(res.data.message)
    } catch (error) {
      errorHandler({ error, thunkAPI })
    }
  },
)
export const changeUserPassword = createAsyncThunk(
  "auth/updateUserPassword",
  async (values: ChangePasswordSchema, thunkAPI) => {
    try {
      const res = await axiosPrivateInstance.put<SuccessReqMsg>(
        Endpoints.UPDATE_USER_PASSWORD,
        { ...values },
      )
      toast.success(res.data.message)
    } catch (error) {
      errorHandler({ error, thunkAPI })
    }
  },
)

export const uploadUserPhoto = createAsyncThunk(
  "auth/uploadUserPhoto",
  async ({ file }: UploadPhotoValues, thunkAPI) => {
    const uniqueFileName = generateUniqueFileName(file.name)
    const formData = new FormData()
    formData.append("file", file, uniqueFileName)
    try {
      const res = await axiosPrivateInstance.put(
        Endpoints.UPLOAD_PHOTO,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )
      thunkAPI.dispatch(getUserData())
      toast.success(res.data.message)
    } catch (error) {
      errorHandler({ error, thunkAPI })
    }
  },
)

export const deleteUserPhoto = createAsyncThunk(
  "auth/deleteUserPhoto",
  async (_, thunkAPI) => {
    try {
      const res = await axiosPrivateInstance.put(Endpoints.DELETE_PHOTO)
      thunkAPI.dispatch(getUserData())
      toast.success(res.data.message)
    } catch (error) {
      errorHandler({ error, thunkAPI })
    }
  },
)
