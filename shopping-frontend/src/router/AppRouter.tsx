import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProductListPage from "../pages/ProductListPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";
import MyPage from "../pages/MyPage";

import AdminRoute from "../components/AdminRoute";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProductManage from "../pages/admin/AdminProductManage";
import AdminUserManage from "../pages/admin/AdminUserManage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductListPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/register" element={<Register />} />
      <Route path="/mypage" element={<MyPage />} />

      <Route path="/cart" element={<CartPage />} />

      <Route element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProductManage />} />
        <Route path="/admin/users" element={<AdminUserManage />} />
      </Route>

      <Route
        path="*"
        element={
          <div className="py-20 text-center text-gray-500">
            404: Page Not Found
          </div>
        }
      />
    </Routes>
  );
};

export default AppRouter;
