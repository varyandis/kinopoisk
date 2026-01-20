import { baseQueryWithErrorToast } from '@/shared/api/tmdb/baseQueryWithErrorToast'
import { parseWithZod } from '@/shared/api/tmdb/parseWithZod'
import {
  movieCreditsSchema,
  movieDetailsSchema,
  movieGenresSchema,
  moviesResponseSchema,
} from '@/shared/api/tmdb/schemas'
import {
  type DiscoverMoviesArgs,
  type MovieCastType,
  type MovieDetailsResponse,
  type MovieGenres,
  type MoviesResponse,
} from '@/shared/api/tmdb/types'
import { createApi } from '@reduxjs/toolkit/query/react'

export type MovieCategoryType = 'popular' | 'top_rated' | 'upcoming' | 'now_playing'

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: baseQueryWithErrorToast,
  endpoints: (build) => ({
    getMovies: build.query<MoviesResponse, { category: MovieCategoryType; page?: number }>({
      query: ({ category, page = 1 }) => ({
        url: `movie/${category}`,
        params: {
          language: 'en-US',
          page: page,
        },
      }),
      transformResponse: (raw: unknown) =>
        parseWithZod(moviesResponseSchema, raw, 'moviesResponse'),
    }),
    getMovieById: build.query<MovieDetailsResponse, number>({
      query: (movieId: number) => ({
        url: `movie/${movieId}`,
        params: {
          language: 'en-US',
        },
      }),
      transformResponse: (raw: unknown) => parseWithZod(movieDetailsSchema, raw, 'movieDetails'),
    }),
    getMovieCredits: build.query<{ cast: MovieCastType[] }, number>({
      query: (movieId: number) => ({
        url: `movie/${movieId}/credits`,
        params: {
          language: 'en-US',
        },
      }),
      transformResponse: (raw: unknown) => parseWithZod(movieCreditsSchema, raw, 'movieCredits'),
    }),
    getSimilarMovies: build.query<MoviesResponse, number>({
      query: (movieId: number) => ({
        url: `movie/${movieId}/similar`,
        params: {
          language: 'en-US',
        },
      }),
      transformResponse: (raw: unknown) =>
        parseWithZod(moviesResponseSchema, raw, 'moviesResponse'),
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
      transformResponse: (raw: unknown) =>
        parseWithZod(moviesResponseSchema, raw, 'moviesResponse'),
    }),
    getMovieGenres: build.query<{ genres: MovieGenres[] }, void>({
      query: () => ({
        url: 'genre/movie/list',
        params: {
          language: 'en-US',
        },
      }),
      transformResponse: (raw: unknown) => parseWithZod(movieGenresSchema, raw, 'movieGenres'),
    }),
    discoverMovies: build.query<MoviesResponse, DiscoverMoviesArgs>({
      query: ({ page, sort, min, max, with_genres }) => ({
        url: 'discover/movie',
        params: {
          language: 'en-US',
          page: page,
          sort_by: sort,
          'vote_average.gte': min,
          'vote_average.lte': max,
          ...(with_genres ? { with_genres } : {}),
        },
      }),
      transformResponse: (raw: unknown) =>
        parseWithZod(moviesResponseSchema, raw, 'moviesResponse'),
    }),
  }),
})

export const {
  useGetMoviesQuery,
  useGetMovieByIdQuery,
  useGetMovieCreditsQuery,
  useGetSimilarMoviesQuery,
  useSearchMoviesQuery,
  useGetMovieGenresQuery,
  useDiscoverMoviesQuery,
} = tmdbApi
