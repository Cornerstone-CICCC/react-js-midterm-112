import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  ShoppingBagIcon,
  ChevronLeftIcon,
  MinusIcon,
  PlusIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3500/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const getImageUrl = () => {
    if (!product) return "";
    if (product.images)
      return Array.isArray(product.images) ? product.images[0] : product.images;
    return product.image || "https://via.placeholder.com/600";
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  if (loading)
    return (
      <div className="py-40 text-center font-bold text-xl text-gray-900">
        Loading details...
      </div>
    );

  if (!product)
    return (
      <div className="py-40 text-center font-bold text-xl text-gray-900">
        Product not found.
      </div>
    );

  return (
    <div className="max-w-[1120px] mx-auto px-6 py-12">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-400 hover:text-black transition mb-12 group"
      >
        <ChevronLeftIcon className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
        Back to list
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div className="bg-[#F5F5F7] rounded-[3rem] p-12 aspect-square flex items-center justify-center sticky top-32">
          <img
            src={getImageUrl()}
            alt={product.title}
            className="max-h-full object-contain hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="py-4">
          <span className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-4 block">
            {product.category}
          </span>
          <h1 className="text-5xl font-black text-black mb-6 leading-tight">
            {product.title}
          </h1>
          <p className="text-3xl font-medium text-gray-900 mb-10">
            ${product.price?.toLocaleString()}
          </p>

          <div className="border-t border-b border-gray-100 py-8 mb-10">
            <p className="text-gray-600 leading-relaxed text-lg">
              {product.description ||
                "No detailed description is available for this product yet. Experience the amazing performance powered by the latest technology."}
            </p>
          </div>

          <div className="flex flex-col gap-4 mb-8">
            <span className="font-bold text-gray-900">Quantity</span>
            <div className="flex items-center w-max border-2 border-gray-100 rounded-2xl p-1 bg-white shadow-sm">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:bg-gray-50 rounded-xl transition"
              >
                <MinusIcon className="w-5 h-5" />
              </button>
              <span className="px-8 font-black text-xl min-w-[4rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 hover:bg-gray-50 rounded-xl transition"
              >
                <PlusIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all active:scale-95 ${
                isAdded
                  ? "bg-green-600 text-white"
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-100"
              }`}
            >
              {isAdded ? (
                <>
                  <CheckCircleIcon className="w-6 h-6" />
                  Added to Bag
                </>
              ) : (
                <>
                  <ShoppingBagIcon className="w-6 h-6" />
                  Add to Bag
                </>
              )}
            </button>
          </div>

          <p className="mt-8 text-center text-gray-400 text-sm">
            Free shipping and free returns on all orders.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
