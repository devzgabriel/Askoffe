import { createContext, ReactNode, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
type ThemeProviderProps = {
  children: ReactNode
}
type ThemeContextType = {
  theme: Theme
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
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light')
  }
  return (
    <ThemeContext.Provider
      value={{
        theme: 'light',
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
