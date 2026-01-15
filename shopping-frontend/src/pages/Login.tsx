import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    loginId: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3500/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login Success:", data);

        const userData = data.user || data;
        login(userData);

        alert("Login successful!");
        navigate("/");
      } else {
        alert(`Login failed: ${data.message || "Invalid ID or Password"}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server connection error. Please try again later.");
    }
  };

  return (
    <div className="max-w-[480px] mx-auto py-24 px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">Login</h1>
        <p className="text-gray-500">Welcome back to TechMarket</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-semibold ml-1">Login ID</label>
          <input
            type="text"
            name="loginId"
            placeholder="Your ID"
            required
            className="w-full border border-gray-200 p-4 rounded-2xl outline-none focus:border-black transition"
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <label className="text-sm font-semibold">Password</label>
            <Link
              to="/forgot-password"
              className="text-xs text-gray-400 hover:text-black"
            >
              Forgot password?
            </Link>
          </div>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            required
            className="w-full border border-gray-200 p-4 rounded-2xl outline-none focus:border-black transition"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-5 rounded-2xl font-bold text-lg hover:bg-gray-800 transition mt-4"
        >
          Login
        </button>
      </form>

      <div className="mt-8 text-center text-gray-500">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-black font-bold underline hover:text-blue-600"
        >
          Create one here
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
