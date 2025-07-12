// src/pages/auth/AdminLogin.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../../components/ui/Button";
import Input  from "../../components/ui/Input";
import Label  from "../../components/ui/Label";
import { Card, CardContent } from "../../components/ui/Card";

const AdminLogin = () => {
  const { loginAdmin } = useAuth();
  const navigate       = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const res = await loginAdmin(form.email, form.password);

    if (res.success) {
      navigate("/admin");     // protected admin panel route
    } else {
      setErrorMsg(res.error || "Login failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Admin Sign‑In</h2>
          <p className="text-gray-600">ReWear moderation portal</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="admin@rewear.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  required
                />
              </div>

              {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in…" : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Regular user?{" "}
                <Link to="/login" className="text-purple-600 hover:text-purple-700 font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
