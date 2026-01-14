import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem(
        `user_${formData.email}`,
        JSON.stringify({
          id: Date.now().toString(),
          username: formData.username,
          email: formData.email,
          password: formData.password,
        })
      );

      console.log("Registration data:", formData);
      alert("Registration successful! Please login with your email.");
      navigate("/login");
    } catch (error) {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="max-w-[480px] mx-auto py-20 px-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3">Create Account</h1>
        <p className="text-gray-500">Join TechMarket today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-semibold ml-1">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Display Name (e.g. tech_master)"
            required
            className="w-full border border-gray-200 p-4 rounded-2xl outline-none focus:border-black transition"
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold ml-1">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="example@email.com"
            required
            className="w-full border border-gray-200 p-4 rounded-2xl outline-none focus:border-black transition"
            onChange={handleChange}
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
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-5 rounded-2xl font-bold text-lg hover:bg-gray-800 transition mt-4"
        >
          Create Account
        </button>
      </form>

      <p className="mt-8 text-center text-gray-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-black font-bold underline hover:text-blue-600"
        >
          Login here
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
