"use client"

import React from "react"
import { useTheme } from "../../contexts/ThemeContext"

const Input = React.forwardRef(({ className = "", type = "text", ...props }, ref) => {
  const { colors } = useTheme()
  return (
    <input
      type={type}
      className={`w-full px-3 py-2 border ${colors.border} rounded-md ${colors.background} ${colors.text.primary} focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${className}`}
      ref={ref}
      {...props}
    />
  )
})

Input.displayName = "Input"

export default Input
