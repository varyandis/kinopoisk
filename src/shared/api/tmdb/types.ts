import type { Movie } from "@/entities/movie"

export type MoviesResponse = {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}
