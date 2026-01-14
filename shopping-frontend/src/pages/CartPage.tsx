import React from "react";
import { useCart } from "../context/CartContext";
import { XMarkIcon } from "@heroicons/react/24/outline";

const CartPage: React.FC = () => {
  const { cartItems, addToCart, removeFromCart, totalPrice } = useCart();
  const tax = 50;
  const shipping = 29;

  if (cartItems.length === 0)
    return <div className="py-40 text-center">Your cart is empty.</div>;

  return (
    <div className="max-w-[1120px] mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-20">
      <div>
        <h1 className="text-2xl font-bold mb-10">Shopping Cart</h1>
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 py-6 border-b border-gray-100"
          >
            <img
              src={item.thumbnail}
              className="w-20 h-20 object-contain"
              alt={item.title}
            />
            <div className="flex-1">
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-gray-400">#{item.id}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded">
                <button
                  onClick={() => removeFromCart(item.id, true)}
                  className="px-3 py-1 hover:bg-gray-50"
                >
                  -
                </button>
                <span className="px-3 border-x">{item.quantity}</span>
                <button
                  onClick={() => addToCart(item, 1)}
                  className="px-3 py-1 hover:bg-gray-50"
                >
                  +
                </button>
              </div>
              <p className="font-bold w-20 text-right">
                ${(item.price * item.quantity).toLocaleString()}
              </p>
              <button onClick={() => removeFromCart(item.id)}>
                {" "}
                <XMarkIcon className="w-5 h-5 text-gray-300 hover:text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-10">Order Summary</h2>
        <div className="space-y-6">
          <div>
            <label className="text-sm text-gray-400 block mb-2">
              Discount code / Promo code
            </label>
            <input
              type="text"
              placeholder="Code"
              className="w-full border p-3 rounded-lg outline-none focus:border-black"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 block mb-2">
              Your bonus card number
            </label>
            <div className="flex border rounded-lg overflow-hidden">
              <input
                type="text"
                placeholder="Enter Card Number"
                className="flex-1 p-3 outline-none"
              />
              <button className="px-6 border-l hover:bg-gray-50 font-medium">
                Apply
              </button>
            </div>
          </div>
          <div className="pt-6 space-y-3 font-medium">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>${totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-400 text-sm">
              <span>Estimated Tax</span>
              <span className="text-black">${tax}</span>
            </div>
            <div className="flex justify-between text-gray-400 text-sm">
              <span>Shipping & Handling</span>
              <span className="text-black">${shipping}</span>
            </div>
            <div className="flex justify-between text-xl font-bold pt-4 border-t mt-4">
              <span>Total</span>
              <span>${(totalPrice + tax + shipping).toLocaleString()}</span>
            </div>
          </div>
          <button className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
