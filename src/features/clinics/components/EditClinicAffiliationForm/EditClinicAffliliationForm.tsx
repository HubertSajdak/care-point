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
  getSingleClinic,
  getSingleClinicAffiliation,
  updateClinicAffiliation,
} from "@/features/clinics"
import {
  capitalizeFirstChar,
  Stepper,
  TextFieldFormik,
  translateWeekDays,
} from "@/shared"
import CommonError from "@/shared/ui/CommonError/CommonError"

import WorkingDayRow from "../WorkingDayRow/WorkingDayRow"
import WorkingHoursRow from "../WorkingHoursRow/WorkingHoursRow"

const EditClinicAffiliationForm = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const singleClinicAffiliation = useAppSelector(
    (state) => state.clinics.singleClinicAffiliation,
  )
  const status = useAppSelector((state) => state.clinics.status)
  const singleClinic = useAppSelector((state) => state.clinics.singleClinic)
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)
  const params = useParams()
  useEffect(() => {
    if (params.clinicAffiliationId) {
      dispatch(getSingleClinicAffiliation(params.clinicAffiliationId))
    }
  }, [dispatch, params.clinicAffiliationId])
  useEffect(() => {
    if (singleClinicAffiliation?.clinicId) {
      dispatch(getSingleClinic(singleClinicAffiliation?.clinicId))
    }
  }, [singleClinicAffiliation?.clinicId, dispatch])
  const editClinicAffiliationFormik = useFormik({
    initialValues: {
      doctorId: singleClinicAffiliation?.doctorId || "",
      clinicId: singleClinicAffiliation?.clinicId || "",
      clinicName: singleClinicAffiliation?.clinicName || "",
      clinicAffiliationId: singleClinicAffiliation?._id || "",
      workingTime: [
        {
          weekDay: "monday",
          startTime: singleClinicAffiliation?.workingTime[0].startTime || "",
          stopTime: singleClinicAffiliation?.workingTime[0].stopTime || "",
        },
        {
          weekDay: "tuesday",
          startTime: singleClinicAffiliation?.workingTime[1].startTime || "",
          stopTime: singleClinicAffiliation?.workingTime[1].stopTime || "",
        },
        {
          weekDay: "wednesday",
          startTime: singleClinicAffiliation?.workingTime[2].startTime || "",
          stopTime: singleClinicAffiliation?.workingTime[2].stopTime || "",
        },
        {
          weekDay: "thursday",
          startTime: singleClinicAffiliation?.workingTime[3].startTime || "",
          stopTime: singleClinicAffiliation?.workingTime[3].stopTime || "",
        },
        {
          weekDay: "friday",
          startTime: singleClinicAffiliation?.workingTime[4].startTime || "",
          stopTime: singleClinicAffiliation?.workingTime[4].stopTime || "",
        },
        {
          weekDay: "saturday",
          startTime: singleClinicAffiliation?.workingTime[5].startTime || "",
          stopTime: singleClinicAffiliation?.workingTime[5].stopTime || "",
        },
        {
          weekDay: "sunday",
          startTime: singleClinicAffiliation?.workingTime[6].startTime || "",
          stopTime: singleClinicAffiliation?.workingTime[6].stopTime || "",
        },
      ],
      available: true,
      reasonOfAbsence: "",
      absenceTime: {
        from: "",
        to: "",
      },
      consultationFee: singleClinicAffiliation?.consultationFee || 0,
      timePerPatient: singleClinicAffiliation?.timePerPatient || 15,
    },
    onSubmit: async (values) => {
      await dispatch(updateClinicAffiliation(values))
      navigate(RouteNames.START)
    },
    enableReinitialize: true,
  })
  const steps = [
    {
      id: 0,
      stepLabel: capitalizeFirstChar(t("clinic:editBasicInfo")),
      stepElement: (
        <FormikProvider value={editClinicAffiliationFormik}>
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
                {t("clinic:selectedClinic")}:{" "}
                {singleClinicAffiliation?.clinicName}
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
                    value={editClinicAffiliationFormik.values.timePerPatient}
                    fullWidth
                    onChange={(e) => {
                      editClinicAffiliationFormik.setFieldValue(
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
      stepLabel: capitalizeFirstChar(t("clinic:editWorkingHours")),
      stepElement: (
        <FormikProvider value={editClinicAffiliationFormik}>
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
                          !editClinicAffiliationFormik.values.workingTime[el.id]
                            .startTime
                        }
                        id={el.id}
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
                            editClinicAffiliationFormik.values.workingTime[
                              el.id
                            ].startTime
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
      return editClinicAffiliationFormik.handleSubmit()
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
          (!editClinicAffiliationFormik.values.consultationFee ||
            !editClinicAffiliationFormik.values.timePerPatient)) ||
        (activeStep === 1 &&
          editClinicAffiliationFormik.values.workingTime.every(
            (day) => !day.startTime || !day.stopTime,
          ))
      }
      steps={steps}
    />
  )
}

export default EditClinicAffiliationForm
