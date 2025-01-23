import { Generate } from '@jsonforms/core'
import { materialCells, materialRenderers } from '@jsonforms/material-renderers'
import { JsonForms } from '@jsonforms/react'
import { useMemo, useState } from 'react'
import ClientOnly from '~/utils/ClientOnly'
const schema2 = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $ref: '#/definitions/mySchema',
  definitions: {
    mySchema: {
      description: 'My neat object schema',
      type: 'object',
      properties: {
        myString: {
          type: 'string',
          minLength: 5,
        },
        myUnion: {
          type: ['number', 'boolean'],
        },
      },
      additionalProperties: false,
      required: ['myString', 'myUnion'],
    },
  },
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
const schema = Generate.jsonSchema(initialData)

const uiSchema = Generate.uiSchema(schema2.definitions.mySchema)

const Test = () => {
  const [data, setData] = useState<object>(initialData)
  const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data])
  return (
    <>
      <h1>ทดสอบ</h1>
      <ClientOnly>
        <JsonForms
          schema={schema2.definitions.mySchema}
          uischema={uiSchema}
          data={data}
          renderers={materialRenderers}
          cells={materialCells}
          onChange={({ data }) => setData(data)}
        />
      </ClientOnly>
      <div>{stringifiedData}</div>
    </>
  )
}

export default Test
