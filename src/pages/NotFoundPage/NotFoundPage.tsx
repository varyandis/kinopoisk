import { NavLink } from 'react-router'
import { Button } from 'antd'
import s from './NotFoundPage.module.css'

export const NotFoundPage = () => {
  return (
    <div className={s.container}>
      <h1>404</h1>
      <p>Page not found. We can’t find what you’re looking for</p>

      <Button type="primary">
        <NavLink to="/">Back to main page</NavLink>
      </Button>
    </div>
  )
}
