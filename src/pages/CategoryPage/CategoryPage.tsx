import { useGetMoviesQuery } from '@/shared/api/tmdb/tmdbApi'
import {
  MOVIE_CATEGORIES_TITLES,
  ROUTE_TO_API_MOVIE_CATEGORIES,
  type RouteMovieCategories,
} from '@/shared/config/routes/movieCategories'
import { Results } from '@/widgets/Results'
import { SelectMoviesCategory } from '@/widgets/SelectMoviesCategory'
import { Pagination, type PaginationProps } from 'antd'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import s from './CategoryPage.module.css'

export const CategoryPage = () => {
  const [page, setPage] = useState(1)
  const MAX_RESULTS = 1000
  const PAGES_SIZE = 20

  const category = useParams<{ category: RouteMovieCategories }>().category ?? 'popular'

  useEffect(() => setPage(1), [category])

  const { data, isLoading, error } = useGetMoviesQuery({
    category: ROUTE_TO_API_MOVIE_CATEGORIES[category],
    page: page,
  })

  const paginationChange: PaginationProps['onChange'] = (pageNumber) => {
    setPage(pageNumber)
  }

  return (
    <>
      <SelectMoviesCategory />
      <Results
        movies={data?.results}
        isLoading={isLoading}
        error={error}
        title={MOVIE_CATEGORIES_TITLES.find(({ key }) => key === category)?.title}
      />
      <Pagination
        showQuickJumper
        current={page}
        total={MAX_RESULTS}
        pageSize={PAGES_SIZE}
        onChange={paginationChange}
        align="center"
        className={s.pagination}
        showSizeChanger={false}
      />
    </>
  )
}
