import { useState } from "react"
import { Search, Filter } from "lucide-react"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"
import { Card, CardContent } from "../components/ui/Card"

const BrowseItems = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const mockItems = [
    { id: 1, title: "Vintage Denim Jacket", size: "M", condition: "Good", points: 25 },
    { id: 2, title: "Summer Floral Dress", size: "S", condition: "Excellent", points: 30 },
    { id: 3, title: "Leather Boots", size: "8", condition: "Fair", points: 20 },
    { id: 4, title: "Wool Sweater", size: "L", condition: "Good", points: 22 },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Items</h1>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search for items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockItems.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
              <CardContent className="p-0">
                <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                    <span>Size: {item.size}</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">{item.condition}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-purple-600">{item.points} points</span>
                    <Button size="sm">View Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BrowseItems
