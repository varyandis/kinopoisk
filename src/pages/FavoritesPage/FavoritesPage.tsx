import { useAppSelector } from '@/app/hooks'
import { selectFavoriteMovies } from '@/features/favorites/model/selectors'
import { Results } from '@/widgets/Results'
import { Pagination, type PaginationProps } from 'antd'
import Title from 'antd/es/typography/Title'
import { useEffect, useState } from 'react'
import s from './FavoritesPage.module.css'

export const FavoritesPage = () => {
  const [page, setPage] = useState(1)
  const favoriteMovies = useAppSelector(selectFavoriteMovies)
  const PAGE_SIZE = 20
  const start = (page - 1) * PAGE_SIZE
  const currentItems = favoriteMovies.slice(start, start + PAGE_SIZE)
  const maxPage = Math.max(1, Math.ceil(favoriteMovies.length / PAGE_SIZE))

  useEffect(() => {
    if (page > maxPage) return setPage(maxPage)
  }, [page, maxPage])

  const paginationChange: PaginationProps['onChange'] = (pageNumber) => {
    setPage(pageNumber)
  }

  if (!favoriteMovies.length)
    return (
      <Title level={3} className={s.title}>
        No favorite movies yet
      </Title>
    )

  return (
    <>
      <Results movies={currentItems} isLoading={false} title={'Favorites Movies'} />
      <Pagination
        showQuickJumper
        current={page}
        total={favoriteMovies.length}
        pageSize={PAGE_SIZE}
        onChange={paginationChange}
        align="center"
        className={s.pagination}
      />
    </>
  )
}
