import { LoaderFunction } from '@remix-run/node'
import { getUserData } from '~/utils/session.server'

export const loader: LoaderFunction = async ({ request }) => {
  const userData = await getUserData(request)
  return new Response(JSON.stringify(userData), {
    headers: { 'Content-Type': 'application/json' },
  })
}
