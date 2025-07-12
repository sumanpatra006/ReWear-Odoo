import { Card, CardContent, CardHeader } from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import { CheckCircle, XCircle, Eye } from "lucide-react"

const AdminPanel = () => {
  const pendingItems = [
    { id: 1, title: "Vintage Leather Jacket", user: "John Doe", status: "pending" },
    { id: 2, title: "Summer Dress", user: "Jane Smith", status: "pending" },
    { id: 3, title: "Running Shoes", user: "Mike Johnson", status: "pending" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600">Manage items and moderate content</p>
        </div>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Pending Items</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-gray-600">by {item.user}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive">
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminPanel
