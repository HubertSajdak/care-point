import CancelIcon from "@mui/icons-material/Cancel"
import { Box, Container, Grid, Typography } from "@mui/material"
import { FormikProvider, useFormik } from "formik"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { useAppDispatch } from "@/app/hooks"
import { RouteNames } from "@/constants"
import { AddClinicFormValues, addClinicSchema } from "@/libs"
import {
  Button,
  FileInputFormik,
  Stepper,
  TextFieldFormik,
  capitalizeFirstChar,
  handlePostalCodeKeyUp,
  translateWeekDays,
} from "@/shared"
import { IWeekDays } from "@/types/api-types"

import { createClinic } from "../store/clinicThunks"

import WorkingDayRow from "./WorkingDayRow"
interface WorkingDayConfigValues {
  id: number
  label: IWeekDays
  startTimeId: string
  startTimeLabel: string
  startTimeName: string
  stopTimeId: string
  stopTimeLabel: string
  stopTimeName: string
}
const workingDayConfig: WorkingDayConfigValues[] = [
  {
    id: 0,
    label: "monday",
    startTimeId: "monday-start-time",
    stopTimeId: "monday-stop-time",
    startTimeName: "workingTime[0].startTime",
    stopTimeName: "workingTime[0].stopTime",
    startTimeLabel: "from",
    stopTimeLabel: "to",
  },
  {
    id: 1,
    label: "tuesday",
    startTimeId: "tuesday-start-time",
    stopTimeId: "tuesday-stop-time",
    startTimeName: "workingTime[1].startTime",
    stopTimeName: "workingTime[1].stopTime",
    startTimeLabel: "from",
    stopTimeLabel: "to",
  },
  {
    id: 2,
    label: "wednesday",
    startTimeId: "wednesday-start-time",
    stopTimeId: "wednesday-stop-time",
    startTimeName: "workingTime[2].startTime",
    stopTimeName: "workingTime[2].stopTime",
    startTimeLabel: "from",
    stopTimeLabel: "to",
  },
  {
    id: 3,
    label: "thursday",
    startTimeId: "thursday-start-time",
    stopTimeId: "thursday-stop-time",
    startTimeName: "workingTime[3].startTime",
    stopTimeName: "workingTime[3].stopTime",
    startTimeLabel: "from",
    stopTimeLabel: "to",
  },
  {
    id: 4,
    label: "friday",
    startTimeId: "friday-start-time",
    stopTimeId: "friday-stop-time",
    startTimeName: "workingTime[4].startTime",
    stopTimeName: "workingTime[4].stopTime",
    startTimeLabel: "from",
    stopTimeLabel: "to",
  },
  {
    id: 5,
    label: "saturday",
    startTimeId: "saturday-start-time",
    stopTimeId: "saturday-stop-time",
    startTimeName: "workingTime[5].startTime",
    stopTimeName: "workingTime[5].stopTime",
    startTimeLabel: "from",
    stopTimeLabel: "to",
  },
  {
    id: 6,
    label: "sunday",
    startTimeId: "sunday-start-time",
    stopTimeId: "sunday-stop-time",
    startTimeName: "workingTime[6].startTime",
    stopTimeName: "workingTime[6].stopTime",
    startTimeLabel: "from",
    stopTimeLabel: "to",
  },
]
const AddClinicForm = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [activeStep, setActiveStep] = useState(0)
  const { t } = useTranslation()
  const addClinicFormik = useFormik<AddClinicFormValues>({
    initialValues: {
      clinicName: "",
      address: {
        street: "",
        city: "",
        postalCode: "",
      },
      phoneNumber: "",
      photo: undefined,
      workingTime: [
        {
          weekDay: "monday",
          startTime: "",
          stopTime: "",
        },
        {
          weekDay: "tuesday",
          startTime: "",
          stopTime: "",
        },
        {
          weekDay: "wednesday",
          startTime: "",
          stopTime: "",
        },
        {
          weekDay: "thursday",
          startTime: "",
          stopTime: "",
        },
        {
          weekDay: "friday",
          startTime: "",
          stopTime: "",
        },
        {
          weekDay: "saturday",
          startTime: "",
          stopTime: "",
        },
        {
          weekDay: "sunday",
          startTime: "",
          stopTime: "",
        },
      ],
    },
    validationSchema: addClinicSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      await dispatch(createClinic({ ...values }))
      navigate(RouteNames.START)
    },
  })

  const steps = [
    {
      id: 0,
      stepLabel: capitalizeFirstChar(t("form:clinic.addAddress")),
      stepElement: (
        <FormikProvider value={addClinicFormik}>
          <form>
            <Container
              sx={{ display: "flex", justifyContent: "center", p: 0, py: 6 }}
            >
              <Grid
                columnSpacing={2}
                justifyContent="center"
                maxWidth={800}
                rowSpacing={2}
                container
              >
                <Grid xs={12} item>
                  <Typography component="h3" mb={2} variant="h5">
                    {t("form:clinic.clinicName")}
                  </Typography>
                  <TextFieldFormik
                    label={t("form:clinic.clinicName")}
                    name={"clinicName"}
                  />
                </Grid>
                <Grid xs={12} item>
                  <Typography mb={2} variant="h5">
                    {t("form:common.address")}
                  </Typography>
                  <Box
                    display="flex"
                    gap={2}
                    sx={{ flexDirection: { xs: "column", sm: "row" } }}
                  >
                    <TextFieldFormik
                      label={t("form:common.street")}
                      name={"address.street"}
                    />
                    <TextFieldFormik
                      label={t("form:common.city")}
                      name={"address.city"}
                    />
                    <TextFieldFormik
                      inputProps={{
                        maxLength: 6,
                      }}
                      label={t("form:common.postalCode")}
                      name={"address.postalCode"}
                      onKeyUp={handlePostalCodeKeyUp}
                    />
                  </Box>
                </Grid>
                <Grid xs={12} item>
                  <Typography mb={2} variant="h5">
                    {t("form:common.phoneNumber")}
                  </Typography>
                  <TextFieldFormik
                    label={t("form:common.phoneNumber")}
                    name={"phoneNumber"}
                  />
                </Grid>
              </Grid>
            </Container>
          </form>
        </FormikProvider>
      ),
    },
    {
      id: 1,
      stepLabel: capitalizeFirstChar(t("form:clinic.addWorkingTime")),
      stepElement: (
        <FormikProvider value={addClinicFormik}>
          <form>
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 2,
              }}
            >
              <Typography component="h3" mb={4} variant="h5">
                {t("form:clinic.chooseWorkingTime")}
              </Typography>
              <Grid maxWidth={800} rowSpacing={2} container>
                {workingDayConfig.map((day) => {
                  return (
                    <WorkingDayRow
                      id={day.id}
                      key={day.id}
                      label={t(translateWeekDays(day.label))}
                      startTimeLabel={t(`form:common.${day.startTimeLabel}`)}
                      startTimeName={day.startTimeName}
                      stopTimeLabel={t(`form:common.${day.stopTimeLabel}`)}
                      stopTimeName={day.stopTimeName}
                    />
                  )
                })}
              </Grid>
            </Container>
          </form>
        </FormikProvider>
      ),
    },
    {
      id: 2,
      stepLabel: capitalizeFirstChar(t("form:clinic.addPhoto")),
      stepElement: (
        <FormikProvider value={addClinicFormik}>
          <Box alignItems="center" display="flex" flexDirection="column" my={2}>
            <Typography component="h3" mb={4} variant="h5">
              {t("form:clinic.addClinicPhoto")}
            </Typography>
            <Box>
              <FileInputFormik
                accept="image/*"
                disabled={addClinicFormik.isSubmitting}
                errorText={addClinicFormik.errors.photo}
                imgPreview={addClinicFormik.values.photo}
                name="photo"
                variant="square"
              />
            </Box>
            <Box>
              {addClinicFormik.values.photo ? (
                <Box display="flex" flexDirection="column" gap={2} my={2}>
                  <Button
                    color="warning"
                    disabled={addClinicFormik.isSubmitting}
                    startIcon={<CancelIcon />}
                    variant="outlined"
                    onClick={() => {
                      addClinicFormik.setFieldValue("photo", null)
                    }}
                  >
                    {t("buttons:cancel")}
                  </Button>
                </Box>
              ) : null}
            </Box>
          </Box>
        </FormikProvider>
      ),
    },
  ]
  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      return addClinicFormik.handleSubmit()
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <Stepper
      activeStep={activeStep}
      handleBack={handleBack}
      handleNext={handleNext}
      isNextButtonDisabled={
        (activeStep === 0 &&
          (!addClinicFormik.values.clinicName ||
            !addClinicFormik.values.phoneNumber ||
            !addClinicFormik.values.address.street ||
            !addClinicFormik.values.address.city ||
            !addClinicFormik.values.address.postalCode)) ||
        (activeStep === 1 &&
          addClinicFormik.values.workingTime.every(
            (day) => !day.startTime || !day.stopTime,
          ))
      }
      steps={steps}
    />
  )
}

export default AddClinicForm
