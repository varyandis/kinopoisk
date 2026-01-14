import type { FavoriteMovie } from '@/features/favorites/model/types'

export const getFavorites = (): FavoriteMovie[] => {
  try {
    const favorites = localStorage.getItem('favorites')
    return favorites ? JSON.parse(favorites) : []
  } catch {
    return []
  }
}

export const saveFavorites = (favorites: FavoriteMovie[]): void => {
  localStorage.setItem('favorites', JSON.stringify(favorites))
}
