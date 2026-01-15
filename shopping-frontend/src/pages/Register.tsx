import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    loginId: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // ✅ 수정된 부분: 백엔드 server.ts의 "/users"와 userRouter의 "/signup"을 조합
      const response = await fetch("http://localhost:3500/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        const errorData = await response.json();
        alert(
          `Registration failed: ${errorData.message || "Please check your details."}`
        );
      }
    } catch (error) {
      console.error("Connection error:", error);
      // 포트가 5173인지 확인하라는 안내 추가
      alert(
        "Could not connect to the server. Ensure the backend is on 3500 and the frontend is running on port 5173."
      );
    }
  };

  return (
    <div className="max-w-[480px] mx-auto py-20 px-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3">Create Account</h1>
        <p className="text-gray-500">Join TechMarket today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold ml-1">First Name</label>
            <input
              type="text"
              name="firstname"
              placeholder="John"
              required
              className="w-full border border-gray-200 p-4 rounded-2xl outline-none focus:border-black transition"
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold ml-1">Last Name</label>
            <input
              type="text"
              name="lastname"
              placeholder="Doe"
              required
              className="w-full border border-gray-200 p-4 rounded-2xl outline-none focus:border-black transition"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold ml-1">
            Login ID (Username)
          </label>
          <input
            type="text"
            name="loginId"
            placeholder="tech_master"
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
