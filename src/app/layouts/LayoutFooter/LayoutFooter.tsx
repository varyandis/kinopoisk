import { Footer } from 'antd/es/layout/layout'
import s from './LayoutFooter.module.css'
import { Typography } from 'antd'

export const LayoutFooter = () => {
  return (
    <Footer className={s.footer}>
      <div className={s.container}>
        <Typography.Text type="secondary" className={s.text}>
          © 2026 Kinopoisk Demo · Data courtesy of TMDB.
        </Typography.Text>
      </div>
    </Footer>
  )
}
