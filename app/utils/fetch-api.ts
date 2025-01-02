import qs from 'qs'
import log from '~/utils/logger'

export function getStrapiURL(path: string = ''): string {
  return process.env.STRAPI_URL + path
}

interface HeadersOptions {
  jwt?: string | null
}
export interface ApiError {
  status: number
  name: string
  message: string
  details?: string // You can adjust this type as needed
}

function createHeaders(options: HeadersOptions): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (options.jwt) {
    headers['Authorization'] = `Bearer ${options.jwt}`
  }

  return headers
}

export async function getApiData(path: string, urlParamsObject: object = {}, jwt?: string | null) {
  const queryString = qs.stringify(urlParamsObject)
  const requestUrl = `${getStrapiURL(`/api${path}`)}${queryString ? `?${queryString}` : ''}`
  log.info(`GET: ${requestUrl}`)
  const response = await fetch(requestUrl, { headers: createHeaders({ jwt }) })
  return await handleFetchResponse(response)
}

export const postApiData = async (path: string, payload: object = {}, jwt?: string | null) => {
  const requestUrl = `${getStrapiURL(`/api${path}`)}`
  log.info(`POST: ${requestUrl}`)
  log.debug(`payload: ${JSON.stringify(payload)}`, payload)

  const response = await fetch(requestUrl, {
    method: 'POST',
    headers: createHeaders({ jwt }),
    body: JSON.stringify({ data: payload }),
  })
  return await handleFetchResponse(response)
}

export async function putApiData(path: string, payload: object = {}, jwt?: string | null) {
  const requestUrl = `${getStrapiURL(`/api${path}`)}`
  log.info(`PUT: ${requestUrl}`)
  log.debug(`payload: ${JSON.stringify(payload)}`, payload)
  const response = await fetch(requestUrl, {
    method: 'PUT',
    headers: createHeaders({ jwt }),
    body: JSON.stringify(payload),
  })
  return await handleFetchResponse(response)
}

export async function deleteApiData(path: string, jwt?: string | null) {
  const requestUrl = `${getStrapiURL(`/api${path}`)}`
  log.info(`DELETE: ${requestUrl}`)
  const response = await fetch(requestUrl, {
    method: 'DELETE',
    headers: createHeaders({ jwt }),
  })
  return await handleFetchResponse(response)
}

export async function handleFetchResponse(response: Response) {
  if (!response.ok) {
    const errorMessage = await response.json()
    log.error(`Request failed: ${JSON.stringify(errorMessage)}`, errorMessage)
    const error = errorMessage.error as ApiError
    throw error
  }
  return await response.json()
}
