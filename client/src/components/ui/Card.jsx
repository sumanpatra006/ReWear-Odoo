"use client"

import React from "react"
import { useTheme } from "../../contexts/ThemeContext"

const Card = React.forwardRef(({ className = "", children, ...props }, ref) => {
  const { colors } = useTheme()
  return (
    <div
      ref={ref}
      className={`${colors.card} rounded-lg shadow-md border ${colors.border} transition-colors duration-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className = "", children, ...props }, ref) => {
  return (
    <div ref={ref} className={`p-6 pb-0 ${className}`} {...props}>
      {children}
    </div>
  )
})

CardHeader.displayName = "CardHeader"

const CardContent = React.forwardRef(({ className = "", children, ...props }, ref) => {
  return (
    <div ref={ref} className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  )
})

CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className = "", children, ...props }, ref) => {
  return (
    <div ref={ref} className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  )
})

CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardContent, CardFooter }
