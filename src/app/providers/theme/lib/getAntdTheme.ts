import { theme as antdTheme, type ThemeConfig } from 'antd'
import type { ThemeMode } from '@/app/theme'

const { defaultAlgorithm, darkAlgorithm } = antdTheme

export const getAntdTheme = (mode: ThemeMode): ThemeConfig => {
  const isDark = mode === 'dark'
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
      Card: isDark
        ? {
            colorBgContainer: '#1B1E3F',
            boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
            fontSizeLG: 14,
            paddingLG: 14,
          }
        : {
            fontSizeLG: 14,
            paddingLG: 14,
          },
    },
  }
}
