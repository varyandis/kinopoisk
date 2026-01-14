import { useAppDispatch, useAppSelector } from '@/app/hooks'
import type { Movie } from '@/entities/movie'
import { toFavoriteMovie } from '@/features/favorites/lib/toFavoriteMovie'
import { favoriteActions } from '@/features/favorites/model'
import { useMemo } from 'react'

export const useFavorites = () => {
  const dispatch = useAppDispatch()
  const favorites = useAppSelector((state) => state.favorites.items)
  const favoriteIds = useMemo(() => new Set(favorites.map((movie) => movie.id)), [favorites])

  const isFavorite = (id: number) => favoriteIds.has(id)

  const onToggleFavorite = (movie: Movie) => {
    dispatch(favoriteActions.toggleFavoriteMovie(toFavoriteMovie(movie)))
  }

  return { isFavorite, onToggleFavorite }
}
