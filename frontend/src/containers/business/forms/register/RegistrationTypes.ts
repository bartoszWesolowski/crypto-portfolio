export interface MultiStepFormProps {
  nextStepHandler: () => void
  previousStepHandler: () => void
  updateFormState: (formValues: object) => void
  currentFormValue: any
}
