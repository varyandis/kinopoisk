import { favoriteSlice, getFavorites } from '@/features/favorites/model'
import { tmdbApi } from '@/shared/api/tmdb/tmdbApi'
import { configureStore } from '@reduxjs/toolkit'

const STORAGE_FAVORITES_KEY = 'favorites'
let prev = JSON.stringify(getFavorites())

export const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    [favoriteSlice.name]: favoriteSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbApi.middleware),
})

store.subscribe(() => {
  const next = JSON.stringify(store.getState().favorites.items)
  if (next !== prev) {
    localStorage.setItem(STORAGE_FAVORITES_KEY, next)
    prev = next
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
