import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import {
  ShoppingCartIcon,
  TrashIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const WishlistPage: React.FC = () => {
  const { user } = useAuth();
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      alert("Please login to access your wishlist.");
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="max-w-[1120px] mx-auto py-20 px-4 min-h-[70vh]">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-extrabold text-black">
          My Wishlist{" "}
          <span className="text-gray-400 font-medium text-2xl">
            ({wishlistItems.length})
          </span>
        </h1>
        <Link
          to="/"
          className="text-sm font-bold flex items-center gap-2 hover:underline"
        >
          Continue Shopping <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-32 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
          <h2 className="text-2xl font-bold mb-2">Your wishlist is empty.</h2>
          <p className="text-gray-500 mb-8">
            Save items you love to find them easily.
          </p>
          <Link
            to="/"
            className="inline-block bg-black text-white px-8 py-4 rounded-2xl font-bold"
          >
            Go Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col bg-white border border-gray-100 rounded-[32px] p-6 hover:shadow-xl transition-all"
            >
              <button
                onClick={() => toggleWishlist(item)}
                className="absolute top-6 right-6 z-10 p-2 bg-white border rounded-full text-gray-400 hover:text-red-500 transition"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
              <Link
                to={`/product/${item.id}`}
                className="block mb-6 bg-gray-50 rounded-2xl aspect-square flex items-center justify-center p-8"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-contain group-hover:scale-110 transition duration-500"
                />
              </Link>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 truncate">
                  {item.title}
                </h3>
                <p className="text-blue-600 font-extrabold text-lg mb-6">
                  ${item.price.toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => addToCart(item, 1)}
                className="w-full bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition"
              >
                <ShoppingCartIcon className="w-5 h-5" /> Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
