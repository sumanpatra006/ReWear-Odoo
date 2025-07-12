import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Button  from "../../components/ui/Button";
import Input   from "../../components/ui/Input";
import Label   from "../../components/ui/Label";
import { Card, CardContent } from "../../components/ui/Card";

const Signup = () => {
  const [form, setForm]     = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const { signup } = useAuth();
  const navigate   = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      return setError("Passwords do not match");
    }

    setLoading(true);
    const res = await signup({
      name:     form.name.trim(),
      email:    form.email.trim(),
      password: form.password.trim(),
    });

    if (res.success) {
      navigate("/dashboard");
    } else {
      setError(res.error || "Signup failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Join ReWear</h2>
          <p className="text-gray-600">Start your sustainable fashion journey</p>
        </div>

        {/* Card */}
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Jane Smith"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
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
                  placeholder="Create a password"
                  required
                />
              </div>

              <div>
                <Label htmlFor="confirm">Confirm Password</Label>
                <Input
                  id="confirm"
                  type="password"
                  value={form.confirm}
                  onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                  placeholder="Repeat your password"
                  required
                />
              </div>

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating account…" : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-purple-600 hover:text-purple-700 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;