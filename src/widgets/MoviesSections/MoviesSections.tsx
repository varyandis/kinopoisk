import { MovieCard } from '@/entities/movie/ui/MovieCard'
import { useGetMoviesQuery, type MovieCategoryType } from '@/shared/api/tmdb/tmdbApi'
import { Button } from 'antd'
import s from './MoviesSections.module.css'
import { MovieCardSkeleton } from '@/entities/movie/ui/MovieCardSkeleton/MovieCardSkeleton'
import { Link } from 'react-router'

const COUNT_MOVIES = 6

type Props = {
  category: MovieCategoryType
  title: string
  buttonLabel: string
}

export const MoviesSections = ({ category, title, buttonLabel }: Props) => {
  const { data, isLoading, error } = useGetMoviesQuery({ category: category, page: 1 })

  const onToggleFavorite = (movieId: number) => {
    // Implement favorite toggle logic here
  }

  if (error) {
    return <div>Error loading movies.</div>
  }

  if (isLoading) {
    return (
      <div>
        <div className={s.description}>
          <span className={s.categoryTitle}>{title}</span>
          <Button>{buttonLabel}</Button>
        </div>
        <div className={s.movies}>
          {Array.from({ length: COUNT_MOVIES }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className={s.description}>
        <span className={s.categoryTitle}>{title}</span>
        <Link to={`/categories/${category}`}>
          <Button type="default">{buttonLabel}</Button>
        </Link>
      </div>
      <div className={s.movies}>
        {data?.results.slice(0, COUNT_MOVIES).map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={false}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  )
}
