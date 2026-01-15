import { getTmdbImageUrl } from '@/shared/lib/tmdb/image'
import s from './MovieCast.module.css'

import type { MovieCastType } from '@/shared/api/tmdb/types'
import Title from 'antd/es/typography/Title'

type Props = {
  cast?: MovieCastType[]
  isLoading?: boolean
  error?: unknown
}

export const MovieCast = ({ cast, isLoading, error }: Props) => {
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error</div>
  if (!cast?.length) return <div>No cast info</div>

  return (
    <div className={s.cast}>
      <Title level={3}>Cast</Title>
      <div className={s.actors}>
        {cast?.map((actor) => (
          <div key={actor.id} className={s.actorItem}>
            <img src={getTmdbImageUrl(actor.profile_path, 'w300')} alt={actor.name} />
            <p className={s.actorName}>{actor.name}</p>
            <p className={s.actorCharacter}>{actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
