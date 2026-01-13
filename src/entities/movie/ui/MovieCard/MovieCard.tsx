import type { Movie } from '@/entities/movie'
import { getTmdbImageUrl } from '@/shared/lib/tmdb/image'
import { Card } from 'antd'
import s from './MovieCard.module.css'
import { Link } from 'react-router'

type Props = {
  movie: Movie
}

const { Meta } = Card

export const MovieCard = ({ movie }: Props) => {
  return (
    <Link to={`/movies/${movie.id}`} className={s.link}>
      <Card
        className={s.card}
        size="default"
        cover={
          <img
            alt={movie.title}
            src={getTmdbImageUrl(movie.poster_path, 'w300')}
            className={s.image}
          />
        }
        hoverable
      >
        <Meta title={<span className={s.title}>{movie.title}</span>} />
      </Card>
    </Link>
  )
}
