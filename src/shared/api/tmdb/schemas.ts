import { z } from 'zod'

export const movieSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable(),
  vote_average: z.number(),
  backdrop_path: z.string().nullable(),
})

export const moviesResponseSchema = z.object({
  page: z.number(),
  results: z.array(movieSchema),
  total_pages: z.number(),
  total_results: z.number(),
})

export const movieDetailsSchema = z.object({
  backdrop_path: z.string().nullable(),
  budget: z.number(),
  genres: z.array(z.object({ id: z.number(), name: z.string() })),
  id: z.number(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  release_date: z.string(),
  revenue: z.number(),
  runtime: z.number(),
  status: z.string(),
  tagline: z.string(),
  title: z.string(),
  vote_average: z.number(),
})

export const movieCastSchema = z.object({
  name: z.string(),
  character: z.string(),
  profile_path: z.string().nullable(),
  id: z.number(),
})

export const movieCreditsSchema = z.object({
  cast: z.array(movieCastSchema),
})

export const movieGenresSchema = z.object({
  genres: z.array(z.object({ id: z.number(), name: z.string() })),
})
