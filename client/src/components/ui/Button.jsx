import React from "react"

const Button = React.forwardRef(
  ({ className = "", variant = "default", size = "default", children, ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

    const variants = {
      default: "bg-purple-600 text-white hover:bg-purple-700 shadow-md hover:shadow-lg",
      outline: "border border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20",
      ghost: "text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20",
      secondary:
        "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
      destructive: "bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg",
    }

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 px-3 text-sm",
      lg: "h-12 px-8 text-base",
      icon: "h-10 w-10",
    }

    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

    return (
      <button className={classes} ref={ref} {...props}>
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"

export default Button
