import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useTheme } from "../../contexts/ThemeContext"
import { Menu, X, User, Plus, LogOut, Moon, Sun } from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const { isDark, toggleTheme, colors } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <nav
      className={`${colors.surface} shadow-lg border-b ${colors.border} sticky top-0 z-50 backdrop-blur-sm bg-opacity-95 w-full`}
    >
      {/* Purple shadow overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-purple-600/10 pointer-events-none"></div>

      <div className="w-full px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className={`text-xl font-bold ${colors.text.primary}`}>ReWear</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/browse"
              className={`${colors.text.secondary} hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-purple-50 dark:hover:bg-purple-900/20`}
            >
              Browse Items
            </Link>

            {user ? (
              <>
                <Link
                  to="/add-item"
                  className={`flex items-center space-x-1 ${colors.text.secondary} hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-purple-50 dark:hover:bg-purple-900/20`}
                >
                  <Plus className="w-4 h-4" />
                  <span>List Item</span>
                </Link>
                <Link
                  to="/dashboard"
                  className={`flex items-center space-x-1 ${colors.text.secondary} hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-purple-50 dark:hover:bg-purple-900/20`}
                >
                  <User className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 px-3 py-1 rounded-full">
                  <span className="text-sm font-medium text-purple-700 dark:text-purple-300">{user.points} pts</span>
                </div>
                <button
                  onClick={handleLogout}
                  className={`flex items-center space-x-1 ${colors.text.secondary} hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-red-50 dark:hover:bg-red-900/20`}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className={`${colors.text.secondary} hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${colors.hover} ${colors.text.secondary} hover:text-purple-600 transition-all duration-200`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${colors.hover} ${colors.text.secondary} hover:text-purple-600 transition-all duration-200`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className={`${colors.text.secondary} hover:text-purple-600 p-2`}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t ${colors.border}`}>
              <Link
                to="/browse"
                className={`block ${colors.text.secondary} hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 px-3 py-2 rounded-md text-base font-medium transition-all duration-200`}
                onClick={() => setIsOpen(false)}
              >
                Browse Items
              </Link>

              {user ? (
                <>
                  <Link
                    to="/add-item"
                    className={`block ${colors.text.secondary} hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 px-3 py-2 rounded-md text-base font-medium transition-all duration-200`}
                    onClick={() => setIsOpen(false)}
                  >
                    List Item
                  </Link>
                  <Link
                    to="/dashboard"
                    className={`block ${colors.text.secondary} hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 px-3 py-2 rounded-md text-base font-medium transition-all duration-200`}
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <div className="px-3 py-2 text-sm text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/20 rounded-md mx-3">
                    Points: {user.points}
                  </div>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsOpen(false)
                    }}
                    className={`block w-full text-left ${colors.text.secondary} hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-2 rounded-md text-base font-medium transition-all duration-200`}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`block ${colors.text.secondary} hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 px-3 py-2 rounded-md text-base font-medium transition-all duration-200`}
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 px-3 py-2 rounded-md text-base font-medium transition-all duration-200 mx-3"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
