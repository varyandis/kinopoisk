import { MovieCard } from '@/entities/movie/ui/MovieCard'
import { useGetMoviesQuery } from '@/shared/api/tmdb/tmdbApi'
import { Button } from 'antd'
import s from './MoviesSections.module.css'
import { MovieCardSkeleton } from '@/entities/movie/ui/MovieCardSkeleton/MovieCardSkeleton'

const COUNT_MOVIES = 6

export const MoviesSections = () => {
  const { data, isLoading, error } = useGetMoviesQuery({ category: 'popular', page: 1 })

  if (error) {
    return <div>Error loading movies.</div>
  }

  if (isLoading) {
    return (
      <div>
        <div className={s.description}>
          <span className={s.categoryTitle}>Popular Movies</span>
          <Button>See All</Button>
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
        <span className={s.categoryTitle}>Popular Movies</span>
        <Button>See All</Button>
      </div>
      <div className={s.movies}>
        {data?.results.slice(0, COUNT_MOVIES).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}
