import React from "react";
import { Link } from "react-router-dom";
import {
  CubeIcon,
  UsersIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FBFBFD] p-6 md:p-12">
      <div className="max-w-[1100px] mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-blue-600 font-bold text-sm tracking-widest uppercase mb-2 block">
              Management
            </span>
            <h1 className="text-5xl font-black text-black tracking-tight">
              Admin <span className="text-gray-300">Console</span>
            </h1>
            <p className="text-gray-500 mt-3 font-medium text-lg">
              Manage your store's products and data at a glance.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/admin/products"
            className="group relative overflow-hidden bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col justify-between min-h-[320px]"
          >
            <CubeIcon className="absolute -right-10 -bottom-10 w-64 h-64 text-gray-50 opacity-50 group-hover:scale-110 transition-transform duration-700" />

            <div className="relative">
              <div className="w-16 h-16 bg-blue-600 rounded-[1.5rem] flex items-center justify-center mb-8 shadow-lg shadow-blue-200 group-hover:rotate-6 transition-transform">
                <CubeIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-black mb-3">
                Product Management
              </h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                Register, edit, or delete products and
                <br />
                monitor real-time inventory status.
              </p>
            </div>

            <div className="relative flex items-center gap-2 text-blue-600 font-bold">
              <span>Go to Inventory</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>

          <Link
            to="/admin/users"
            className="group relative overflow-hidden bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col justify-between min-h-[320px]"
          >
            <UsersIcon className="absolute -right-10 -bottom-10 w-64 h-64 text-gray-50 opacity-50 group-hover:scale-110 transition-transform duration-700" />

            <div className="relative">
              <div className="w-16 h-16 bg-purple-600 rounded-[1.5rem] flex items-center justify-center mb-8 shadow-lg shadow-purple-200 group-hover:rotate-6 transition-transform">
                <UsersIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-black mb-3">
                User Management
              </h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                Review the registered member list and
                <br />
                manage user accounts and access.
              </p>
            </div>

            <div className="relative flex items-center gap-2 text-purple-600 font-bold">
              <span>Manage Directory</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
