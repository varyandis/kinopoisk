import { baseQueryWithErrorToast } from '@/shared/api/tmdb/baseQueryWithErrorToast';
import {
  type DiscoverMoviesArgs,
  type MovieCastType,
  type MovieDetailsResponse,
  type MovieGenres,
  type MoviesResponse,
} from '@/shared/api/tmdb/types';
import { createApi } from '@reduxjs/toolkit/query/react';

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
    getMovieGenres: build.query<{ genres: MovieGenres[] }, void>({
      query: () => ({
        url: 'genre/movie/list',
        params: {
          language: 'en-US',
        },
      }),
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
