import { materialCells, materialRenderers } from '@jsonforms/material-renderers'
import { JsonForms } from '@jsonforms/react'
import * as Icons from '@mui/icons-material'
import { Box, Button, Tab, Tabs, Typography } from '@mui/material'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { LoaderFunctionArgs } from '@remix-run/server-runtime'
import React, { useState } from 'react'
import Layout from '~/components/layouts/Layouts'

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 1,
    },
    description: {
      title: 'Long Description',
      type: 'string',
    },
    done: {
      type: 'boolean',
    },
    due_date: {
      type: 'string',
      format: 'date',
    },
    rating: {
      type: 'integer',
      maximum: 5,
    },
    recurrence: {
      type: 'string',
      enum: ['Never', 'Daily', 'Weekly', 'Monthly'],
    },
    recurrence_interval: {
      type: 'integer',
    },
    tags: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          color: {
            type: 'string',
          },
        },
      },
    },
  },
  required: ['name', 'due_date'],
}

const uiSchema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      label: 'Completed',
      scope: '#/properties/done',
    },
    {
      type: 'Control',
      scope: '#/properties/name',
    },
    {
      type: 'HorizontalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/due_date',
        },
        {
          type: 'Control',
          scope: '#/properties/rating',
        },
      ],
    },
    {
      type: 'HorizontalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/recurrence',
        },
        {
          type: 'Control',
          scope: '#/properties/recurrence_interval',
          rule: {
            effect: 'HIDE',
            condition: {
              type: 'LEAF',
              scope: '#/properties/recurrence',
              expectedValue: 'Never',
            },
          },
        },
      ],
    },
    {
      type: 'Control',
      scope: '#/properties/description',
      options: {
        multi: true,
      },
    },
    {
      type: 'Control',
      scope: '#/properties/tags',
      options: {
        showSortButtons: true,
        elementLabelProp: 'name',
        detail: {
          type: 'VerticalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/color',
            },
            {
              type: 'Control',
              scope: '#/properties/name',
            },
          ],
        },
      },
    },
  ],
}

const initialData = {
  name: 'Send email to Adrian',
  description: 'Confirm if you have passed the subject\nHereby ...',
  done: true,
  recurrence: 'Daily',
  rating: 3,
  tags: [
    {
      name: 'Important',
      color: 'red',
    },
    {
      name: 'Urgent',
      color: 'orange',
    },
  ],
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return json({
    id: params.id,
  })
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

interface Tab {
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

export default function TemporaryDrawer() {
  const { id } = useLoaderData<typeof loader>()
  const [value, setValue] = useState(2)
  const [data, setData] = useState<object>(initialData)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked)
  }
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const tabs: Tab[] = [
    { label: 'ตัวอย่าง', index: 0, content: 'Item One' },
    { label: 'คู่มือ', index: 1, content: 'Item Two' },
    {
      label: 'เอกสาร',
      index: 2,
      content: (
        <JsonForms
          schema={schema}
          uischema={uiSchema}
          data={data}
          renderers={materialRenderers}
          cells={materialCells}
          onChange={({ data }) => setData(data)}
        />
      ),
    },
    {
      label: 'เพิ่มเติม',
      index: 3,
      content: (
        <JsonForms
          schema={schema}
          uischema={uiSchema}
          data={data}
          renderers={materialRenderers}
          cells={materialCells}
          onChange={({ data }) => setData(data)}
        />
      ),
    },
    { label: 'Share', index: 4, content: 'Share' },
  ]

  return (
    <div>
      <Layout>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h3">
            <Button onClick={handleBookmarkClick} style={{ cursor: 'pointer' }} variant="text">
              {isBookmarked ? <Icons.Bookmark /> : <Icons.BookmarkBorder />}
            </Button>
            สร้างเอกสาร {id}
          </Typography>
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
      </Layout>
    </div>
  )
}
