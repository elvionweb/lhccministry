import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const AdminLogin = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const success = await login(form);
      if (success) {
        navigate("/admin");
      } else {
        setError("Invalid email or password");
      }
    } catch {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

        {/* Email */}
        <label htmlFor="email" className="sr-only">Email</label>
        <input
          id="email"
          name="email"
          autoComplete="email"
          type="email"
          placeholder="Email"
          required
          className="w-full border px-4 py-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* Password with Eye Icon */}
        <label htmlFor="password" className="sr-only">Password</label>
        <div className="relative mb-4">
          <input
            id="password"
            name="password"
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <span
            className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        {/* Remember Me + Forgot Password */}
        <div className="flex justify-between items-center mb-6 text-sm">
          <label htmlFor="remember" className="flex items-center space-x-2">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              checked={form.remember}
              onChange={(e) => setForm({ ...form, remember: e.target.checked })}
              className="form-checkbox h-4 w-4 text-indigo-600"
            />
            <span className="text-gray-700">Remember me</span>
          </label>
          <Link
            to="/admin/forgot-password"
            className="text-indigo-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
