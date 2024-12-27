import { materialRenderers } from '@jsonforms/material-renderers'
import { JsonForms } from '@jsonforms/react'
import { useMemo, useState } from 'react'
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
  ],
}

const initialData = {
  name: 'Send email to Adrian',
  description: 'Confirm if you have passed the subject\nHereby ...',
  done: true,
  recurrence: 'Daily',
  rating: 3,
}

const Test = () => {
  const [data, setData] = useState<object>(initialData)
  const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data])
  return (
    <>
      <h1>ทดสอบ</h1>
      <JsonForms schema={schema} uischema={uiSchema} data={data} renderers={materialRenderers} onChange={({ data }) => setData(data)} />
      <div>{stringifiedData}</div>
    </>
  )
}

export default Test
