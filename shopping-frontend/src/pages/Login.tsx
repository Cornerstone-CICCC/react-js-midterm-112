import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    loginId: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:3500/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login Success:", data);

        const userData = data.user || data;
        login(userData);

        navigate("/", { replace: true });
      } else {
        setErrorMessage(
          data.message || "Invalid ID or Password. Please try again."
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Server connection error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[480px] mx-auto py-24 px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black mb-3 italic tracking-tighter">
          Login
        </h1>
        <p className="text-gray-500 font-medium">Welcome back to TechMarket</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {errorMessage && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold border border-red-100 animate-pulse">
            {errorMessage}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-bold ml-1 text-gray-700">
            Login ID
          </label>
          <input
            type="text"
            name="loginId"
            placeholder="Your ID"
            required
            className="w-full border border-gray-100 bg-gray-50 p-4 rounded-2xl outline-none focus:bg-white focus:border-black focus:ring-1 focus:ring-black transition-all"
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <label className="text-sm font-bold text-gray-700">Password</label>
            <Link
              to="/forgot-password"
              className="text-xs text-gray-400 hover:text-black transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            required
            className="w-full border border-gray-100 bg-gray-50 p-4 rounded-2xl outline-none focus:bg-white focus:border-black focus:ring-1 focus:ring-black transition-all"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-black text-white py-5 rounded-2xl font-bold text-lg transition mt-4 shadow-xl shadow-gray-200 
            ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800 active:scale-[0.98]"}`}
        >
          {isLoading ? "Signing in..." : "Login"}
        </button>
      </form>

      <div className="mt-10 text-center text-gray-500 font-medium">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-black font-bold underline underline-offset-4 hover:text-blue-600 transition-colors"
        >
          Create one here
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
