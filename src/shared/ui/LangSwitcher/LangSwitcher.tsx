import TranslateIcon from "@mui/icons-material/Translate"
import { IconButton, Menu, MenuItem } from "@mui/material"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import styled, { css } from "styled-components"

import { availableLangs } from "@/i18n/availableLangs"

import FlagWrapper from "./LangWrapper"

const Wrapper = styled.div<{ $variant: "link" | "standalone" }>`
  position: relative;
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  width: 100%;
  max-width: ${({ theme }) => theme.spacing(25)};
  ${({ $variant }) =>
    $variant === "link"
      ? css`
          #long-button {
            width: 100%;
            border-radius: 0;
            gap: 1;
            padding: ${({ theme }) => theme.spacing(1)}
              ${({ theme }) => theme.spacing(2)};
            text-align: center;
          }
        `
      : css`
          #long-button {
            position: fixed;
            top: ${({ theme }) => theme.spacing(2)};
            right: ${({ theme }) => theme.spacing(2)};
            padding: ${({ theme }) => theme.spacing(1)};
            box-shadow: ${({ theme }) => theme.shadows[2]};
            background: ${({ theme }) => theme.palette.common.white};
            z-index: 10;
          }
        `}
`

const LangSwitcher = ({ $variant }: { $variant: "link" | "standalone" }) => {
  const { i18n } = useTranslation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Wrapper $variant={$variant}>
      <IconButton
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        aria-label="more"
        id="long-button"
        sx={{ textAlign: "center" }}
        onClick={handleClick}
      >
        <TranslateIcon color="primary" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        open={open}
        onClose={handleClose}
      >
        {availableLangs.map((lang) => (
          <MenuItem
            key={lang.lang}
            sx={{ padding: "0", width: "100%" }}
            onClick={handleClose}
          >
            <FlagWrapper
              alt={lang.lang}
              src={lang.iconUrl}
              onClick={() => i18n.changeLanguage(lang.lang)}
            />
          </MenuItem>
        ))}
      </Menu>
    </Wrapper>
  )
}

export default LangSwitcher
