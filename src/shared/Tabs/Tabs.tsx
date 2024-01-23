import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import MuiTab from "@mui/material/Tab"
import MuiTabs from "@mui/material/Tabs"
import { useTheme } from "@mui/material/styles"
import * as React from "react"
import SwipeableViews from "react-swipeable-views"

interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  }
}
export interface ItemsToRenderProps {
  id: number
  label: string
  render: React.ReactNode
}
export interface FullWidthTabsProps {
  content: ItemsToRenderProps[]
}
export default function Tabs({ content }: FullWidthTabsProps) {
  const theme = useTheme()
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index: number) => {
    setValue(index)
  }

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <AppBar position="static">
        <MuiTabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {content.map((item) => {
            return (
              <MuiTab key={item.id} tabIndex={item.id} label={item.label} />
            )
          })}
        </MuiTabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {content.map((item) => {
          return (
            <TabPanel
              key={item.id}
              value={value}
              index={item.id}
              dir={theme.direction}
            >
              {item.render}
            </TabPanel>
          )
        })}
      </SwipeableViews>
    </Box>
  )
}
