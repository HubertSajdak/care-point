import { createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

import { Endpoints } from "@/constants"
import { ChangePasswordSchema, UploadPhotoValues } from "@/libs"
import {
  errorHandler,
  generateUniqueFileName,
  setAccessTokenToLocalStorage,
  setRefreshTokenToLocalStorage,
} from "@/shared"
import {
  ReqeustRegisterDoctorCredentials,
  ReqeustRegisterPatientCredentials,
  ReqLoginCredentials,
} from "@/types/api-types"
import { Either } from "@/types/globals"

import { changePassword } from "../api/changePassword"
import { deletePhoto } from "../api/deletePhoto"
import { getUser } from "../api/getUser"
import { login } from "../api/login"
import { register } from "../api/register"
import { updateUser } from "../api/updateUser"
import { uploadPhoto } from "../api/uploadPhoto"

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
    const {
      address,
      birthDate,
      email,
      height,
      name,
      password,
      phoneNumber,
      surname,
      weight,
    } = values
    const payload = {
      name,
      surname,
      email,
      password,
      birthDate,
      weight,
      height,
      ...(phoneNumber ? { phoneNumber } : {}),
      ...(Object.keys(address ? address : {}).length ? { address } : {}),
    }
    try {
      const res = await register(payload, endpoint)
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
      const res = await login(values)
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
      const res = await getUser()
      return res.data
    } catch (error) {
      errorHandler({ error, thunkAPI })
    }
  },
)

export const updateUserInfo = createAsyncThunk(
  "auth/updateUserInfo",
  async (values: UpdateUserValues, thunkAPI) => {
    const {
      address,
      birthDate,
      email,
      height,
      name,
      phoneNumber,
      surname,
      weight,
    } = values
    const payload = {
      name,
      surname,
      email,
      birthDate,
      height,
      weight,
      ...(phoneNumber ? { phoneNumber } : {}),
      ...(Object.keys(address ? address : {}).length ? { address } : {}),
    }
    try {
      const res = await updateUser(payload)
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
      const res = await changePassword(values)
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
      const res = await uploadPhoto(formData)
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
      const res = await deletePhoto()
      thunkAPI.dispatch(getUserData())
      toast.success(res.data.message)
    } catch (error) {
      errorHandler({ error, thunkAPI })
    }
  },
)
