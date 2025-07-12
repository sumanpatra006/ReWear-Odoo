// src/pages/AddItem.jsx
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { Upload } from "lucide-react";

const AddItem = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState([]); // File objects
  const fileInput = useRef(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    gender: "",
    type: "",
    size: "",
    condition: "",
    brand: "",
    tags: "",
    points: "",
  });

  const handleFileClick = () => fileInput.current?.click();

  const handleFilesChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!images.length) {
      setError("Please upload at least one image");
      setLoading(false);
      return;
    }

    if (isNaN(form.points) || Number(form.points) <= 0) {
      setError("Points must be a positive number");
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        data.append(key, key === "points" ? Number(val) : val);
      });

      data.append("image", images[0]); // Only first image used

      await axios.post("/items/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add item");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">List New Item</h1>
        <p className="text-gray-600 mb-8">Add your item to the ReWear community</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Photos */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Photos</h3>
            </CardHeader>
            <CardContent>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                ref={fileInput}
                onChange={handleFilesChange}
              />
              <div
                onClick={handleFileClick}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer"
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500 mb-4">PNG, JPG up to 10 MB each</p>
                <Button type="button" variant="outline" className="bg-transparent">
                  Choose Files
                </Button>
                {images.length > 0 && (
                  <p className="mt-2 text-sm text-purple-600">{images.length} file(s) selected</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Item details */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Item Details</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g., Cotton Kurti"
                  required
                />
              </div>

              <div>
                <Label htmlFor="points">Points</Label>
                <Input
                  id="points"
                  value={form.points}
                  onChange={(e) => setForm({ ...form, points: e.target.value })}
                  placeholder="e.g., 100"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  rows={4}
                  className="w-full px-3 py-2 border rounded-md focus:ring-purple-500"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe your item..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    className="w-full px-3 py-2 border rounded-md focus:ring-purple-500"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    required
                  >
                    <option value="">Select category</option>
                    <option value="ethnic">Ethnic</option>
                    <option value="casual">Casual</option>
                    <option value="formal">Formal</option>
                    <option value="outerwear">Outerwear</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <select
                    id="gender"
                    className="w-full px-3 py-2 border rounded-md focus:ring-purple-500"
                    value={form.gender}
                    onChange={(e) => setForm({ ...form, gender: e.target.value })}
                    required
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="unisex">Unisex</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Input
                    id="type"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    placeholder="e.g., Hoodie, Kurti"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="size">Size</Label>
                  <Input
                    id="size"
                    value={form.size}
                    onChange={(e) => setForm({ ...form, size: e.target.value })}
                    placeholder="M, L, 32, 8"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="condition">Condition</Label>
                  <select
                    id="condition"
                    className="w-full px-3 py-2 border rounded-md focus:ring-purple-500"
                    value={form.condition}
                    onChange={(e) => setForm({ ...form, condition: e.target.value })}
                    required
                  >
                    <option value="">Select condition</option>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="brand">Brand (Optional)</Label>
                  <Input
                    id="brand"
                    value={form.brand}
                    onChange={(e) => setForm({ ...form, brand: e.target.value })}
                    placeholder="e.g., Fabindia"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma‑separated)</Label>
                <Input
                  id="tags"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="cotton, ethnic, casual"
                />
              </div>

              {error && <p className="text-red-600 text-sm">{error}</p>}
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" disabled={loading}>
              Save as Draft
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Listing…" : "List Item"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;