import { BASE_URL } from "@/constants/endpoints"
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import { Avatar, Box, CircularProgress, FormHelperText } from "@mui/material"
import { useField } from "formik"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import styled, { useTheme } from "styled-components"
interface FileInputFormikProps {
  children?: React.ReactNode
  name: string
  accept?: string
  disabled?: boolean
  imgPreview?: File | null
  photo?: string
  helperText?: string
  errorText?: string
}
const FileInputFormik = ({
  name,
  accept,
  disabled = false,
  children,
  imgPreview,
  photo,
  errorText,
  helperText,
}: FileInputFormikProps) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const [dragOverCount, setDragOverCount] = useState(0)
  const [field, meta, helpers] = useField(name)

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    helpers.setValue(e.dataTransfer.files[0])
    setDragOverCount(0)
  }
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }
  const handleDragEnter = () => {
    setDragOverCount((prev) => prev + 1)
  }
  const handleDragLeave = () => {
    setDragOverCount((prev) => prev - 1)
  }
  return (
    <>
      <StyledInputBox
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        className={dragOverCount ? "is-drag-over" : ""}
      >
        {disabled && (
          <Box
            display="grid"
            zIndex={1}
            width="100%"
            height="100%"
            position="absolute"
            left={0}
            top={0}
            bottom={0}
            right={0}
            sx={{
              background: theme.palette.grey[50],
              opacity: 0.6,
              borderRadius: "50%",
              placeItems: "center",
            }}
          >
            <CircularProgress size={100} />
          </Box>
        )}
        {dragOverCount ? (
          <CloudUploadIcon
            sx={{
              position: "absolute",
              width: "60%",
              height: "60%",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 1,
              color: theme.palette.primary.light,
            }}
          />
        ) : null}
        <Avatar
          className="avatar"
          src={
            imgPreview
              ? URL.createObjectURL(imgPreview)
              : `${BASE_URL}/${photo}`
          }
        />
        <CameraEnhanceIcon
          className="camera-icon"
          fontSize="large"
          color="primary"
        />
        <StyledLabel>
          <VisuallyHiddenInput
            id={name}
            onChange={(event) => {
              if (event.target.files) {
                helpers.setValue(event.target.files[0])
              }
            }}
            accept={accept || ""}
            disabled={disabled}
            type="file"
          />
        </StyledLabel>
      </StyledInputBox>
      {(helperText || errorText) && (
        <FormHelperText
          sx={{
            textAlign: "center",
            fontSize: "1rem",
            color: errorText ? "error.main" : "text.primary",
          }}
        >
          {t(errorText || helperText)}
        </FormHelperText>
      )}
    </>
  )
}

export default FileInputFormik
const StyledLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  cursor: pointer;
`
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: "100%",
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
  whiteSpace: "nowrap",
  width: "100%",
  zIndex: 100,
})

const StyledInputBox = styled(Box)(({ theme }) => ({
  position: "relative",
  border: `3px solid ${theme.palette.primary.main}`,
  borderRadius: "50%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  ".camera-icon": {
    position: "absolute",
    right: 0,
    top: "70%",
    background: theme.palette.grey[50],
    borderRadius: "50%",
    width: "46px",
    height: "46px",
    padding: 3,
    border: `2px solid ${theme.palette.primary.main}`,
    transition: "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
  ".avatar": {
    width: "200px",
    height: "200px",
    backgroundColor: theme.palette.grey[100],
    transition: "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
  transition:
    "border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  "&:hover": {
    border: `3px solid ${theme.palette.primary.dark}`,
    cursor: "pointer",

    ".camera-icon": {
      background: theme.palette.grey[200],
      transition: "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },
    ".avatar": {
      background: theme.palette.grey[200],
      transition: "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },
  },

  "&.is-drag-over": {
    "&:not(:has(:disabled))": {
      outlineColor: theme.palette.primary.main,
      ".avatar": {
        background: theme.palette.grey[200],
        transition: "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      },
      ".camera-icon": {
        background: theme.palette.grey[200],
        transition: "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      },
    },
  },
}))
