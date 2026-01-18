import React from "react";
import { Link } from "react-router-dom";

const SignUp: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-white">
      <div className="max-w-md w-full py-12">
        <div className="text-center mb-10">
          <h2 className="text-[32px] font-bold mb-2">Create Account</h2>
          <p className="text-[#909090]">
            Join us to get the best shopping experience
          </p>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-4 bg-[#F6F6F6] rounded-xl outline-none border border-transparent focus:border-black transition-all"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-4 bg-[#F6F6F6] rounded-xl outline-none border border-transparent focus:border-black transition-all"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 bg-[#F6F6F6] rounded-xl outline-none border border-transparent focus:border-black transition-all"
            required
          />

          <div className="flex items-start gap-3 px-1">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 accent-black h-4 w-4"
              required
            />
            <label
              htmlFor="terms"
              className="text-sm text-[#909090] leading-tight cursor-pointer"
            >
              I agree to the{" "}
              <span className="text-black underline">Terms & Conditions</span>{" "}
              and <span className="text-black underline">Privacy Policy</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-xl font-medium mt-4 hover:opacity-90 transition-opacity active:scale-[0.98]"
          >
            Create Account
          </button>
        </form>

        <div className="mt-8 text-center text-[#909090]">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-bold hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
