import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { ThemeProvider } from "./contexts/ThemeContext"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import LandingPage from "./pages/LandingPage"
import Dashboard from "./pages/Dashboard"
import ItemDetail from "./pages/ItemDetail"
import AddItem from "./pages/AddItem"
import BrowseItems from "./pages/BrowseItems"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import AdminPanel from "./pages/admin/AdminPanel"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import "./App.css"

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen transition-colors duration-300 w-full">
            <Navbar />
            <main className="flex-1 w-full">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/browse" element={<BrowseItems />} />
                <Route path="/item/:id" element={<ItemDetail />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/add-item"
                  element={
                    <ProtectedRoute>
                      <AddItem />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminPanel />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
