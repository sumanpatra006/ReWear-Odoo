import { useAuth } from "../contexts/AuthContext";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import Button from "../components/ui/Button";
import {
  User,
  Package,
  Heart,
  ShoppingBag,
  CheckCircle,
  Star,
  Calendar,
  Mail,
  Shield,
} from "lucide-react";

const UserProfile = () => {
  const { user, userProfile, profileLoading, fetchUserProfile } = useAuth();

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

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "swapped":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
            <p className="text-gray-600">
              Manage your account and view your activity
            </p>
          </div>
          <Button onClick={fetchUserProfile} variant="outline">
            Refresh Profile
          </Button>
        </div>

        {/* Profile Information */}
        {profile && (
          <Card className="mb-8">
            <CardHeader>
              <h2 className="text-xl font-semibold flex items-center">
                <User className="w-5 h-5 mr-2" />
                Profile Information
              </h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Name</p>
                    <p className="text-lg font-semibold">{profile.name}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Email</p>
                    <p className="text-lg font-semibold">{profile.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Role</p>
                    <p className="text-lg font-semibold capitalize">
                      {profile.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Member Since
                    </p>
                    <p className="text-lg font-semibold">
                      {formatDate(profile.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Points Display */}
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Star className="w-8 h-8 text-white" />
                    <div>
                      <p className="text-white text-sm font-medium">
                        Total Points
                      </p>
                      <p className="text-white text-2xl font-bold">
                        {profile.points}
                      </p>
                    </div>
                  </div>
                  <div className="text-white text-right">
                    <p className="text-sm opacity-90">
                      Earn points by swapping items
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Uploaded Items
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
                  <CheckCircle className="w-6 h-6 text-green-600" />
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
                  <p className="text-sm font-medium text-gray-600">
                    Wishlist Items
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {wishlist.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Redeemed Items
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {redeemedItems.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Items Sections */}
        <div className="space-y-8">
          {/* Uploaded Items */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Uploaded Items ({uploadedItems.length})
              </h3>
            </CardHeader>
            <CardContent>
              {uploadedItems.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No items uploaded yet
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {uploadedItems.map((item) => (
                    <div
                      key={item._id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center space-x-3 mb-3">
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
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm text-gray-600">
                            {item.category} • {item.size}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-700">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </span>
                          <span className="text-xs text-purple-600 font-medium">
                            {item.pointsRequired} pts
                          </span>
                        </div>
                        {item.points && (
                          <p className="text-xs text-green-600 font-medium">
                            +{item.points} pts earned
                          </p>
                        )}
                        <p className="text-xs text-gray-500">
                          Created: {formatDate(item.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Wishlist Items */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                Wishlist Items ({wishlist.length})
              </h3>
            </CardHeader>
            <CardContent>
              {wishlist.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No items in wishlist
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {wishlist.map((item) => (
                    <div
                      key={item._id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center space-x-3 mb-3">
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
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm text-gray-600">
                            {item.category} • {item.size}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-700">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </span>
                          <span className="text-xs text-purple-600 font-medium">
                            {item.pointsRequired} pts required
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          Added: {formatDate(item.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
              {swappedItems.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No items swapped yet
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {swappedItems.map((item) => (
                    <div
                      key={item._id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center space-x-3 mb-3">
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
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm text-gray-600">
                            {item.category} • {item.size}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-700">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-blue-600 font-medium">
                            Swapped {item.swapCount} times
                          </span>
                          {item.points && (
                            <span className="text-xs text-green-600 font-medium">
                              +{item.points} pts earned
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">
                          Last updated: {formatDate(item.updatedAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
              {redeemedItems.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No items redeemed yet
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {redeemedItems.map((item) => (
                    <div
                      key={item._id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center space-x-3 mb-3">
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
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm text-gray-600">
                            {item.category} • {item.size}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-700">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-green-600 font-medium">
                            Redeemed
                          </span>
                          <span className="text-xs text-purple-600 font-medium">
                            {item.pointsRequired} pts spent
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          Redeemed: {formatDate(item.updatedAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
