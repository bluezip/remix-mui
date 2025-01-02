import { Button, Card, CardActions, CardContent, Container, Typography } from '@mui/material'
import { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction, json } from '@remix-run/node'
import { useFetcher, useLoaderData, useNavigate } from '@remix-run/react'
import { SyntheticEvent, useEffect } from 'react'
import Markdown from 'react-markdown'
import { ApiError, getApiData, postApiData } from '~/utils/fetch-api'
import log from '~/utils/logger'
import { createUserSession } from '~/utils/session.server'
import type { StrapiErrorResponse } from '~/utils/types'

export const action = async ({ request }: ActionFunctionArgs) => {
  log.info(`${request.method}: ${request.url}`)
  if (request.method === 'POST') {
    try {
      const formData = await request.formData()
      const payload = JSON.parse(formData.get('payload') as string)
      const policy = JSON.parse(formData.get('policy') as string)
      const redirect = formData.get('redirect') as string

      const acceptPolicy = await getApiData('/accept-policies', { filters: { policy: policy.id, user: payload.user.id } }, payload.jwt)

      if (acceptPolicy.data.length === 0) {
        await postApiData('/accept-policies', { policy: policy.id, user: payload.user.id }, payload.jwt)
      }

      const response = (await createUserSession(redirect, payload)) as StrapiErrorResponse
      if (response.error) {
        log.error(response.error)
        return json({ message: response.error.message })
      }
      return response
    } catch (error) {
      log.error(error)
      return json({ error: error as ApiError }, { status: (error as ApiError).status || 500 })
    }
  }
  return json({ data: 'GET' })
}

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  try {
    const provider = params.provider
    log.debug(`Provider: ${provider}`)
    const access_token = new URL(request.url).searchParams.get('access_token') as string

    const authInfo = await getApiData(`/auth/${provider}/callback`, { access_token })
    const lastPolicy = await getApiData(`/policies`, { sort: 'id:desc', pagination: { pageSize: 1 } })
    const acceptPolicy = await getApiData(
      '/accept-policies',
      { filters: { policy: lastPolicy.data[0].id, user: authInfo.user.id } },
      authInfo.jwt,
    )

    const payload = { jwt: authInfo.jwt, user: authInfo.user }
    const isAccessPolicy = acceptPolicy.data.length > 0
    return json({ payload, policy: lastPolicy.data[0], isAccessPolicy, redirect: '/' })
  } catch (error) {
    log.error(error)
    return json({ error: error as ApiError }, { status: (error as ApiError).status || 500 })
  }
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: (data as any).policy.attributes.title }]
}

export function HydrateFallback() {
  return <p>Loading...</p>
}

export default function Callback() {
  const fetcher = useFetcher()
  const navigate = useNavigate()
  const { payload, policy, isAccessPolicy, redirect } = useLoaderData<typeof loader>() as {
    isAccessPolicy: boolean
    payload: { jwt: string; picture: string; user: { id: number; username: string; email: string } }
    policy: { id: number; attributes: { contents: string; title: string } }
    redirect: string
  }

  const login = (e: SyntheticEvent) => {
    e.preventDefault()
    fetcher.submit({ payload: JSON.stringify(payload), policy: JSON.stringify(policy), redirect }, { method: 'POST' })
  }

  const notAcceptPolicy = (e: SyntheticEvent) => {
    e.preventDefault()
    navigate('/')
  }

  useEffect(() => {
    if (isAccessPolicy) {
      setTimeout(() => {
        fetcher.submit({ payload: JSON.stringify(payload), policy: JSON.stringify(policy), redirect: '/' }, { method: 'POST' })
      }, 1000)
    }
  }, [fetcher.data])

  return (
    <>
      {!isAccessPolicy && (
        <Container sx={{ marginTop: '1em' }}>
          <Card>
            <Typography variant="h6" sx={{ padding: '1em' }}>
              ยินดีต้อนรับ คุณ {payload.user.username} ({payload.user.email})
            </Typography>
            <CardContent sx={{ maxHeight: '90vh', overflow: 'auto' }}>
              <Markdown>{policy.attributes.contents}</Markdown>
            </CardContent>
            <CardActions sx={{ justifyContent: 'right' }}>
              <Button size="small" color="success" onClick={login} variant="outlined">
                ยอมรับ
              </Button>
              <Button size="small" color="warning" variant="outlined" onClick={notAcceptPolicy}>
                ไม่ยอมรับ
              </Button>
            </CardActions>
          </Card>
        </Container>
      )}
      {isAccessPolicy && <div>Loading...</div>}
    </>
  )
}
