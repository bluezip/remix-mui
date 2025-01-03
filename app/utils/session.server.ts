import { createCookieSessionStorage, redirect } from '@remix-run/node'
import log from '~/utils/logger'

const sessionSecret = process.env.SESSION_SECRET || 'e29c09ec-321a-4d62-a124-4a13c0cb5edc'
if (!sessionSecret) throw new Error('Please set the SESSION_SECRET environment variable')

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: 'user-session',
    secrets: [sessionSecret],
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  },
})

export async function createUserSession(redirectTo: string = '/', playload: object) {
  log.debug(`createUserSession: redirectTo: ${redirectTo} ${JSON.stringify(playload)}`, playload)
  const sessionData = await getSession()
  sessionData.set('user-session', playload)
  return await redirect('/', {
    status: 301,
    headers: { 'Set-Cookie': await commitSession(sessionData) },
  })
}

function getUserSession(request: Request) {
  return getSession(request.headers.get('Cookie'))
}

export async function getUserData(request: Request) {
  const session = await getUserSession(request)
  return session.get('user-session')
}

export async function logout(request: Request) {
  const sessionData = await getUserSession(request)
  return redirect('/', {
    headers: { 'Set-Cookie': await destroySession(sessionData) },
  })
}
