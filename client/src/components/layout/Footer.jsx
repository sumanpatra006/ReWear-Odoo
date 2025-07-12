import { Link } from "react-router-dom"
import { Heart, Recycle, Users } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-bold">ReWear</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Join the sustainable fashion revolution. Exchange, reuse, and reduce textile waste while discovering
              unique pieces from our community.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Recycle className="w-4 h-4 text-purple-400" />
                <span>Sustainable</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-purple-400" />
                <span>Community</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-purple-400" />
                <span>Eco-Friendly</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/browse" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">
                  Browse Items
                </Link>
              </li>
              <li>
                <Link to="/add-item" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">
                  List an Item
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 ReWear. All rights reserved. Made with <Heart className="w-4 h-4 inline text-purple-400" /> for
            sustainable fashion.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
