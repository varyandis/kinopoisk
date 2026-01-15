import type { Movie } from '@/entities/movie'
import { MovieCard } from '@/entities/movie/ui/MovieCard'
import { useFavorites } from '@/features/favorites'
import s from './SimilarMovies.module.css'
import { MovieCardSkeleton } from '@/entities/movie/ui/MovieCardSkeleton/MovieCardSkeleton'
import Title from 'antd/es/typography/Title'

type Props = {
  movies?: Movie[]
  isLoading?: boolean
  error?: unknown
}

export const SimilarMovies = ({ movies, isLoading, error }: Props) => {
  const { isFavorite, onToggleFavorite } = useFavorites()

  if (error) return <div>Error</div>
  
  if (!movies?.length) return <div>No similar movies</div>

  const COUNT_MOVIES = 6

  if (isLoading) {
    return (
      <div>
        <div className={s.movies}>
          {Array.from({ length: COUNT_MOVIES }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={s.container}>
      <div className={s.description}>
        <Title level={3} className={s.categoryTitle}>
          {'Similar movies'}
        </Title>
      </div>
      <div className={s.movies}>
        {movies?.slice(0, COUNT_MOVIES).map((movie) => (
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
