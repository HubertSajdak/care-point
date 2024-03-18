import RefreshIcon from "@mui/icons-material/Refresh"
import SearchIcon from "@mui/icons-material/Search"
import {
  Card,
  IconButton,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
  Tooltip,
} from "@mui/material"
import { useTranslation } from "react-i18next"
import styled from "styled-components"

import { capitalizeFirstChar } from "@/shared/utils/functions"

interface UserSearchProps {
  additionalOptions?: React.ReactNode
  onChangeSearch: (search: string) => void
  onRefreshContent: (() => void) | undefined
}

const Search = ({
  additionalOptions,
  onChangeSearch,
  onRefreshContent,
}: UserSearchProps) => {
  const { t } = useTranslation()
  return (
    <StyledCard>
      <OutlinedInput
        defaultValue=""
        inputProps={{
          type: "search",
        }}
        placeholder={capitalizeFirstChar(t("table:searchBar.placeholder"))}
        startAdornment={
          <InputAdornment position="start">
            <SvgIcon color="primary" fontSize="small">
              <SearchIcon />
            </SvgIcon>
          </InputAdornment>
        }
        sx={{ maxWidth: 500 }}
        fullWidth
        onChange={(e) => onChangeSearch(e.target.value)}
      />
      {additionalOptions && additionalOptions}
      <Tooltip title={t("common:tooltip.refreshData")}>
        <IconButton
          color="primary"
          sx={{
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            display: "grid",
            placeItems: "center",
          }}
          onClick={onRefreshContent}
        >
          <RefreshIcon />
        </IconButton>
      </Tooltip>
    </StyledCard>
  )
}

export default Search

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
  },
  justifyContent: "space-between",
  alignItems: "center",
  gap: theme.spacing(2),
}))
