import { Box, CircularProgress, Grid, Typography } from "@mui/material"
import { FormikProvider, useFormik } from "formik"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import styled from "styled-components"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import {
  getSingleClinic,
  updateClinicInfo,
  uploadClinicPhoto,
} from "@/features/clinics"

import ClinicInfoCard from "../components/ClinicInfoCard/ClinicInfoCard"
import ClinicPhotoCard from "../components/ClinicPhotoCard/ClinicPhotoCard"
import ClinicWorkingTimeCard from "../components/ClinicWorkingTimeCard/ClinicWorkingTimeCard"
import { editClinicSchema } from "../schemas/editClinic"
import { uploadClinicPhotoSchema } from "../schemas/uploadClinicPhoto"

const EditClinic = () => {
  const param = useParams()
  const dispatch = useAppDispatch()
  const clinic = useAppSelector((state) => state.clinics.singleClinic)
  const status = useAppSelector((state) => state.clinics.status)
  const { t } = useTranslation()
  useEffect(() => {
    if (param.clinicId) dispatch(getSingleClinic(param.clinicId))
  }, [dispatch, param.clinicId])

  const editClinicPhotoFormik = useFormik<{
    clinicId: string
    file: File | null
  }>({
    initialValues: {
      clinicId: clinic?._id || "",
      file: null,
    },
    onSubmit: async (values, { resetForm }) => {
      const { clinicId, file } = values
      if (file) {
        await dispatch(uploadClinicPhoto({ clinicId: clinicId, file: file }))
        resetForm()
      }
    },
    enableReinitialize: true,
    validationSchema: uploadClinicPhotoSchema,
  })
  const editClinicFormik = useFormik({
    initialValues: {
      id: clinic?._id || "",
      clinicName: clinic?.clinicName || "",
      phoneNumber: clinic?.phoneNumber || "",
      address: {
        street: clinic?.address?.street || "",
        city: clinic?.address?.city || "",
        postalCode: clinic?.address?.postalCode || "",
      },
      workingTime: [
        {
          weekDay: "monday",
          startTime: clinic?.workingTime[0]?.startTime || "",
          stopTime: clinic?.workingTime[0]?.stopTime || "",
        },
        {
          weekDay: "tuesday",
          startTime: clinic?.workingTime[1]?.startTime || "",
          stopTime: clinic?.workingTime[1]?.stopTime || "",
        },
        {
          weekDay: "wednesday",
          startTime: clinic?.workingTime[2]?.startTime || "",
          stopTime: clinic?.workingTime[2]?.stopTime || "",
        },
        {
          weekDay: "thursday",
          startTime: clinic?.workingTime[3]?.startTime || "",
          stopTime: clinic?.workingTime[3]?.stopTime || "",
        },
        {
          weekDay: "friday",
          startTime: clinic?.workingTime[4]?.startTime || "",
          stopTime: clinic?.workingTime[4]?.stopTime || "",
        },
        {
          weekDay: "saturday",
          startTime: clinic?.workingTime[5]?.startTime || "",
          stopTime: clinic?.workingTime[5]?.stopTime || "",
        },
        {
          weekDay: "sunday",
          startTime: clinic?.workingTime[6]?.startTime || "",
          stopTime: clinic?.workingTime[6]?.stopTime || "",
        },
      ],
      photo: clinic?.photo || "",
    },
    enableReinitialize: true,
    validationSchema: editClinicSchema,
    onSubmit: async (values) => {
      await dispatch(updateClinicInfo(values))
    },
  })
  if (status === "loading") {
    return <CircularProgress />
  }
  return (
    <Box>
      <Typography component="h2" fontWeight="bold" mb={2} variant="h4">
        {t("clinic:editClinicTitle")}
      </Typography>
      <Grid alignItems="stretch" columnGap={3} rowSpacing={3} container>
        <Grid md={3} xs={12} item>
          <FormikProvider value={editClinicPhotoFormik}>
            <StyledForm onSubmit={editClinicPhotoFormik.handleSubmit}>
              <ClinicPhotoCard />
            </StyledForm>
          </FormikProvider>
        </Grid>
        <Grid xs={12} item md>
          <FormikProvider value={editClinicFormik}>
            <StyledForm onSubmit={editClinicFormik.handleSubmit}>
              <ClinicInfoCard />
            </StyledForm>
          </FormikProvider>
        </Grid>
        <Grid xs={12} item>
          <FormikProvider value={editClinicFormik}>
            <StyledForm onSubmit={editClinicFormik.handleSubmit}>
              <ClinicWorkingTimeCard />
            </StyledForm>
          </FormikProvider>
        </Grid>
      </Grid>
    </Box>
  )
}

export default EditClinic

const StyledForm = styled.form`
  height: 100%;
`
