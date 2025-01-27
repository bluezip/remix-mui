import { materialCells, materialRenderers } from '@jsonforms/material-renderers'
import { JsonForms } from '@jsonforms/react'
import * as Icons from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { LoaderFunctionArgs } from '@remix-run/server-runtime'
import { useState } from 'react'
import Layout from '~/components/layouts/Layouts'
import DocxExample from './DocxExample'
import MarkdownExample from './MarkdownExample'
import type { Tab } from './TabsExample'
import TabsExample from './TabsExample'
import docxImage from './docx.jpg'

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

const markdown = ` 
# ตัวอย่าง นี่คือตัวอย่างการใช้ Markdown ใน React 
  - รายการแบบ 1 
  - รายการแบบ 2 
  - รายการแบบ 3
`

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return json({
    id: params.id,
  })
}

export default function TemporaryDrawer() {
  const { id } = useLoaderData<typeof loader>()
  const [data, setData] = useState<object>(initialData)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked)
  }

  const tabs: Tab[] = [
    {
      label: 'ตัวอย่าง',
      index: 0,
      content: (
        <>
          <DocxExample docxImages={[docxImage, docxImage]} />
        </>
      ),
    },
    { label: 'คู่มือ', index: 1, content: <MarkdownExample markdown={markdown} /> },
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
    { label: 'ล่าสุด', index: 4, content: 'Recent' },
    { label: 'Share', index: 5, content: 'Share' },
  ]

  return (
    <div>
      <Layout>
        <Typography variant="h3">
          <Button onClick={handleBookmarkClick} style={{ cursor: 'pointer' }} variant="text">
            {isBookmarked ? <Icons.Bookmark /> : <Icons.BookmarkBorder />}
          </Button>
          สร้างเอกสาร {id}
        </Typography>
        <TabsExample tabs={tabs} />
      </Layout>
    </div>
  )
}
