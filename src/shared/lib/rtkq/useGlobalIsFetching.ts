import { useSelector } from 'react-redux'
import { tmdbApi } from '@/shared/api/tmdb/tmdbApi'
import type { RootState } from '@/app/store'

export const useGlobalIsFetching = () => {
  return useSelector((state: RootState) => {
    const queries = state[tmdbApi.reducerPath].queries
    return Object.values(queries).some((q) => q?.status === 'pending')
  })
}
