import type { FavoriteMovie } from '@/features/favorites/model/types'

export const getFavorites = (): FavoriteMovie[] => {
  try {
    const favorites = localStorage.getItem('favorites')
    if (!favorites) return []

    const parsed: Partial<FavoriteMovie>[] = JSON.parse(favorites)

    return parsed.map((movie) => ({
      id: movie.id!,
      title: movie.title!,
      poster_path: movie.poster_path ?? null,
      vote_average: movie.vote_average!,
      backdrop_path: movie.backdrop_path ?? null,
    }))
  } catch {
    return []
  }
}
