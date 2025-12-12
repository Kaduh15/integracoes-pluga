export const httpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
} as const

type HttpMethod = typeof httpMethod
type HttpMethodKey = keyof HttpMethod

export interface HttpRequestOptions {
  method: HttpMethodKey
  headers?: Record<string, string>
  body?: unknown
}

export async function httpRequest<T>(
  url: string,
  options: HttpRequestOptions,
): Promise<T> {
  const response = await fetch(url, {
    method: options.method,
    headers: options.headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json() as Promise<T>
}

export async function httpGet<T>(
  url: string,
  headers?: Record<string, string>,
): Promise<T> {
  return httpRequest<T>(url, {
    method: 'GET',
    headers,
  })
}
