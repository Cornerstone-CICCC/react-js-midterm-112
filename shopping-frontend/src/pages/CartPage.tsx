import React from "react";
import { useCart } from "../context/CartContext";
import {
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, loading } = useCart();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (loading && cartItems.length === 0)
    return <div className="py-40 text-center font-bold">Loading...</div>;

  return (
    <div className="bg-[#FBFAFC] min-h-screen py-16 text-gray-900">
      <div className="max-w-[1100px] mx-auto px-6">
        <h1 className="text-4xl font-black mb-12">Review your bag.</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] p-20 text-center border shadow-sm">
            <ShoppingBagIcon className="w-16 h-16 text-gray-200 mx-auto mb-6" />
            <h2 className="text-2xl font-bold">Your bag is empty.</h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="bg-white rounded-3xl p-6 flex gap-6 border border-gray-50 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="w-24 h-24 bg-gray-50 rounded-2xl flex-shrink-0 flex items-center justify-center p-2">
                    <img
                      src={item.images}
                      onError={(e) =>
                        (e.currentTarget.src =
                          "https://placehold.co/200x200?text=No+Image")
                      }
                      className="max-h-full object-contain mix-blend-multiply"
                      alt={item.title}
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between font-bold">
                      <span className="text-lg truncate max-w-[200px]">
                        {item.title}
                      </span>
                      <span className="text-xl">
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                        >
                          <MinusIcon className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="w-10 text-center font-bold text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                        >
                          <PlusIcon className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-gray-300 hover:text-red-500 font-bold text-xs"
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white rounded-[2rem] p-8 border border-gray-50 shadow-sm sticky top-10">
                <h2 className="text-xl font-bold mb-6 text-gray-900">
                  Order Summary
                </h2>
                <div className="space-y-4 mb-6 pb-6 border-b border-gray-100 font-medium text-gray-500">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                </div>
                <div className="flex justify-between text-3xl font-black text-gray-900 mb-8">
                  <span>Total</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-xl shadow-xl shadow-blue-50 hover:bg-blue-700 transition-all">
                  Check Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
