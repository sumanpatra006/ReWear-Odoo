"use client"

import { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("rewear_theme")
    if (savedTheme) {
      setIsDark(savedTheme === "dark")
    } else {
      // Check system preference
      setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("rewear_theme", isDark ? "dark" : "light")
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const theme = {
    isDark,
    toggleTheme,
    colors: {
      background: isDark ? "bg-gray-900" : "bg-white",
      surface: isDark ? "bg-gray-800" : "bg-white",
      card: isDark ? "bg-gray-800" : "bg-white",
      text: {
        primary: isDark ? "text-white" : "text-gray-900",
        secondary: isDark ? "text-gray-300" : "text-gray-600",
        muted: isDark ? "text-gray-400" : "text-gray-500",
      },
      border: isDark ? "border-gray-700" : "border-gray-200",
      hover: isDark ? "hover:bg-gray-700" : "hover:bg-gray-50",
    },
  }

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}
