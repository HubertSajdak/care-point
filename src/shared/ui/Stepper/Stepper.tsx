import { StepLabel, useMediaQuery } from "@mui/material"
import Box from "@mui/material/Box"
import Step from "@mui/material/Step"
import MuiStepper from "@mui/material/Stepper"
import React, { Children, ReactNode, useState } from "react"
import { useTranslation } from "react-i18next"
import { useTheme } from "styled-components"

import { Button, PaddingPaper } from "@/shared"

import { QontoConnector } from "./Stepper.styled"

interface StepperProps {
  children: ReactNode
  disableNextButton: (currentStep: number) => boolean
  isSubmitting?: boolean
  onSubmit: () => void
}

const Stepper = ({ children, disableNextButton, onSubmit }: StepperProps) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const handleNext = () => {
    if (activeStep === React.Children.count(children) - 1) {
      const handleSubmit = async () => {
        setIsSubmitting(true)
        try {
          await onSubmit()
          setIsSubmitting(false)
        } catch (error) {
          setIsSubmitting(false)
        }
      }
      return handleSubmit()
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }
  const isNextButtonDisabled = disableNextButton(activeStep)
  return (
    <Box display="flex" flexDirection="column" gap={3} sx={{ width: "100%" }}>
      <PaddingPaper padding={0}>
        <MuiStepper
          activeStep={activeStep}
          alternativeLabel={isSmall}
          connector={<QontoConnector />}
          sx={{ width: "100%", p: 2 }}
        >
          {Children.map(children, (child, idx) => {
            const stepProps: { completed?: boolean } = {}
            if (React.isValidElement(child)) {
              return (
                <Step key={idx} {...stepProps}>
                  <StepLabel>{child.props.stepLabel}</StepLabel>
                </Step>
              )
            }
            return child
          })}
        </MuiStepper>
      </PaddingPaper>
      <React.Fragment>
        <PaddingPaper padding={2} sx={{ width: "100%" }}>
          {Children.map(children, (child, idx) => {
            if (idx === activeStep && React.isValidElement(child)) {
              return child.props.content
            }
          })}
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
            {activeStep === Children.count(children) - 1
              ? t("buttons:submit")
              : t("buttons:next")}
          </Button>
        </PaddingPaper>
      </React.Fragment>
    </Box>
  )
}

export default Stepper
