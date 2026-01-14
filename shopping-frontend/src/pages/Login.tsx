import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const savedUserData = localStorage.getItem(`user_${formData.email}`);

    if (savedUserData) {
      const user = JSON.parse(savedUserData);

      if (user.password === formData.password) {
        login({
          id: user.id,
          username: user.username,
          email: user.email,
        });

        alert(`Welcome back, ${user.username}!`);
        navigate("/");
      } else {
        alert("Invalid password. Please try again.");
      }
    } else {
      alert("No account found with this email.");
    }
  };

  return (
    <div className="max-w-[480px] mx-auto py-20 px-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3">Login</h1>
        <p className="text-gray-500">Welcome back to TechMarket</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-semibold ml-1">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="example@email.com"
            required
            className="w-full border border-gray-200 p-4 rounded-2xl outline-none focus:border-black transition"
            onChange={handleChange}
            value={formData.email}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold ml-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            required
            className="w-full border border-gray-200 p-4 rounded-2xl outline-none focus:border-black transition"
            onChange={handleChange}
            value={formData.password}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-5 rounded-2xl font-bold text-lg hover:bg-gray-800 transition mt-4"
        >
          Login
        </button>
      </form>

      <div className="mt-8 space-y-3 text-center">
        <p className="text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-black font-bold underline hover:text-blue-600"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
