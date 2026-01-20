import { LayoutFooter, LayoutHeader } from '@/app/layouts'
import { getAntdTheme } from '@/app/providers/theme/lib/getAntdTheme'
import { useThemeMode } from '@/app/providers/theme/model/useThemeMode'
import { ConfigProvider, Layout } from 'antd'
import { useMemo } from 'react'
import { Outlet } from 'react-router'
import s from './LayoutMain.module.css'

export const LayoutMain = () => {
  const { theme, setTheme } = useThemeMode()

  const antdThemeConfig = useMemo(() => getAntdTheme(theme), [theme])

  return (
    <ConfigProvider theme={antdThemeConfig}>
      <Layout className={s.layout} data-theme={theme}>
        <LayoutHeader setThemeMode={setTheme} theme={theme} />
        <Layout.Content className={s.container}>
          <Outlet />
        </Layout.Content>
        <LayoutFooter />
      </Layout>
    </ConfigProvider>
  )
}
