import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import { useTheme } from "@mui/material/styles"
import MuiTab from "@mui/material/Tab"
import MuiTabs from "@mui/material/Tabs"
import * as React from "react"
import SwipeableViews from "react-swipeable-views"

interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, index, value, ...other } = props

  return (
    <div
      aria-labelledby={`full-width-tab-${index}`}
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      role="tabpanel"
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
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
    <>
      <AppBar position="static">
        <MuiTabs
          aria-label="full width tabs example"
          indicatorColor="secondary"
          textColor="inherit"
          value={value}
          variant="fullWidth"
          onChange={handleChange}
        >
          {content.map((item) => {
            return (
              <MuiTab key={item.id} label={item.label} tabIndex={item.id} />
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
              dir={theme.direction}
              index={item.id}
              key={item.id}
              value={value}
            >
              {item.render}
            </TabPanel>
          )
        })}
      </SwipeableViews>
    </>
  )
}
