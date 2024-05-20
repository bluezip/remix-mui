import { Container } from '@mui/material'
import { defer } from '@remix-run/node'
import { Await, useLoaderData } from '@remix-run/react'
import { Suspense } from 'react'

export const loader = async () => {
  return defer({ data: 'Not deferred', deferred: new Promise<string>((resolve) => setTimeout(() => resolve('Deferred'), 3_000)) })
}

export default function DeferTestPage() {
  const { data, deferred } = useLoaderData<typeof loader>()
  return (
    <Container>
      <p>{data}</p>
      <p>
        <Suspense fallback={'Loading...'}>
          <Await resolve={deferred}>{(data) => data}</Await>
        </Suspense>
      </p>
    </Container>
  )
}
