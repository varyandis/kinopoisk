import { Card, Skeleton } from 'antd'
import s from './MovieCardSkeleton.module.css'

export const MovieCardSkeleton = () => {
  return (
    <Card className={s.card}>
      <div className={s.poster}>
        <Skeleton.Image active />
      </div>

      <div className={s.meta}>
        <Skeleton active title={false} paragraph={{ rows: 2, width: ['90%', '70%'] }} />
      </div>
    </Card>
  )
}
