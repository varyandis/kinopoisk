import {
  MOVIE_CATEGORIES_TITLES,
  type RouteMovieCategories,
} from '@/shared/config/routes/movieCategories'
import { Button } from 'antd'
import { useNavigate, useParams } from 'react-router'
import s from './SelectMoviesCategory.module.css'

export const SelectMoviesCategory = () => {
  const activeCategory = useParams<{ category: RouteMovieCategories }>().category ?? 'popular'
  const navigate = useNavigate()

  const onSelectCategory = (category: RouteMovieCategories) => {
    navigate(`/categories/${category}`)
  }

  return (
    <div className={s.select}>
      {MOVIE_CATEGORIES_TITLES.map(({ key, title }) => (
        <Button
          key={key}
          type={key === activeCategory ? 'primary' : 'default'}
          size="small"
          onClick={() => onSelectCategory(key)}
        >
          {title}
        </Button>
      ))}
    </div>
  )
}
