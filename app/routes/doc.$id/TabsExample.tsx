import { Box, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}
export interface Tab {
  label: string
  index: number
  content: React.ReactNode
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function TabsExample({ tabs }: { tabs: Tab[] }) {
  const [value, setValue] = useState(2)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="scrollable" scrollButtons="auto">
          {tabs.map((tab) => (
            <Tab key={tab.index} label={tab.label} {...a11yProps(tab.index)} />
          ))}
        </Tabs>
      </Box>

      {tabs.map((tab) => (
        <CustomTabPanel key={tab.index} value={value} index={tab.index}>
          {tab.content}
        </CustomTabPanel>
      ))}
    </>
  )
}
