import { createContext, ReactNode, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
type ThemeProviderProps = {
  children: ReactNode
}
type ThemeContextType = {
  theme: Theme
  isDark: boolean
  toggleTheme: () => void
}

export const ThemeContext = createContext({} as ThemeContextType)

export function ThemeContextProvider({ children }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    return (localStorage.getItem('Ask:theme') ?? 'light') as Theme
  })

  useEffect(() => {
    localStorage.setItem('Ask:theme', currentTheme)
  }, [currentTheme])

  function toggleTheme() {
    document.body.classList.remove('dark', 'light')
    document.body.classList.add(currentTheme === 'light' ? 'dark' : 'light')

    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light')
  }
  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        toggleTheme,
        isDark: currentTheme === 'dark',
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
