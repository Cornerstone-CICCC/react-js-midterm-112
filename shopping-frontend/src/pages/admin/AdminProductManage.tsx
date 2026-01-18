import React, { useEffect, useState } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import AddProductModal from "../../components/admin/AddProductModal";
import EditProductModal from "../../components/admin/EditProductModal";

const AdminProductManage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:3500/products", {
        credentials: "include",
      });
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : data.products || []);
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete [${title}]?`)) {
      try {
        const res = await fetch(`http://localhost:3500/products/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (res.ok) {
          setProducts((prev) => prev.filter((p) => p._id !== id));
        } else {
          alert("You do not have permission or an error occurred.");
        }
      } catch (err) {
        alert("An error occurred during deletion.");
      }
    }
  };

  const openEditModal = (product: any) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] p-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-black text-black mb-2">
              Product Inventory
            </h1>
            <p className="text-gray-500 font-medium">
              You can view, edit, or delete store products here.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchProducts}
              className="p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition"
              title="Refresh"
            >
              <ArrowPathIcon
                className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`}
              />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100"
            >
              <PlusIcon className="w-5 h-5" />
              Add Product
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by title..."
              className="w-full bg-white border border-gray-200 rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative min-w-[200px]">
            <FunnelIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select
              className="w-full bg-white border border-gray-200 rounded-2xl py-3 pl-12 pr-10 outline-none appearance-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-sm font-medium text-gray-700"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-8 py-5 font-bold text-gray-400 uppercase text-[11px] tracking-widest">
                  Product Info
                </th>
                <th className="px-6 py-5 font-bold text-gray-400 uppercase text-[11px] tracking-widest">
                  Category
                </th>
                <th className="px-6 py-5 font-bold text-gray-400 uppercase text-[11px] tracking-widest">
                  Price
                </th>
                <th className="px-6 py-5 font-bold text-gray-400 uppercase text-[11px] tracking-widest text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="py-20 text-center text-gray-400 font-medium"
                  >
                    Loading items...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="py-20 text-center text-gray-400 font-medium"
                  >
                    {searchTerm || selectedCategory !== "All"
                      ? "No products match your search."
                      : "No products registered yet."}
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-50 transition-colors group"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center p-2 border border-gray-100 group-hover:bg-white transition">
                          <img
                            src={
                              Array.isArray(product.images)
                                ? product.images[0]
                                : product.images
                            }
                            alt={product.title}
                            className="max-h-full object-contain mix-blend-multiply"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-black text-[15px]">
                            {product.title}
                          </p>
                          <p className="text-[12px] text-gray-400 font-medium">
                            ID: {product._id.slice(-6).toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[12px] font-bold">
                        {product.category || "General"}
                      </span>
                    </td>
                    <td className="px-6 py-5 font-black text-black">
                      ${product.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit"
                        >
                          <PencilSquareIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() =>
                            handleDelete(product._id, product.title)
                          }
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchProducts}
      />

      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={fetchProducts}
        product={selectedProduct}
      />
    </div>
  );
};

export default AdminProductManage;
