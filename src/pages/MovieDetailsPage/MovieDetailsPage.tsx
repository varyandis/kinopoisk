import {
  useGetMovieByIdQuery,
  useGetMovieCreditsQuery,
  useGetSimilarMoviesQuery,
} from '@/shared/api/tmdb/tmdbApi'
import { useNavigate, useParams } from 'react-router'

import { MovieInfo } from '@/pages/MovieDetailsPage/ui/MovieInfo/MovieInfo'
import s from './MovieDetailsPage.module.css'
import { MovieCast } from '@/pages/MovieDetailsPage/ui/MovieCast/MovieCast'
import { SimilarMovies } from '@/pages/MovieDetailsPage/ui/SimilarMovies/SimilarMovies'

export const MovieDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const movieId = Number(id)

  const {
    data,
    isLoading: isLoadingMovies,
    error: errorMovies,
  } = useGetMovieByIdQuery(movieId, {
    skip: !id || Number.isNaN(movieId),
  })

  const {
    data: credits,
    isLoading: isLoadingCredits,
    error: errorCredits,
  } = useGetMovieCreditsQuery(movieId, {
    skip: !id || Number.isNaN(movieId),
  })

  const {
    data: similarMovies,
    isLoading: isLoadingSimilarMovies,
    error: errorSimilarMovies,
  } = useGetSimilarMoviesQuery(movieId, {
    skip: !id || Number.isNaN(movieId),
  })

  if (errorMovies) {
    return <div>Error loading movie.</div>
  }

  if (isLoadingMovies) {
    return <div>Loading movie...</div>
  }

  if (!data) {
    return <div>Movie not found.</div>
  }

  const onBack = () => {
    navigate(-1)
  }

  return (
    <div className={s.container}>
      <MovieInfo movie={data} onClickBack={onBack} />
      <MovieCast cast={credits?.cast.slice(0, 6)} isLoading={isLoadingCredits} error={errorCredits} />
      <SimilarMovies movies={similarMovies?.results} isLoading={isLoadingSimilarMovies} error={errorSimilarMovies} />
    </div>
  )
}
