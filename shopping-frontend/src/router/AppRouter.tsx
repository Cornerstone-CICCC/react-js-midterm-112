import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProductListPage from "../pages/ProductListPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";
import WishlistPage from "../pages/WishlistPage";
import MyPage from "../pages/MyPage";

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
      <Route path="/wishlist" element={<WishlistPage />} />

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
