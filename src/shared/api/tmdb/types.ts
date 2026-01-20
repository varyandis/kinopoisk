import type { Movie } from '@/entities/movie'

export type MoviesResponse = {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export type MovieDetailsResponse = {
  backdrop_path: string | null
  budget: number
  genres: { id: number; name: string }[]
  id: number
  overview: string
  poster_path: string | null
  release_date: string
  revenue: number
  runtime: number
  status: string
  tagline: string
  title: string
  vote_average: number
}

export type MovieCastType = {
  name: string
  character: string
  profile_path: string | null
  id: number
}

export type MovieGenres = { id: number; name: string }

export type DiscoverMoviesArgs = {
  page: number
  sort: string
  min: number
  max: number
  with_genres?: string
}
