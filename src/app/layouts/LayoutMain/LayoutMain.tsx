import { LayoutFooter, LayoutHeader } from '@/app/layouts'
import type { ThemeMode } from '@/app/theme'
import { ConfigProvider, Layout, theme as antdTheme } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { Outlet } from 'react-router'
import s from './LayoutMain.module.css'

const { defaultAlgorithm, darkAlgorithm } = antdTheme

const STORAGE_THEME_KEY = 'themeMode'

export const LayoutMain = () => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(STORAGE_THEME_KEY)
    return saved === 'dark' || saved === 'light' ? saved : 'light'
  })

  const setThemeMode = (mode: ThemeMode) => {
    setTheme(mode)
  }

  useEffect(() => {
    localStorage.setItem(STORAGE_THEME_KEY, theme)
  }, [theme])

  const antdThemeConfig = useMemo(() => {
    const isDark = theme === 'dark'
    const panelBg = isDark ? '#12142B' : '#EEF0FF'

    const tokens = isDark
      ? {
          colorPrimary: '#7C6BFF',
          colorBgLayout: '#181a35',
          colorBgContainer: '#151733',
          colorTextBase: '#E9E9FF',
          borderRadius: 16,
          controlHeight: 40,
          fontSize: 18,
        }
      : {
          colorPrimary: '#5B5CEB',
          colorBgLayout: '#F6F7FF',
          colorBgContainer: '#FFFFFF',
          colorTextBase: '#141414',
          borderRadius: 16,
          controlHeight: 40,
          fontSize: 18,
        }

    return {
      algorithm: isDark ? darkAlgorithm : defaultAlgorithm,
      token: tokens,
      components: {
        Layout: {
          headerBg: panelBg,
          bodyBg: tokens.colorBgLayout,
          footerBg: panelBg,
        },
        Menu: {
          horizontalItemBorderRadius: 14,
        },
        Card: {
          fontSizeLG: 14,
          paddingLG: 14,
        },
      },
    }
  }, [theme])

  return (
    <ConfigProvider theme={antdThemeConfig}>
      <Layout className={s.layout}>
        <LayoutHeader setThemeMode={setThemeMode} theme={theme} />
        <Layout.Content className={s.container}>
          <Outlet />
        </Layout.Content>
        <LayoutFooter />
      </Layout>
    </ConfigProvider>
  )
}
