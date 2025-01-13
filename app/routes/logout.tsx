import type { ActionFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { logout } from '~/utils/session.server'

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method === 'POST') return logout(request)
  return redirect('/')
}

export const loader = () => redirect('/')

export default function Logout() {
  return null
}
