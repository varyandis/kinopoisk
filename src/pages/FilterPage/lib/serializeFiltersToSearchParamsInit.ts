import type { filterParamsType } from '@/pages/FilterPage/FilterPage'

export const serializeFiltersToSearchParamsInit = (filters: filterParamsType): URLSearchParams => {
  const { page, min, max, sort, genres } = filters

  const params = new URLSearchParams()

  params.set('page', page.toString())
  params.set('min', min.toString())
  params.set('max', max.toString())
  params.set('sort', sort)
  if (genres.length === 0) return params
  params.set('genres', genres.join(','))

  return params
}
