import type { MoviesResponse } from '@/shared/api/tmdb/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type MovieCategoryType = 'popular' | 'top_rated' | 'upcoming' | 'now_playing'

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_TMDB_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`)
      return headers
    },
  }),
  endpoints: (build) => ({
    getMovies: build.query<MoviesResponse, { category: MovieCategoryType; page?: number }>({
      query: ({ category, page = 1 }) => ({
        url: `movie/${category}`,
        params: {
          language: 'en-US',
          page: page,
        },
      }),
    }),
  }),
})

export const { useGetMoviesQuery } = tmdbApi
