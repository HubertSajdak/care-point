import { ButtonProps as MuiButtonProps, Modal as MuiModal } from "@mui/material"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import styled, { useTheme } from "styled-components"

import { Button } from "@/shared"

export interface ModalProps {
  /**
   * Change color of modal's open button.
   *
   * @example
   * "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | "string"
   */
  acceptBtnColor?: MuiButtonProps["color"]
  /**
   * Change variant of modal's accept button.
   *
   * @example
   * "text" | "outlined" | "contained" | undefined
   */
  acceptBtnVariant?: MuiButtonProps["variant"]
  /**
   * Make open modal button disabled.
   */
  disableOpenModalBtn?: boolean
  /**
   * If true, open modal button will look like Material UI's Icon Button
   */
  isOpenModalIconBtn?: boolean
  isSubmitting?: boolean
  /**
   * Pass a function that accept button will trigger.
   */
  onAsyncClick?:
    | (() => Promise<void>)
    | ((e?: React.FormEvent<HTMLFormElement> | undefined) => void)
  /**
   * Change color of modal's open button.
   *
   * @example
   * "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | "string"
   */
  openModalBtnColor?: MuiButtonProps["color"]
  /**
   * Make open button take full container's width.
   */
  openModalBtnFullWidth?: boolean
  /**
   * Renders button with text/icon inside that opens up modal.
   */
  openModalBtnText: React.ReactNode
  /**
   * Change variant of modal's open button.
   *
   * @example
   * "text" | "outlined" | "contained" | undefined
   */
  openModalBtnVariant?: MuiButtonProps["variant"]
  /**
   * Change color of modal's open button.
   *
   * @example
   * "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | "string"
   */
  rejectBtnColor?: MuiButtonProps["color"]
  /**
   * Change variant of modal's reject button.
   *
   * @example
   * "text" | "outlined" | "contained" | undefined
   */
  rejectBtnVariant?: MuiButtonProps["variant"]
  /**
   * Modal's text.
   */
  text: string
  /**
   * Modal's title.
   */
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

export const ModalContentWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400;
  background-color: ${({ theme }) => theme.palette.background.paper};
  box-shadow: 24;
  padding: 1rem;
  border-top: 0.5rem solid;
  border-color: ${({ theme }) => theme.palette.primary.main};
  border-radius: 8px 8px 0px 0px;
`
