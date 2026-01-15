import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  PlusIcon,
  MinusIcon,
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
  max-width: 300px;
  height: 44px;

  @media (max-width: 768px) {
    display: none;
  }

  input {
    background: transparent;
    border: none;
    outline: none;
    width: 100%;
    padding-left: 8px;
    font-size: 14px;
    color: #000;
  }
`;

const IconButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
  background-color: #3b82f6;
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
  z-index: 10;
`;

const Header: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { user, logout } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * item.quantity,
    0
  );

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

  const getProductImage = (item: any) => {
    if (item.images)
      return Array.isArray(item.images) ? item.images[0] : item.images;
    return item.image || "https://placehold.co/150x150?text=No+Image";
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 h-[88px] flex items-center sticky top-0 z-50">
      <div className="max-w-[1120px] mx-auto w-full px-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-[20px] md:text-[24px] font-bold text-black tracking-tighter shrink-0"
        >
          Tech<span className="text-blue-600">Market</span>
        </Link>

        <nav className="flex items-center gap-4 md:gap-[52px]">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-[14px] md:text-[16px] font-medium transition-colors ${isActive ? "text-black font-bold" : "text-[#989898] hover:text-black"}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `text-[14px] md:text-[16px] font-medium transition-colors ${isActive ? "text-black font-bold" : "text-[#989898] hover:text-black"}`
            }
          >
            Product
          </NavLink>
        </nav>

        <SearchContainer onSubmit={handleSearch}>
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </SearchContainer>

        <div className="flex items-center gap-2 md:gap-4">
          <div
            className="relative h-[88px] flex items-center"
            onMouseEnter={() => setIsCartOpen(true)}
            onMouseLeave={() => setIsCartOpen(false)}
          >
            <Link to="/cart" className="hover:opacity-50 transition relative">
              <IconButton>
                <ShoppingCartIcon />
                {totalCount > 0 && <Badge>{totalCount}</Badge>}
              </IconButton>
            </Link>

            {isCartOpen && (
              <div className="absolute right-0 top-[78px] w-[280px] md:w-[350px] bg-white border border-gray-100 shadow-2xl rounded-2xl p-4 md:p-5 z-[100]">
                <h3 className="font-bold text-lg mb-4 text-black">
                  Cart Summary
                </h3>
                {cartItems.length === 0 ? (
                  <div className="py-8 text-center text-gray-400 text-sm">
                    Your cart is empty.
                  </div>
                ) : (
                  <>
                    <div className="max-h-[320px] overflow-y-auto space-y-4 mb-5 pr-1">
                      {cartItems.map((item) => (
                        <div
                          key={item.productId}
                          className="flex gap-3 items-center border-b border-gray-50 pb-3 last:border-0"
                        >
                          <img
                            src={item.images}
                            alt={item.title}
                            className="w-12 h-12 object-contain bg-gray-50 rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-black truncate">
                              {item.title}
                            </p>
                            <p className="text-[10px] text-gray-500">
                              ${item.price.toLocaleString()}
                            </p>
                          </div>
                          <div className="flex items-center border border-gray-100 rounded-lg bg-white overflow-hidden shrink-0">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                item.quantity > 1
                                  ? updateQuantity(
                                      item.productId,
                                      item.quantity - 1
                                    )
                                  : removeFromCart(item.productId);
                              }}
                              className="px-1.5 py-1 hover:bg-gray-100"
                            >
                              <MinusIcon className="w-3 h-3" />
                            </button>
                            <span className="px-1.5 text-xs font-bold text-black min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                updateQuantity(
                                  item.productId,
                                  item.quantity + 1
                                );
                              }}
                              className="px-1.5 py-1 hover:bg-gray-100"
                            >
                              <PlusIcon className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Link
                      to="/cart"
                      className="block w-full bg-blue-600 text-white text-center py-3 rounded-xl font-bold hover:bg-blue-700 transition text-sm"
                      onClick={() => setIsCartOpen(false)}
                    >
                      Review Bag
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {user ? (
            <div className="flex items-center gap-2 border-l pl-3 md:pl-5 ml-1">
              <Link
                to="/mypage"
                className="hidden sm:flex flex-col items-end leading-tight group"
              >
                <span className="text-[10px] text-gray-400 font-bold uppercase">
                  Welcome
                </span>
                <span className="text-[12px] font-bold text-black group-hover:text-blue-600">
                  {user.loginId}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-red-500 transition"
              >
                <ArrowRightOnRectangleIcon className="w-6 h-6" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="border-l pl-3 ml-1">
              <IconButton>
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
