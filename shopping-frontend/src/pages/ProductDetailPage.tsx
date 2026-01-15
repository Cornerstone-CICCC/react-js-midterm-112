import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const fadeInOut = keyframes`
  0% { opacity: 0; transform: translate(-50%, -20px); }
  15% { opacity: 1; transform: translate(-50%, 0); }
  85% { opacity: 1; transform: translate(-50%, 0); }
  100% { opacity: 0; transform: translate(-50%, -20px); }
`;

const Toast = styled.div`
  position: fixed;
  top: 100px;
  left: 50%;
  background: #333;
  color: #fff;
  padding: 12px 24px;
  border-radius: 50px;
  z-index: 1000;
  animation: ${fadeInOut} 2.5s ease-in-out forwards;
`;

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to load product data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="py-40 text-center">Loading...</div>;
  if (!product)
    return <div className="py-40 text-center">Product not found.</div>;

  const handleAddCart = () => {
    addToCart(product, quantity);
    setToastMsg(`Added to Cart: ${product.title}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  return (
    <div className="max-w-[1120px] mx-auto px-4 py-16">
      {showToast && <Toast>{toastMsg}</Toast>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div className="flex gap-4">
          <div className="flex flex-col gap-4">
            {product.images?.slice(0, 4).map((img: string, i: number) => (
              <div
                key={i}
                className="w-20 h-20 bg-gray-50 rounded-xl border border-gray-100 p-2 overflow-hidden"
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
          <div className="flex-1 bg-gray-50 rounded-3xl p-10 flex items-center justify-center">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="max-w-full"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-6">{product.title}</h1>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-3xl font-bold text-blue-600">
              ${product.price}
            </span>
            <span className="text-xl text-gray-400 line-through">
              ${(product.price * 1.15).toFixed(2)}
            </span>
          </div>

          <p className="text-gray-500 mb-10 leading-relaxed">
            {product.description}
          </p>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-400">
                Quantity
              </span>
              <div className="flex items-center border rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-5 py-3 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-8 font-bold text-lg border-x">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-5 py-3 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAddCart}
                className="w-full bg-black text-white py-5 rounded-xl font-bold hover:bg-gray-800 transition text-lg shadow-lg"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-16">
        <h2 className="text-2xl font-bold mb-8">Product Details</h2>
        <div className="bg-gray-50 rounded-3xl p-10 space-y-6 text-sm text-gray-600">
          <div className="flex justify-between border-b pb-4">
            <span>Brand</span>
            <span className="font-bold text-black">{product.brand}</span>
          </div>
          <div className="flex justify-between border-b pb-4">
            <span>Category</span>
            <span className="font-bold text-black">{product.category}</span>
          </div>
          <div className="flex justify-between border-b pb-4">
            <span>Stock Status</span>
            <span className="font-bold text-black">
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
