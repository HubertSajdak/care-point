import {
  Paper,
  StepConnector,
  stepConnectorClasses,
  StepLabel,
} from "@mui/material"
import Box from "@mui/material/Box"
import Step from "@mui/material/Step"
import MuiStepper from "@mui/material/Stepper"
import React from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"

import { Button } from "@/shared"
interface StepperProps {
  activeStep: number
  handleBack: () => void
  handleNext: () => void
  isNextButtonDisabled: boolean
  isSubmitting?: boolean
  steps: {
    id: number
    stepElement: React.ReactNode
    stepLabel: string
  }[]
}
const Stepper = ({
  activeStep,
  handleBack,
  handleNext,
  isNextButtonDisabled = false,
  isSubmitting,
  steps,
}: StepperProps) => {
  const { t } = useTranslation()
  return (
    <Box display="flex" flexDirection="column" gap={3} sx={{ width: "100%" }}>
      <Paper>
        <MuiStepper
          activeStep={activeStep}
          connector={<QontoConnector />}
          sx={{ width: "100%" }}
        >
          {steps.map((el) => {
            const stepProps: { completed?: boolean } = {}
            return (
              <Step key={el.id} {...stepProps}>
                <StepLabel>{el.stepLabel}</StepLabel>
              </Step>
            )
          })}
        </MuiStepper>
      </Paper>
      <React.Fragment>
        <Paper sx={{ width: "100%" }}>{steps[activeStep].stepElement}</Paper>
        <Paper sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            sx={{ mr: 1 }}
            onClick={handleBack}
          >
            {t("buttons:back")}
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button
            disabled={isNextButtonDisabled || isSubmitting}
            isSubmitting={isSubmitting}
            onClick={handleNext}
          >
            {activeStep === steps.length - 1
              ? t("form:appointment.confirmBtn")
              : t("buttons:next")}
          </Button>
        </Paper>
      </React.Fragment>
    </Box>
  )
}

export default Stepper

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}))
