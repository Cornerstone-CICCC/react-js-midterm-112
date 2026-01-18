import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyPage: React.FC = () => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname,
        lastname: user.lastname,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?._id) return;

    try {
      const response = await fetch(`http://localhost:3500/users/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        login(data);
      } else {
        alert(`Update failed: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to connect to the server.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`http://localhost:3500/users/${user?._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        logout();
        navigate("/");
      } else {
        alert("Failed to delete account.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("An error occurred while trying to delete the account.");
    }
  };

  if (!user) {
    return (
      <div className="py-24 text-center">
        <p className="text-gray-500 mb-4">
          Login is required to access this page.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="text-blue-600 underline"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[600px] mx-auto py-20 px-6">
      <h1 className="text-3xl font-bold mb-10">Account Settings</h1>

      <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="text-sm font-bold text-gray-400 block mb-2 font-mono">
              ID (Login ID)
            </label>
            <input
              type="text"
              value={user.loginId}
              disabled
              className="w-full border-none bg-gray-50 p-4 rounded-xl text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-2 ml-1">
              ※ Login ID cannot be changed.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1">First Name</label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 p-4 rounded-xl outline-none focus:border-black transition"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1">Last Name</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 p-4 rounded-xl outline-none focus:border-black transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg"
          >
            Update Profile
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <h2 className="text-lg font-bold text-red-600 mb-2">Danger Zone</h2>
          <p className="text-sm text-gray-500 mb-4">
            Deleting your account will permanently remove all your cart and
            profile data.
          </p>
          <button
            onClick={handleDeleteAccount}
            className="text-sm font-bold text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg border border-red-100 transition"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
