"use client"

import React from "react"
import { useTheme } from "../../contexts/ThemeContext"

const Label = React.forwardRef(({ className = "", children, ...props }, ref) => {
  const { colors } = useTheme()
  return (
    <label ref={ref} className={`block text-sm font-medium ${colors.text.primary} mb-1 ${className}`} {...props}>
      {children}
    </label>
  )
})

Label.displayName = "Label"

export default Label
