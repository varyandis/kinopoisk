import { parseFiltersFromSearchParams } from '@/pages/FilterPage/lib/parseFiltersFromSearchParams'
import { sortedList } from '@/pages/FilterPage/model/sortedList'
import { FilterAndSort } from '@/pages/FilterPage/ui/FilterAndSort/FilterAndSort'
import { useDiscoverMoviesQuery, useGetMovieGenresQuery } from '@/shared/api/tmdb/tmdbApi'
import { Results } from '@/widgets/Results'
import { Pagination } from 'antd'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router'
import s from './FilterPage.module.css'

export type filterParamsType = {
  page: number
  min: number
  max: number
  sort: string
  genres: number[]
}

export const FilterPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const filterParams = parseFiltersFromSearchParams(searchParams)
  const optionsSort = sortedList
  const { data } = useGetMovieGenresQuery()
  const with_genres = filterParams.genres.length ? filterParams.genres.join(',') : undefined
  const discoverArgs = {
    page: filterParams.page,
    sort: filterParams.sort,
    min: filterParams.min,
    max: filterParams.max,
    with_genres,
  }
  const {
    data: movies,
    isLoading: isLoadingDiscover,
    error: errorDiscover,
    isFetching: isFetchingDiscover,
  } = useDiscoverMoviesQuery(discoverArgs)

  useEffect(() => {
    setSearchParams((prev) => {
      if (prev.toString() !== '') {
        return prev
      }

      const next = new URLSearchParams(prev)
      next.set('page', '1')
      next.set('sort', 'popularity.desc')
      next.set('min', '0')
      next.set('max', '10')

      return next
    })
  }, [setSearchParams])

  const setSort = (sort: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('sort', sort)
      next.set('page', '1')
      return next
    })
  }

  const setPage = (page: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('page', page.toString())
      return next
    })
  }

  const setGenres = (genres: number[]) => {
    const sorted = [...genres].sort((a, b) => a - b)
    const uniqueSorted = Array.from(new Set(sorted))

    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (uniqueSorted.length === 0) {
        next.delete('genres')
        return next
      }
      next.set('genres', uniqueSorted.join(','))
      next.set('page', '1')
      return next
    })
  }

  const setRange = (min: number, max: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('min', min.toString())
      next.set('max', max.toString())
      next.set('page', '1')
      return next
    })
  }

  return (
    <div className={s.container}>
      <FilterAndSort
        options={optionsSort}
        setSort={setSort}
        value={filterParams.sort}
        genres={data?.genres || []}
        setGenres={setGenres}
        selectedGenres={filterParams.genres}
        min={filterParams.min}
        max={filterParams.max}
        setRange={setRange}
        resetFilters={() => setSearchParams({})}
      />
      <div className={s.divider}>
        <Results
          movies={movies?.results}
          isLoading={isLoadingDiscover || isFetchingDiscover}
          error={errorDiscover}
          title={'Discover Movies'}
        />
        <Pagination
          showQuickJumper
          showSizeChanger={false}
          current={filterParams.page}
          onChange={setPage}
          total={movies?.total_results}
          pageSize={20}
          align="center"
        />
      </div>
    </div>
  )
}
