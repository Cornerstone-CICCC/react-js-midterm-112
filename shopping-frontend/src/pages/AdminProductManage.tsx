import React, { useEffect, useState } from "react";

const AdminProductManage = () => {
  const [products, setProducts] = useState<any[]>([]);

  // DB에서 전체 상품 가져오기
  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3500/products");
    const data = await res.json();
    setProducts(Array.isArray(data) ? data : data.products || []);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 상품 삭제 로직
  const handleDelete = async (id: string) => {
    if (window.confirm("정말 이 상품을 삭제하시겠습니까?")) {
      await fetch(`http://localhost:3500/products/${id}`, { method: "DELETE" });
      fetchProducts(); // 목록 새로고침
    }
  };

  return (
    <div className="p-10 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-black">Manage Products</h1>
        <button className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition">
          + Add New Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b-2 border-gray-100">
            <tr>
              <th className="pb-4 font-bold text-gray-400 uppercase text-xs">
                Product
              </th>
              <th className="pb-4 font-bold text-gray-400 uppercase text-xs">
                Category
              </th>
              <th className="pb-4 font-bold text-gray-400 uppercase text-xs">
                Price
              </th>
              <th className="pb-4 font-bold text-gray-400 uppercase text-xs text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((product) => (
              <tr
                key={product._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="py-6 flex items-center gap-4">
                  <img
                    src={product.images[0]}
                    className="w-12 h-12 rounded-lg object-contain bg-gray-100"
                  />
                  <span className="font-bold">{product.title}</span>
                </td>
                <td className="py-6 text-gray-500 font-medium">
                  {product.category}
                </td>
                <td className="py-6 font-bold">
                  ${product.price.toLocaleString()}
                </td>
                <td className="py-6 text-right">
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-500 font-bold hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductManage;
