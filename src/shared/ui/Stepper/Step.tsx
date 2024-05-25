import React, { ReactNode } from "react"

interface StepProps {
  content: ReactNode
  stepLabel: string
}

function Step({ content }: StepProps) {
  return <>{content}</>
}

export default Step
