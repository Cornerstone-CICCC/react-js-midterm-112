import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const SearchContainer = styled.form`
  background-color: #f5f5f5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  width: 100%;
  max-width: 372px;
  height: 44px;

  input {
    background: transparent;
    border: none;
    outline: none;
    width: 100%;
    padding-left: 8px;
    font-size: 14px;
    color: #000;
    &::placeholder {
      color: #989898;
    }
  }
`;

const IconButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;
  cursor: pointer;
  position: relative;

  svg {
    width: 28px !important;
    height: 28px !important;
    color: #000;
  }
`;

const Badge = styled.span`
  position: absolute;
  top: -2px;
  right: -4px;
  background-color: ${(props: { color?: string }) => props.color || "#ef4444"};
  color: white;
  font-size: 10px;
  font-weight: bold;
  width: 16px;
  height: 16px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
`;

const Header: React.FC = () => {
  const { cartItems, totalCount, totalPrice, addToCart, removeFromCart } =
    useCart();
  const { user, logout } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate("/");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products?search=${encodeURIComponent(keyword)}`);
      setKeyword("");
    }
  };

  const navLinkStyle = ({ isActive }: { isActive: boolean }) =>
    `text-[16px] font-medium transition-colors ${
      isActive ? "text-black font-bold" : "text-[#989898] hover:text-black"
    }`;

  return (
    <header className="w-full bg-white border-b border-gray-100 h-[88px] flex items-center sticky top-0 z-50">
      <div className="max-w-[1120px] mx-auto w-full px-4 flex items-center justify-between relative">
        <Link
          to="/"
          className="text-[24px] font-bold text-black tracking-tighter shrink-0"
        >
          Tech<span className="text-blue-600">Market</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-[52px]">
          <NavLink to="/" className={navLinkStyle}>
            Home
          </NavLink>
          <NavLink to="/products" className={navLinkStyle}>
            Product
          </NavLink>
        </nav>

        <SearchContainer
          className="hidden md:flex mx-4"
          onSubmit={handleSearch}
        >
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </SearchContainer>

        <div className="flex items-center gap-2">
          <div
            className="relative h-[88px] flex items-center"
            onMouseEnter={() => setIsCartOpen(true)}
            onMouseLeave={() => setIsCartOpen(false)}
          >
            <Link to="/cart" className="hover:opacity-50 transition relative">
              <IconButton aria-label="Cart">
                <ShoppingCartIcon />
                {totalCount > 0 && <Badge color="#3b82f6">{totalCount}</Badge>}
              </IconButton>
            </Link>

            {isCartOpen && (
              <div className="absolute right-0 top-[78px] w-[350px] bg-white border border-gray-100 shadow-2xl rounded-2xl p-5 z-[100]">
                <div className="absolute -top-4 left-0 w-full h-4 bg-transparent" />
                <h3 className="font-bold text-lg mb-4">Cart Summary</h3>
                {cartItems.length === 0 ? (
                  <div className="py-8 text-center text-gray-400 text-sm">
                    Your cart is empty.
                  </div>
                ) : (
                  <>
                    <div className="max-h-[320px] overflow-y-auto space-y-4 mb-5 pr-1">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-3 items-center border-b border-gray-50 pb-3 last:border-0"
                        >
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-14 h-14 object-contain bg-gray-50 rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-black truncate">
                              {item.title}
                            </p>
                            <p className="text-xs text-gray-500 font-medium">
                              ${item.price.toLocaleString()}
                            </p>
                          </div>
                          <div className="flex items-center border rounded-lg bg-white overflow-hidden shrink-0">
                            <button
                              onClick={() => removeFromCart(item.id, true)}
                              className="px-2 py-1 hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-bold min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => addToCart(item, 1)}
                              className="px-2 py-1 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-300 hover:text-red-500"
                          >
                            <XMarkIcon className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-500 text-sm font-medium">
                          Total Price:
                        </span>
                        <span className="text-xl font-bold text-black">
                          ${totalPrice.toLocaleString()}
                        </span>
                      </div>
                      <Link
                        to="/cart"
                        className="block w-full bg-black text-white text-center py-4 rounded-xl font-bold"
                        onClick={() => setIsCartOpen(false)}
                      >
                        Go to Cart
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {user ? (
            <div className="flex items-center gap-3 border-l pl-5 ml-2">
              <Link
                to="/mypage"
                className="flex flex-col items-end leading-tight hover:opacity-70 transition group"
              >
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                  Welcome back,
                </span>
                <span className="text-[14px] font-bold text-black group-hover:text-blue-600 transition">
                  {user.loginId}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-red-50 rounded-full transition text-gray-400 hover:text-red-500 shadow-sm"
                title="Logout"
              >
                <ArrowRightOnRectangleIcon className="w-6 h-6" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hover:opacity-50 transition border-l pl-5 ml-2"
            >
              <IconButton aria-label="User profile">
                <UserIcon />
              </IconButton>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
