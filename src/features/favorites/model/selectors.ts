import type { RootState } from '@/app/store'

export const selectFavoriteMovies = (state: RootState) => state.favorites.items
export const selectFavoriteMoviesIds = (state: RootState) =>
  state.favorites.items.map((movie) => movie.id)
