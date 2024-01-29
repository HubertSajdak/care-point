import RefreshIcon from "@mui/icons-material/Refresh"
import SearchIcon from "@mui/icons-material/Search"
import {
  Card,
  IconButton,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
} from "@mui/material"
import { useTranslation } from "react-i18next"

import { capitalizeFirstChar } from "@/utils/functions"
interface UserSearchProps {
  onChangeSearch: (search: string) => void
  onRefreshContent: (() => void) | undefined
}
const UserSearch = ({ onChangeSearch, onRefreshContent }: UserSearchProps) => {
  const { t } = useTranslation()
  return (
    <Card
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
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
    </Card>
  )
}

export default UserSearch
