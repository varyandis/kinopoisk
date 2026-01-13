import { useEffect, useState } from 'react'
import type { ThemeMode } from '@/app/theme'

const STORAGE_THEME_KEY = 'themeMode'

export const useThemeMode = () => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(STORAGE_THEME_KEY)
    return saved === 'dark' || saved === 'light' ? saved : 'light'
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_THEME_KEY, theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  return { theme, setTheme, toggleTheme }
}
