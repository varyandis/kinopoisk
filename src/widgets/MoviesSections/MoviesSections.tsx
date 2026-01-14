import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { MovieCard } from '@/entities/movie/ui/MovieCard'
import { MovieCardSkeleton } from '@/entities/movie/ui/MovieCardSkeleton/MovieCardSkeleton'
import { favoriteActions, type FavoriteMovie } from '@/features/favorites/model'
import { useGetMoviesQuery, type MovieCategoryType } from '@/shared/api/tmdb/tmdbApi'
import { Button } from 'antd'
import { Link } from 'react-router'
import s from './MoviesSections.module.css'
import type { Movie } from '@/entities/movie'

const COUNT_MOVIES = 6

type Props = {
  category: MovieCategoryType
  title: string
  buttonLabel: string
}

export const MoviesSections = ({ category, title, buttonLabel }: Props) => {
  const { data, isLoading, error } = useGetMoviesQuery({ category: category, page: 1 })
  const dispatch = useAppDispatch()
  const favorites = useAppSelector((state) => state.favorites.items)

  const onToggleFavorite = (movie: Movie) => {
    const favoriteMovie: FavoriteMovie = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
    }

    dispatch(favoriteActions.toggleFavoriteMovie(favoriteMovie))
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
            isFavorite={favorites.some((fav) => fav.id === movie.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  )
}
