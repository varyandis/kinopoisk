import { ROUTES } from '@/app/App'
import tmdbLogo from '@/shared/assets/images/tmdb-logo.svg'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { Button, Layout, Menu, Progress, type MenuProps } from 'antd'
import { NavLink, useLocation, useNavigate } from 'react-router'
import s from './LayoutHeader.module.css'
import type { ThemeMode } from '@/app/providers/theme/types/types'
import { useGlobalIsFetching } from '@/shared/lib/rtkq/useGlobalIsFetching'

type MenuClick = MenuProps['onClick']

const items: MenuProps['items'] = [
  { label: 'Main', key: '/' },
  { label: 'Category movies', key: '/categories/popular' },
  { label: 'Filtered movies', key: '/filtered' },
  { label: 'Search', key: '/search' },
  { label: 'Favorites', key: '/favorites' },
]

type Props = {
  setThemeMode: (theme: ThemeMode) => void
  theme: ThemeMode
}

export const LayoutHeader = ({ setThemeMode, theme }: Props) => {
  const navigate = useNavigate()
  const location = useLocation()

  const isFetching = useGlobalIsFetching()

  const pathname = location.pathname
  const selectedKey = pathname.startsWith('/categories/') ? '/categories/popular' : pathname

  const onClick: MenuClick = (e) => {
    const nextPath = e.key
    if (location.pathname === nextPath) return
    navigate(nextPath)
  }

  const nextTheme = theme === 'light' ? 'dark' : 'light'

  return (
    <div className={s.headerWrap}>
      <Layout.Header className={s.header}>
        <div className={s.container}>
          <div className={s.left}>
            <NavLink to={ROUTES.MAIN} end>
              <img className={s.logo} src={tmdbLogo} alt="TMDB" />
            </NavLink>
          </div>

          <div className={s.center}>
            <Menu
              theme={theme}
              mode="horizontal"
              className={s.menu}
              disabledOverflow
              items={items}
              onClick={onClick}
              selectedKeys={[selectedKey]}
            />
          </div>

          <div className={s.right}>
            <Button
              shape="circle"
              type="default"
              icon={theme === 'light' ? <MoonOutlined /> : <SunOutlined />}
              size="middle"
              onClick={() => setThemeMode(nextTheme)}
            />
          </div>
        </div>
      </Layout.Header>

      <div className={s.progressWrap}>
        <Progress
          percent={100}
          showInfo={false}
          size="small"
          className={!isFetching ? s.progressHidden : undefined}
          strokeColor="#aeaee7"
        />
      </div>
    </div>
  )
}
