import { type FavoriteMovie } from '@/features/favorites/model'
import { getFavorites } from '@/features/favorites/model/storage'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type FavoriteMoviesState = {
  items: FavoriteMovie[]
}

const initialState: FavoriteMoviesState = {
  items: getFavorites(),
}

export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: initialState,
  reducers: {
    toggleFavoriteMovie: (state, action: PayloadAction<FavoriteMovie>) => {
      const movie = action.payload
      if (state.items.some((fav) => fav.id === movie.id)) {
        state.items = state.items.filter((fav) => fav.id !== movie.id)
      } else {
        state.items.push(movie)
      }
    },
  },
})

export const { actions: favoriteActions } = favoriteSlice
