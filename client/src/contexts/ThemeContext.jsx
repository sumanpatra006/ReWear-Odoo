import { createContext, useContext } from "react"

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const theme = {
    colors: {
      primary: {
        50: "#f3f4f6",
        100: "#e5e7eb",
        500: "#6b7280",
        600: "#4b5563",
        900: "#111827",
      },
      purple: {
        50: "#faf5ff",
        100: "#f3e8ff",
        200: "#e9d5ff",
        300: "#d8b4fe",
        400: "#c084fc",
        500: "#a855f7",
        600: "#9333ea",
        700: "#7c3aed",
        800: "#6b21a8",
        900: "#581c87",
      },
    },
  }

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}
