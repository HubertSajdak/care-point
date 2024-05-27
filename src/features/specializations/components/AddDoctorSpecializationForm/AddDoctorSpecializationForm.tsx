import AddCircleIcon from "@mui/icons-material/AddCircle"
import CancelIcon from "@mui/icons-material/Cancel"
import DeleteIcon from "@mui/icons-material/Delete"
import {
  Divider,
  IconButton,
  ListItem as MuiListItem,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { FormikProvider, useFormik } from "formik"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import {
  createDoctorSpecialization,
  deleteDoctorSpecialization,
} from "@/features/specializations"

import { StyledForm, StyledList } from "./AddDoctorSpecializationForm.styled"

const AddDoctorSpecializationForm = () => {
  const [isComboBoxOpen, setIsComboBoxOpen] = useState<boolean>(false)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const allSpecializations = useAppSelector(
    (state) => state.specializations.allSpecializations,
  )
  const theme = useTheme()

  const currentUserSpecializations = useAppSelector(
    (state) => state.specializations.currentUserSpecializations,
  )
  const addDoctorSpecializationFormik = useFormik({
    initialValues: {
      specializationId: "-",
    },
    enableReinitialize: true,
    onSubmit: async ({ specializationId }, { resetForm }) => {
      await dispatch(createDoctorSpecialization(specializationId))
      resetForm()
    },
  })
  const specializationsOptions = allSpecializations?.data?.map((spec) => {
    return {
      id: spec._id,
      label: `common:specializations.${spec.specializationKey}`,
      value: spec._id,
    }
  })
  const deleteCurrentDoctorSpecialization = async (
    specializationId: string,
  ) => {
    await dispatch(deleteDoctorSpecialization(specializationId))
  }
  return (
    <FormikProvider value={addDoctorSpecializationFormik}>
      <StyledForm>
        <StyledList sx={{ maxWidth: 800, width: "100%" }}>
          {currentUserSpecializations?.data &&
          currentUserSpecializations?.data.length > 0
            ? currentUserSpecializations?.data?.map((specialization) => {
                return (
                  <ListItem
                    id={specialization._id}
                    key={specialization.Specialization.specializationKey}
                    text={t(
                      `common:specializations.${specialization.Specialization.specializationKey}`,
                    )}
                    onDelete={() =>
                      deleteCurrentDoctorSpecialization(specialization._id)
                    }
                  />
                )
              })
            : null}
          <MuiListItem
            sx={{ display: "flex", justifyContent: "center", gap: 1 }}
          >
            {isComboBoxOpen && (
              <Select
                value={addDoctorSpecializationFormik.values.specializationId}
                fullWidth
                onChange={(e) => {
                  addDoctorSpecializationFormik.setFieldValue(
                    "specializationId",
                    e.target.value,
                  )
                }}
              >
                <MenuItem key={"1"} value="-">
                  -
                </MenuItem>
                {specializationsOptions?.map((el) => {
                  return (
                    <MenuItem key={el.id} value={el.value}>
                      {t(el.label)}
                    </MenuItem>
                  )
                })}
              </Select>
            )}
            {isComboBoxOpen && (
              <IconButton
                disabled={addDoctorSpecializationFormik.isSubmitting}
                onClick={() => addDoctorSpecializationFormik.handleSubmit()}
              >
                <AddCircleIcon
                  color="primary"
                  sx={{ fontSize: theme.spacing(4) }}
                />
              </IconButton>
            )}
            <IconButton
              disabled={addDoctorSpecializationFormik.isSubmitting}
              onClick={() => setIsComboBoxOpen(!isComboBoxOpen)}
            >
              {isComboBoxOpen ? (
                <CancelIcon
                  color="warning"
                  sx={{ fontSize: theme.spacing(4) }}
                />
              ) : (
                <AddCircleIcon
                  color="primary"
                  sx={{ fontSize: theme.spacing(4) }}
                />
              )}
            </IconButton>
          </MuiListItem>
        </StyledList>
      </StyledForm>
    </FormikProvider>
  )
}

export default AddDoctorSpecializationForm
const ListItem = ({
  id,
  onDelete,
  text,
}: {
  id: string
  onDelete: (specializationId: string) => Promise<void>
  text: string
}) => {
  return (
    <>
      <MuiListItem>
        <ListItemText>{text}</ListItemText>
        <ListItemIcon>
          <IconButton onClick={() => onDelete(id)}>
            <DeleteIcon />
          </IconButton>
        </ListItemIcon>
      </MuiListItem>
      <Divider orientation="horizontal" />
    </>
  )
}
