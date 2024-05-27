import { ButtonProps as MuiButtonProps, Modal as MuiModal } from "@mui/material"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useTheme } from "styled-components"

import { Button } from "@/shared"

import { ModalContentWrapper } from "./Modal.styled"

export interface ModalProps {
  acceptBtnColor?: MuiButtonProps["color"]
  acceptBtnVariant?: MuiButtonProps["variant"]
  disableOpenModalBtn?: boolean

  isOpenModalIconBtn?: boolean
  isSubmitting?: boolean
  onAsyncClick?:
    | (() => Promise<void>)
    | ((e?: React.FormEvent<HTMLFormElement> | undefined) => void)
  openModalBtnColor?: MuiButtonProps["color"]
  openModalBtnFullWidth?: boolean
  openModalBtnText: React.ReactNode
  openModalBtnVariant?: MuiButtonProps["variant"]
  rejectBtnColor?: MuiButtonProps["color"]
  rejectBtnVariant?: MuiButtonProps["variant"]
  text: string
  title: string
}

const Modal = ({
  acceptBtnColor = "primary",
  acceptBtnVariant,
  disableOpenModalBtn = false,
  isOpenModalIconBtn = false,
  isSubmitting,
  onAsyncClick,
  openModalBtnColor = "primary",
  openModalBtnFullWidth = false,
  openModalBtnText,
  openModalBtnVariant,
  rejectBtnColor = "primary",
  rejectBtnVariant,
  text,
  title,
}: ModalProps) => {
  const { t } = useTranslation("buttons")
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const theme = useTheme()
  const asyncFunction = async () => {
    if (onAsyncClick) {
      await onAsyncClick()
    }
    handleClose()
  }

  return (
    <div>
      <Button
        color={openModalBtnColor}
        disabled={disableOpenModalBtn}
        fullWidth={openModalBtnFullWidth}
        sx={{
          ...(isOpenModalIconBtn && { minWidth: 0, borderRadius: "50%" }),
          ...(disableOpenModalBtn && { color: theme.palette.grey[400] }),
        }}
        variant={openModalBtnVariant}
        onClick={handleOpen}
      >
        {openModalBtnText}
      </Button>
      <MuiModal
        aria-describedby="modal-modal-description"
        aria-labelledby="modal-modal-title"
        open={open}
        onClose={handleClose}
      >
        <ModalContentWrapper>
          <Typography component="h2" id="modal-modal-title" variant="h6">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {text}
          </Typography>
          <div
            className="options"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: "1rem",
            }}
          >
            <Button
              color={acceptBtnColor}
              isSubmitting={isSubmitting}
              variant={acceptBtnVariant}
              onAsyncClick={asyncFunction}
            >
              {t("buttons:submit")}
            </Button>
            <Button
              color={rejectBtnColor}
              variant={rejectBtnVariant}
              onClick={handleClose}
            >
              {t("buttons:cancel")}
            </Button>
          </div>
        </ModalContentWrapper>
      </MuiModal>
    </div>
  )
}

export default Modal
