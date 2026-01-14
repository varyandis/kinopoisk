import { MovieCard } from '@/entities/movie/ui/MovieCard'
import { MovieCardSkeleton } from '@/entities/movie/ui/MovieCardSkeleton/MovieCardSkeleton'
import { useFavorites } from '@/features/favorites'
import { useGetMoviesQuery, type MovieCategoryType } from '@/shared/api/tmdb/tmdbApi'
import { API_TO_ROUTE_MOVIE_CATEGORIES } from '@/shared/config/routes/movieCategories'
import { Button } from 'antd'
import { Link } from 'react-router'
import s from './MoviesSections.module.css'

const COUNT_MOVIES = 6

type Props = {
  category: MovieCategoryType
  title: string
  buttonLabel: string
}

export const MoviesSections = ({ category, title, buttonLabel }: Props) => {
  const { data, isLoading, error } = useGetMoviesQuery({ category: category, page: 1 })

  const { isFavorite, onToggleFavorite } = useFavorites()

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
        <Link to={`/categories/${API_TO_ROUTE_MOVIE_CATEGORIES[category]}`}>
          <Button type="default">{buttonLabel}</Button>
        </Link>
      </div>
      <div className={s.movies}>
        {data?.results.slice(0, COUNT_MOVIES).map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={isFavorite(movie.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  )
}
