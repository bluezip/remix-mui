import { LoaderFunction } from '@remix-run/node'
import { getUserData } from '~/utils/session.server'

export const loader: LoaderFunction = async ({ request }) => {
  const userData = await getUserData(request)
  if (!userData) return new Response(null, { status: 401 })
  return new Response(JSON.stringify(userData), {
    headers: { 'Content-Type': 'application/json' },
  })
}
