import type { Movie } from '@/entities/movie'
import { getTmdbImageUrl } from '@/shared/lib/tmdb/image'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { Button, Card, Tag } from 'antd'
import { Link } from 'react-router'
import s from './MovieCard.module.css'

type Props = {
  movie: Movie
  isFavorite: boolean
  onToggleFavorite: (movie: Movie) => void
}
const { Meta } = Card

export const MovieCard = ({ movie, isFavorite, onToggleFavorite }: Props) => {
  const onToggleFavoriteHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onToggleFavorite(movie)
  }

  const colorVote =
    movie.vote_average >= 7 ? '#4caf50' : movie.vote_average >= 4 ? '#ff9800' : '#f44336'

  return (
    <Link to={`/movies/${movie.id}`} className={s.link}>
      <Card
        className={s.card}
        size="default"
        hoverable
        cover={
          <div className={s.cover}>
            <img
              alt={movie.title}
              src={getTmdbImageUrl(movie.poster_path, 'w300')}
              className={s.image}
            />

            <Tag className={s.rating} color={colorVote} variant="solid">
              {movie.vote_average.toFixed(1)}
            </Tag>

            <Button
              className={`${s.favoriteBtn} ${isFavorite ? s.favoriteBtnActive : ''}`}
              type="text"
              shape="circle"
              icon={isFavorite ? <HeartFilled /> : <HeartOutlined />}
              onClick={onToggleFavoriteHandler}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            />
          </div>
        }
      >
        <Meta title={<span className={s.title}>{movie.title}</span>} />
      </Card>
    </Link>
  )
}
