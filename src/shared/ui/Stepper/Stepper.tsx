import {
  StepConnector,
  stepConnectorClasses,
  StepLabel,
  useMediaQuery,
} from "@mui/material"
import Box from "@mui/material/Box"
import Step from "@mui/material/Step"
import MuiStepper from "@mui/material/Stepper"
import React from "react"
import { useTranslation } from "react-i18next"
import styled, { useTheme } from "styled-components"

import { Button, PaddingPaper } from "@/shared"
interface StepperProps {
  activeStep: number
  children: (step: number) => ReactNode
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
  childenr,
  handleBack,
  handleNext,
  isNextButtonDisabled = false,
  isSubmitting,
}: StepperProps) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))
  return (
    <Box display="flex" flexDirection="column" gap={3} sx={{ width: "100%" }}>
      <PaddingPaper padding={0}>
        <MuiStepper
          activeStep={activeStep}
          alternativeLabel={isSmall ? true : false}
          connector={<QontoConnector />}
          sx={{ width: "100%", p: 2 }}
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
      </PaddingPaper>
      <React.Fragment>
        <PaddingPaper padding={2} sx={{ width: "100%" }}>
          {steps[activeStep].stepElement}
        </PaddingPaper>
        <PaddingPaper
          padding={1}
          sx={{ display: "flex", flexDirection: "row" }}
        >
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
              ? t("buttons:submit")
              : t("buttons:next")}
          </Button>
        </PaddingPaper>
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
