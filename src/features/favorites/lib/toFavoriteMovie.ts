import type { Movie } from '@/entities/movie'
import type { FavoriteMovie } from '@/features/favorites/model'

export const toFavoriteMovie = (movie: Movie): FavoriteMovie => ({
  id: movie.id,
  title: movie.title,
  poster_path: movie.poster_path,
  vote_average: movie.vote_average,
  backdrop_path: movie.backdrop_path,
})
