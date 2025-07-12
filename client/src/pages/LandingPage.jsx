import { Link } from "react-router-dom"
import { useTheme } from "../contexts/ThemeContext"
import { ArrowRight, Recycle, Users, Star, TrendingUp, Shield, Zap } from "lucide-react"
import Button from "../components/ui/Button"
import { Card, CardContent } from "../components/ui/Card"

const LandingPage = () => {
  const { colors } = useTheme()

  const featuredItems = [
    { id: 1, title: "Vintage Denim Jacket", price: "25 pts", image: "/placeholder.svg?height=200&width=200" },
    { id: 2, title: "Summer Floral Dress", price: "30 pts", image: "/placeholder.svg?height=200&width=200" },
    { id: 3, title: "Leather Boots", price: "20 pts", image: "/placeholder.svg?height=200&width=200" },
    { id: 4, title: "Wool Sweater", price: "22 pts", image: "/placeholder.svg?height=200&width=200" },
  ]

  return (
    <div className={`min-h-screen ${colors.background} transition-colors duration-300 w-full`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-purple-50/30 to-slate-100 dark:from-purple-900/20 dark:to-gray-900"></div>
        <div className="relative w-full px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center max-w-6xl mx-auto">
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${colors.text.primary} mb-6 leading-tight`}>
              Sustainable Fashion
              <span className="block bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Starts Here
              </span>
            </h1>
            <p className={`text-lg sm:text-xl ${colors.text.secondary} mb-8 max-w-3xl mx-auto leading-relaxed`}>
              Join ReWear's community clothing exchange. Swap, redeem, and discover unique pieces while reducing textile
              waste and building a sustainable wardrobe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Start Swapping
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/browse">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 bg-transparent"
                >
                  Browse Items
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className={`text-2xl font-bold ${colors.text.primary}`}>10K+</div>
                <div className={`text-sm ${colors.text.muted}`}>Items Exchanged</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${colors.text.primary}`}>5K+</div>
                <div className={`text-sm ${colors.text.muted}`}>Active Users</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${colors.text.primary}`}>95%</div>
                <div className={`text-sm ${colors.text.muted}`}>Satisfaction</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${colors.text.primary}`}>2M+</div>
                <div className={`text-sm ${colors.text.muted}`}>CO2 Saved</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className={`py-16 lg:py-20 ${colors.background} w-full`}>
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl lg:text-4xl font-bold ${colors.text.primary} mb-4`}>Featured Items</h2>
            <p className={`text-lg ${colors.text.secondary}`}>Discover unique pieces from our community</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 max-w-7xl mx-auto">
            {featuredItems.map((item) => (
              <Card
                key={item.id}
                className={`${colors.card} ${colors.border} hover:shadow-lg transform hover:scale-105 transition-all duration-200 cursor-pointer`}
              >
                <CardContent className="p-0">
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-t-lg"></div>
                  <div className="p-4">
                    <h3 className={`font-semibold ${colors.text.primary} mb-2`}>{item.title}</h3>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-purple-600">{item.price}</span>
                      <Button size="sm">View</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Link to="/browse">
              <Button
                variant="outline"
                className="border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 bg-transparent"
              >
                View All Items
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={`py-16 lg:py-20 bg-slate-50 dark:bg-gray-800/50 w-full`}>
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl lg:text-4xl font-bold ${colors.text.primary} mb-4`}>How ReWear Works</h2>
            <p className={`text-lg ${colors.text.secondary}`}>Simple, sustainable, and community-driven</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card
              className={`${colors.card} ${colors.border} text-center p-8 hover:shadow-lg transition-all duration-200`}
            >
              <CardContent>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Recycle className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className={`text-xl font-semibold ${colors.text.primary} mb-4`}>List Your Items</h3>
                <p className={colors.text.secondary}>
                  Upload photos and details of clothes you no longer wear. Our AI helps assess condition and value.
                </p>
              </CardContent>
            </Card>
            <Card
              className={`${colors.card} ${colors.border} text-center p-8 hover:shadow-lg transition-all duration-200`}
            >
              <CardContent>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className={`text-xl font-semibold ${colors.text.primary} mb-4`}>Connect & Swap</h3>
                <p className={colors.text.secondary}>
                  Find items you love and propose swaps with other users. Chat, negotiate, and arrange exchanges.
                </p>
              </CardContent>
            </Card>
            <Card
              className={`${colors.card} ${colors.border} text-center p-8 hover:shadow-lg transition-all duration-200`}
            >
              <CardContent>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className={`text-xl font-semibold ${colors.text.primary} mb-4`}>Earn Points</h3>
                <p className={colors.text.secondary}>
                  Build your reputation, earn points for successful swaps, and unlock premium features and exclusive
                  items.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className={`py-16 lg:py-20 ${colors.background} w-full`}>
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl lg:text-4xl font-bold ${colors.text.primary} mb-4`}>Why Choose ReWear?</h2>
            <p className={`text-lg ${colors.text.secondary}`}>More than just a clothing exchange</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className={`text-lg font-semibold ${colors.text.primary} mb-2`}>Save Money</h3>
                <p className={colors.text.secondary}>
                  Get designer pieces at a fraction of the cost through our point-based system.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className={`text-lg font-semibold ${colors.text.primary} mb-2`}>Trusted Community</h3>
                <p className={colors.text.secondary}>
                  Verified users, secure transactions, and community moderation ensure safe exchanges.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className={`text-lg font-semibold ${colors.text.primary} mb-2`}>AI-Powered</h3>
                <p className={colors.text.secondary}>
                  Smart matching, condition assessment, and personalized recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-16 lg:py-20 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Transform Your Wardrobe?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users making fashion more sustainable. Start your journey today and discover the joy of
            conscious clothing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/browse">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-black bg-transparent"
              >
                Explore Items
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
