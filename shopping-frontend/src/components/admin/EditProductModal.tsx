import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const CATEGORIES = ["laptops", "tablets", "mobile-accessories", "smartphones"];

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product: any;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  product,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    brand: "",
    images: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        description: product.description || "",
        category: product.category || "",
        price: product.price?.toString() || "",
        stock: product.stock?.toString() || "",
        brand: product.brand || "",
        images: Array.isArray(product.images)
          ? product.images[0]
          : product.images || "",
      });
    }
  }, [product, isOpen]);

  if (!isOpen || !product) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3500/products/${product._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            ...formData,
            price: Number(formData.price),
            stock: Number(formData.stock),
            thumbnail: formData.images,
          }),
        },
      );

      if (response.ok) {
        onSuccess();
        onClose();
      } else {
        const errorData = await response.json();
        alert(`Update failed: ${errorData.message}`);
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-black"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-black mb-6">Edit Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">
                Title
              </label>
              <input
                type="text"
                required
                className="w-full bg-gray-50 rounded-xl p-3 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">
                Brand
              </label>
              <input
                type="text"
                required
                className="w-full bg-gray-50 rounded-xl p-3 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.brand}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">
                Category
              </label>
              <select
                required
                className="w-full bg-gray-50 rounded-xl p-3 mt-1 outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">
                Price ($)
              </label>
              <input
                type="number"
                required
                className="w-full bg-gray-50 rounded-xl p-3 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">
                Stock
              </label>
              <input
                type="number"
                required
                className="w-full bg-gray-50 rounded-xl p-3 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
              />
            </div>

            <div className="col-span-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">
                Description
              </label>
              <textarea
                required
                className="w-full bg-gray-50 rounded-xl p-3 mt-1 outline-none h-24 resize-none focus:ring-2 focus:ring-blue-500"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div className="col-span-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">
                Image URL
              </label>
              <input
                type="text"
                required
                className="w-full bg-gray-50 rounded-xl p-3 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.images}
                onChange={(e) =>
                  setFormData({ ...formData, images: e.target.value })
                }
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-2xl font-bold mt-4 hover:bg-gray-800 transition shadow-lg"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
