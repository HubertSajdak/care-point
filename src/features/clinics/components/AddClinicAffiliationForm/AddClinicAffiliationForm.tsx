import {
  Box,
  CircularProgress,
  Container,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material"
import dayjs from "dayjs"
import { FormikProvider, useFormik } from "formik"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { RouteNames } from "@/constants"
import { consultationTimeOptions } from "@/constants/consultationTimeOptions"
import { workingDayConfig } from "@/constants/workingDayConfig"
import {
  createUserClinicAffiliation,
  getSingleClinic,
} from "@/features/clinics"
import {
  capitalizeFirstChar,
  Stepper,
  TextFieldFormik,
  translateWeekDays,
} from "@/shared"
import CommonError from "@/shared/ui/CommonError/CommonError"

import { addClinicAffiliationSchema } from "../../schemas/addClinicAffiliation"
import WorkingDayRow from "../WorkingDayRow/WorkingDayRow"
import WorkingHoursRow from "../WorkingHoursRow/WorkingHoursRow"

import { mapDataToForm } from "./mapDataToForm"

const AddClinicAffiliationForm = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)
  const params = useParams()
  const user = useAppSelector((state) => state.auth.user)
  const singleClinic = useAppSelector((state) => state.clinics.singleClinic)
  const status = useAppSelector((state) => state.clinics.status)
  useEffect(() => {
    if (params.clinicId) {
      dispatch(getSingleClinic(params.clinicId))
    }
  }, [dispatch, params.clinicId])
  const addClinicAffiliationFormik = useFormik({
    initialValues: mapDataToForm(
      user?._id,
      params?.clinicId,
      singleClinic?.clinicName,
    ),
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(createUserClinicAffiliation(values))
      navigate(RouteNames.START)
    },
    validationSchema: addClinicAffiliationSchema,
  })
  const steps = [
    {
      id: 0,
      stepLabel: capitalizeFirstChar(t("clinic:basicInfoLabel")),
      stepElement: (
        <FormikProvider value={addClinicAffiliationFormik}>
          <form>
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: 0,
                py: 6,
              }}
            >
              <Typography textAlign="center" variant="h4">
                {t("clinic:selectedClinic")}: {singleClinic?.clinicName}
              </Typography>
              <Grid maxWidth={800} mt={4} container>
                <Grid mb={3} xs={12} item>
                  <Typography component="h4" mb={1} variant="h5">
                    {t("form:appointment.consultationFee")}
                  </Typography>
                  <TextFieldFormik name={"consultationFee"} type="number" />
                </Grid>
                <Grid mb={3} xs={12} item>
                  <Typography component="h4" mb={1} variant="h5">
                    {t("form:appointment.consultationTime")}
                  </Typography>
                  <Select
                    value={addClinicAffiliationFormik.values.timePerPatient}
                    fullWidth
                    onChange={(e) => {
                      addClinicAffiliationFormik.setFieldValue(
                        "timePerPatient",
                        e.target.value,
                      )
                    }}
                  >
                    {consultationTimeOptions.map((el) => {
                      return (
                        <MenuItem key={el.id} value={el.value}>
                          {capitalizeFirstChar(t(el.label))}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </Grid>
              </Grid>
            </Container>
          </form>
        </FormikProvider>
      ),
    },
    {
      id: 1,
      stepLabel: capitalizeFirstChar(t("clinic:chooseWorkingHours")),
      stepElement: (
        <FormikProvider value={addClinicAffiliationFormik}>
          <form>
            <Container
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 0,
                py: 6,
                gap: 2,
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box sx={{ alignSelf: { xs: "center", md: "flex-start" } }}>
                <Typography mb={4} textAlign="center" variant="h6">
                  {singleClinic?.clinicName} {t("clinic:openHours")}:
                </Typography>
                {singleClinic?.workingTime.map((el) => {
                  return (
                    <WorkingHoursRow
                      key={el._id}
                      startTime={el.startTime}
                      stopTime={el.stopTime}
                      weekDay={el.weekDay}
                    />
                  )
                })}
              </Box>
              <Box>
                <Typography mb={4} textAlign="center" variant="h6">
                  {t("clinic:selectYourWorkingHours")}:
                </Typography>
                <Grid maxWidth={800} rowSpacing={2} container>
                  {workingDayConfig.map((el) => {
                    return (
                      <WorkingDayRow
                        disableStartTime={
                          !singleClinic?.workingTime[el.id].startTime ||
                          !singleClinic?.workingTime[el.id].stopTime
                        }
                        disableStopTime={
                          !singleClinic?.workingTime[el.id].startTime ||
                          !singleClinic?.workingTime[el.id].stopTime ||
                          !addClinicAffiliationFormik.values.workingTime[el.id]
                            .startTime
                        }
                        key={el.id}
                        label={t(translateWeekDays(el.label))}
                        startTimeLabel={t(`form:common.${el.startTimeLabel}`)}
                        startTimeMinTime={dayjs(
                          `2018-04-04 ${
                            singleClinic?.workingTime[el.id].startTime
                          }`,
                        ).add(15, "minute")}
                        startTimeName={el.startTimeName}
                        stopTimeLabel={t(`form:common.${el.stopTimeLabel}`)}
                        stopTimeMaxTime={dayjs(
                          `2018-04-04 ${
                            singleClinic?.workingTime[el.id].stopTime
                          }`,
                        )}
                        stopTimeMinTime={dayjs(
                          `2018-04-04 ${
                            addClinicAffiliationFormik.values.workingTime[el.id]
                              .startTime
                          }`,
                        ).add(15, "minute")}
                        stopTimeName={el.stopTimeName}
                      />
                    )
                  })}
                </Grid>
              </Box>
            </Container>
          </form>
        </FormikProvider>
      ),
    },
  ]
  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      return addClinicAffiliationFormik.handleSubmit()
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }
  if (status === "loading") {
    return <CircularProgress />
  }
  if (status === "error") {
    return <CommonError translationKey={"common:errors.fetchDataError"} />
  }
  return (
    <Stepper
      activeStep={activeStep}
      handleBack={handleBack}
      handleNext={handleNext}
      isNextButtonDisabled={
        (activeStep === 0 &&
          (!addClinicAffiliationFormik.values.consultationFee ||
            !addClinicAffiliationFormik.values.timePerPatient)) ||
        (activeStep === 1 &&
          addClinicAffiliationFormik.values.workingTime.every(
            (day) => !day.startTime || !day.stopTime,
          ))
      }
      steps={steps}
    />
  )
}

export default AddClinicAffiliationForm
