import { useAuth } from "../contexts/AuthContext";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import {
  User,
  Package,
  ArrowUpDown,
  Star,
  Heart,
  ShoppingBag,
  CheckCircle,
} from "lucide-react";

const Dashboard = () => {
  const { user, userProfile, profileLoading } = useAuth();

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600">Loading profile...</div>
          </div>
        </div>
      </div>
    );
  }

  const profile = userProfile?.profile;
  const wishlist = userProfile?.wishlist || [];
  const uploadedItems = userProfile?.uploadedItems || [];
  const redeemedItems = userProfile?.redeemedItems || [];
  const swappedItems = userProfile?.swappedItems || [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {profile?.name || user?.name}!
          </h1>
          <p className="text-gray-600">
            Manage your items and track your swaps
          </p>
        </div>

        {/* Profile Info */}
        {profile && (
          <Card className="mb-8">
            <CardHeader>
              <h3 className="text-lg font-semibold">Profile Information</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Name</p>
                  <p className="text-lg font-semibold">{profile.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Email</p>
                  <p className="text-lg font-semibold">{profile.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Role</p>
                  <p className="text-lg font-semibold capitalize">
                    {profile.role}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Points</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {profile?.points || user?.points || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Listed Items
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {uploadedItems.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <ArrowUpDown className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Swapped Items
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {swappedItems.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Wishlist</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {wishlist.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Items Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Uploaded Items */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Uploaded Items ({uploadedItems.length})
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {uploadedItems.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    No items uploaded yet
                  </p>
                ) : (
                  uploadedItems.slice(0, 3).map((item) => (
                    <div key={item._id} className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        {item.images && item.images.length > 0 ? (
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <Package className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-600">
                          {item.category} • {item.size}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              item.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : item.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : item.status === "rejected"
                                ? "bg-red-100 text-red-800"
                                : item.status === "swapped"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {item.status}
                          </span>
                          {item.points && (
                            <span className="text-xs text-purple-600 font-medium">
                              +{item.points} pts
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Wishlist */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                Wishlist ({wishlist.length})
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {wishlist.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    No items in wishlist
                  </p>
                ) : (
                  wishlist.slice(0, 3).map((item) => (
                    <div key={item._id} className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        {item.images && item.images.length > 0 ? (
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <Heart className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-600">
                          {item.category} • {item.size}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-purple-600 font-medium">
                            {item.pointsRequired} pts required
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Redeemed Items */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Redeemed Items ({redeemedItems.length})
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {redeemedItems.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    No items redeemed yet
                  </p>
                ) : (
                  redeemedItems.slice(0, 3).map((item) => (
                    <div key={item._id} className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        {item.images && item.images.length > 0 ? (
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <ShoppingBag className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-600">
                          {item.category} • {item.size}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-green-600 font-medium">
                            Redeemed
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Swapped Items */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Swapped Items ({swappedItems.length})
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {swappedItems.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    No items swapped yet
                  </p>
                ) : (
                  swappedItems.slice(0, 3).map((item) => (
                    <div key={item._id} className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        {item.images && item.images.length > 0 ? (
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <CheckCircle className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-600">
                          {item.category} • {item.size}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-blue-600 font-medium">
                            Swapped {item.swapCount} times
                          </span>
                          {item.points && (
                            <span className="text-xs text-purple-600 font-medium">
                              +{item.points} pts earned
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
