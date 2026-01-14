import type { Movie } from '@/entities/movie'
import { MovieCard } from '@/entities/movie/ui/MovieCard'
import { MovieCardSkeleton } from '@/entities/movie/ui/MovieCardSkeleton/MovieCardSkeleton'
import { useFavorites } from '@/features/favorites'
import s from './Results.module.css'

type Props = {
  movies: Movie[] | undefined
  isLoading: boolean | undefined
  error?: unknown
  title: string | undefined
}
export const Results = ({ movies, isLoading, error, title }: Props) => {
  const { isFavorite, onToggleFavorite } = useFavorites()

  if (error) {
    return <div>Error loading movies.</div>
  }

  if (isLoading) {
    return (
      <div>
        <div className={s.description}>
          <span className={s.categoryTitle}>{title}</span>
        </div>
        <div className={s.containerMovies}>
          {Array.from({ length: 20 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={s.container}>
      <span className={s.categoryTitle}>{title}</span>
      <div className={s.containerMovies}>
        {movies?.map((movie) => (
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
