import type { MovieCategoryType } from '@/shared/api/tmdb/tmdbApi'

export type RouteMovieCategories = 'popular' | 'top-rated' | 'upcoming' | 'now-playing'

export const ROUTE_TO_API_MOVIE_CATEGORIES: Record<RouteMovieCategories, MovieCategoryType> = {
  popular: 'popular',
  'top-rated': 'top_rated',
  upcoming: 'upcoming',
  'now-playing': 'now_playing',
}

export const API_TO_ROUTE_MOVIE_CATEGORIES: Record<MovieCategoryType, RouteMovieCategories> = {
  popular: 'popular',
  top_rated: 'top-rated',
  upcoming: 'upcoming',
  now_playing: 'now-playing',
}

export const MOVIE_CATEGORIES_TITLES: Array<{ key: RouteMovieCategories; title: string }> = [
  { key: 'popular', title: 'Popular Movies' },
  { key: 'top-rated', title: 'Top Rated Movies' },
  { key: 'upcoming', title: 'Upcoming Movies' },
  { key: 'now-playing', title: 'Now Playing Movies' },
]
