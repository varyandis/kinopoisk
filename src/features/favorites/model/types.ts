import type { Movie } from '@/entities/movie'

export type FavoriteMovie = Pick<Movie, 'id' | 'title' | 'poster_path' | 'vote_average'>
