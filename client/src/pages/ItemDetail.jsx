import { useParams } from "react-router-dom"
import Button from "../components/ui/Button"
import { Card, CardContent } from "../components/ui/Card"
import { ArrowLeft, Heart, Share } from "lucide-react"

const ItemDetail = () => {
  const { id } = useParams()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Browse
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div>
            <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>

          {/* Item Details */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Vintage Denim Jacket</h1>

                <div className="flex items-center space-x-4 mb-6">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Excellent</span>
                  <span className="text-gray-600">Size: M</span>
                  <span className="text-purple-600 font-semibold">25 points</span>
                </div>

                <p className="text-gray-700 mb-6">
                  Classic vintage denim jacket in excellent condition. Perfect for layering and adding a retro touch to
                  any outfit. Barely worn, no stains or damage.
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span>Outerwear</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Brand:</span>
                    <span>Levi's</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Material:</span>
                    <span>100% Cotton</span>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button className="flex-1">Request Swap</Button>
                  <Button variant="outline">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="outline">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemDetail