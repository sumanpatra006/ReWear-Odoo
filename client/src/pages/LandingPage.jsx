import { Link } from "react-router-dom"
import { ArrowRight, Recycle, Users, Star } from "lucide-react"
import Button from "../components/ui/Button"
import { Card, CardContent } from "../components/ui/Card"

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Sustainable Fashion
              <span className="text-purple-600 block">Starts Here</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join ReWear's community clothing exchange. Swap, redeem, and discover unique pieces while reducing textile
              waste.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Swapping
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/browse">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                  Browse Items
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How ReWear Works</h2>
            <p className="text-lg text-gray-600">Simple, sustainable, and community-driven</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <CardContent>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Recycle className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">List Your Items</h3>
                <p className="text-gray-600">Upload photos and details of clothes you no longer wear</p>
              </CardContent>
            </Card>
            <Card className="text-center p-8">
              <CardContent>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Connect & Swap</h3>
                <p className="text-gray-600">Find items you love and propose swaps with other users</p>
              </CardContent>
            </Card>
            <Card className="text-center p-8">
              <CardContent>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Earn Points</h3>
                <p className="text-gray-600">Build your reputation and unlock premium features</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Wardrobe?</h2>
          <p className="text-xl text-gray-300 mb-8">Join thousands of users making fashion more sustainable</p>
          <Link to="/signup">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default LandingPage