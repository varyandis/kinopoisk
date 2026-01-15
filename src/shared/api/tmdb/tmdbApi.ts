import type { MovieCastType, MovieDetailsResponse, MoviesResponse } from '@/shared/api/tmdb/types'
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
    getMovieById: build.query<MovieDetailsResponse, number>({
      query: (movieId: number) => ({
        url: `movie/${movieId}`,
        params: {
          language: 'en-US',
        },
      }),
    }),
    getMovieCredits: build.query<{ cast: MovieCastType[] }, number>({
      query: (movieId: number) => ({
        url: `movie/${movieId}/credits`,
        params: {
          language: 'en-US',
        },
      }),
    }),
    getSimilarMovies: build.query<MoviesResponse, number>({
      query: (movieId: number) => ({
        url: `movie/${movieId}/similar`,
        params: {
          language: 'en-US',
        },
      }),
    }),
    searchMovies: build.query<MoviesResponse, { query: string; page?: number }>({
      query: ({ query, page = 1 }) => ({
        url: 'search/movie',
        params: {
          language: 'en-US',
          query: query,
          page: page,
        },
      }),
    }),
  }),
})

export const {
  useGetMoviesQuery,
  useGetMovieByIdQuery,
  useGetMovieCreditsQuery,
  useGetSimilarMoviesQuery,
  useSearchMoviesQuery,
} = tmdbApi
