import React, { useEffect, useState } from "react";
import {
  TrashIcon,
  UserIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

const AdminUserManage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:3500/users", {
        credentials: "include",
      });
      const data = await res.json();
      const userData = Array.isArray(data) ? data : data.users || [];
      setUsers(userData);
    } catch (err) {
      console.error("Failed to load users:", err);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    if (user.role === "admin") return false;

    const searchTarget =
      `${user.loginId} ${user.firstname} ${user.lastname}`.toLowerCase();
    return searchTarget.includes(searchTerm.toLowerCase());
  });

  const handleDeleteUser = async (id: string, loginId: string) => {
    if (!window.confirm(`Are you sure you want to delete user: ${loginId}?`))
      return;
    try {
      const res = await fetch(`http://localhost:3500/users/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u._id !== id));
      }
    } catch (err) {
      alert("An error occurred during deletion.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] p-8">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-black text-black mb-2">
              User Directory
            </h1>
            <p className="text-gray-500 font-medium">
              Manage registered members (excluding administrators).
            </p>
          </div>
          <button
            onClick={fetchUsers}
            className="p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition"
            title="Refresh"
          >
            <ArrowPathIcon
              className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`}
            />
          </button>
        </div>

        <div className="relative mb-6">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by ID or name..."
            className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-8 py-5 font-bold text-gray-400 uppercase text-[11px] tracking-widest">
                  User Profile
                </th>
                <th className="px-6 py-5 font-bold text-gray-400 uppercase text-[11px] tracking-widest">
                  Role
                </th>
                <th className="px-6 py-5 font-bold text-gray-400 uppercase text-[11px] tracking-widest">
                  Joined Date
                </th>
                <th className="px-6 py-5 font-bold text-gray-400 uppercase text-[11px] tracking-widest text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="py-20 text-center text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-20 text-center text-gray-400">
                    No registered members found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 transition-colors group"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 font-bold shadow-inner group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                          {user.firstname?.charAt(0).toUpperCase() || (
                            <UserIcon className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-black text-[15px]">
                            {user.firstname} {user.lastname}
                          </p>
                          <p className="text-[12px] text-gray-400 font-medium">
                            ID: {user.loginId}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-gray-100 text-gray-500 border border-gray-200">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-gray-500 text-sm font-medium">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-6 py-5 text-center">
                      <button
                        onClick={() => handleDeleteUser(user._id, user.loginId)}
                        className="p-2 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
                        title="Delete User"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUserManage;
