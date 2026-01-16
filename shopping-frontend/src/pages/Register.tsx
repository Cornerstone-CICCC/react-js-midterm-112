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
      const response = await fetch("http://localhost:3500/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role: "user" }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/login", {
          state: { signupSuccess: true },
          replace: true,
        });
      } else {
        setErrorMessage(
          data.message || "Registration failed. Please check your details."
        );
      }
    } catch (error) {
      console.error("Connection error:", error);
      setErrorMessage(
        "Could not connect to the server. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[480px] mx-auto py-20 px-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black mb-3 italic tracking-tighter">
          Create Account
        </h1>
        <p className="text-gray-500 font-medium">Join TechMarket today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {errorMessage && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold border border-red-100 animate-shake">
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-bold ml-1 text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              placeholder="John"
              required
              className="w-full border border-gray-100 bg-gray-50 p-4 rounded-2xl outline-none focus:bg-white focus:border-black transition-all"
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold ml-1 text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              placeholder="Doe"
              required
              className="w-full border border-gray-100 bg-gray-50 p-4 rounded-2xl outline-none focus:bg-white focus:border-black transition-all"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold ml-1 text-gray-700">
            Login ID (Username)
          </label>
          <input
            type="text"
            name="loginId"
            placeholder="username"
            required
            className="w-full border border-gray-100 bg-gray-50 p-4 rounded-2xl outline-none focus:bg-white focus:border-black transition-all"
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold ml-1 text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            required
            className="w-full border border-gray-100 bg-gray-50 p-4 rounded-2xl outline-none focus:bg-white focus:border-black transition-all"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-black text-white py-5 rounded-2xl font-bold text-lg transition mt-4 shadow-xl shadow-gray-200 
            ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800 active:scale-[0.98]"}`}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <p className="mt-8 text-center text-gray-500 font-medium">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-black font-bold underline underline-offset-4 hover:text-blue-600 transition-colors"
        >
          Login here
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
