import type { MovieDetailsResponse } from '@/shared/api/tmdb/types'
import { getTmdbImageUrl } from '@/shared/lib/tmdb/image'
import { Button, Tag } from 'antd'
import s from './MovieInfo.module.css'
import Title from 'antd/es/typography/Title'
import { getVoteColor } from '@/shared/lib/tmdb/getVoteColor'
type Props = {
  movie: MovieDetailsResponse
  onClickBack: () => void
}

export const MovieInfo = ({ movie, onClickBack }: Props) => {
  const formatRuntime = (minutes?: number) => {
    if (!minutes) return '—'
    const h = Math.floor(minutes / 60)
    const m = minutes % 60

    return `${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m`
  }

  const colorVote = getVoteColor(movie.vote_average)

  return (
    <div className={s.infoBlock}>
      <div className={s.poster}>
        <img src={getTmdbImageUrl(movie.poster_path, 'w300')} alt={movie.title} />
      </div>
      <div className={s.description}>
        <div className={s.header}>
          <div className={s.info}>
            <Title level={3}>{movie.title}</Title>
            <Button onClick={onClickBack}>Back</Button>
          </div>
          <div className={s.meta}>
            <p>Release year: {movie.release_date.slice(0, 4)}</p>
            <Tag className={s.rating} color={colorVote} variant="solid">
              {movie.vote_average.toFixed(1)}
            </Tag>
            <p>Runtime: {formatRuntime(movie.runtime)}</p>
          </div>
        </div>
        <p>{movie.overview}</p>
        <div className={s.genres}>
          <p>Genres</p>
          <div className={s.divider}>
            {movie.genres.map((genre) => (
              <Tag variant="outlined" color={'purple'} key={genre.id}>
                {genre.name}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
