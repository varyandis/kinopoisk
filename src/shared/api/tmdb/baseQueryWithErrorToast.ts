import { notifyError } from '@/shared/lib/notify/notifyError'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  QueryReturnValue,
} from '@reduxjs/toolkit/query'
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_TMDB_BASE_URL,
  prepareHeaders: (headers) => {
    const token = import.meta.env.VITE_TMDB_READ_TOKEN

    if (!token) {
      notifyError({
        key: 'auth_missing',
        title: 'Auth token is missing',
        description: 'Check VITE_TMDB_READ_TOKEN in .env',
      })
      return headers
    }

    const safeToken = String(token).trim()

    try {
      headers.set('Authorization', `Bearer ${safeToken}`)
    } catch {
      notifyError({
        key: 'auth_invalid',
        title: 'Auth token is invalid',
        description: 'Token contains unsupported characters. Re-copy it from TMDB.',
      })
    }

    return headers
  },
})

const normalizeError = (
  error: FetchBaseQueryError,
): { key: string; title: string; description?: string } => {
  if (error.status === 'FETCH_ERROR') {
    return {
      key: 'network',
      title: 'Network error',
      description: 'Check your internet connection or VPN.',
    }
  }

  if (error.status === 'TIMEOUT_ERROR') {
    return {
      key: 'timeout',
      title: 'Request timeout',
      description: 'The server took too long to respond.',
    }
  }

  if (typeof error.status === 'number') {
    if (error.status === 401 || error.status === 403) {
      return {
        key: 'auth_unauthorized',
        title: 'Authorization error',
        description: 'Invalid or missing TMDB token.',
      }
    }

    if (error.status === 404) {
      return {
        key: 'not_found',
        title: 'Not found',
        description: 'Endpoint not found (404).',
      }
    }

    return {
      key: `http_${error.status}`,
      title: `Request failed (${error.status})`,
    }
  }

  return { key: 'unknown', title: 'Unknown error' }
}

type TMDBBaseQuery = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>

export const baseQueryWithErrorToast: TMDBBaseQuery = async (args, api, extraOptions) => {
  try {
    const result = await rawBaseQuery(args, api, extraOptions)

    if (result.error) {
      const { key, title, description } = normalizeError(result.error)
      notifyError({ key, title, description })
    }

    return result
  } catch (e) {
    notifyError({
      key: 'zod_validation',
      title: 'Response validation failed',
      description: 'API returned unexpected data format.',
    })

    const parsingError: QueryReturnValue<unknown, FetchBaseQueryError, {}> = {
      error: {
        status: 'PARSING_ERROR',
        error: 'Response validation failed',
      } as FetchBaseQueryError,
    }

    return parsingError
  }
}
