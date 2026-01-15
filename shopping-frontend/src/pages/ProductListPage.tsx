import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  FunnelIcon,
  ArrowsUpDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const FilterSection = styled.aside`
  width: 260px;
  flex-shrink: 0;
  @media (max-width: 1024px) {
    display: none;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 32px;
`;

const CategoryButton = styled.label`
  display: flex;
  align-items: center;
  padding: 8px 0;
  cursor: pointer;
  font-size: 15px;
  color: #1d1d1f;
  transition: color 0.2s;

  input {
    margin-right: 12px;
    width: 18px;
    height: 18px;
    accent-color: #0066cc;
  }

  &:hover {
    color: #0066cc;
  }
`;

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("latest");

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3500/products");
        const data = await response.json();
        const list = Array.isArray(data) ? data : data.products || [];

        setProducts(list);

        const uniqueCats = Array.from(
          new Set(list.map((p: any) => p.category))
        ).filter(Boolean) as string[];
        setCategories(uniqueCats);
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.category &&
            p.category.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    if (sortBy === "low-price") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "high-price") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "name")
      result.sort((a, b) => a.title.localeCompare(b.title));

    setFilteredProducts(result);
  }, [searchQuery, selectedCategories, sortBy, products]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const getProductImage = (item: any) => {
    if (item.images)
      return Array.isArray(item.images) ? item.images[0] : item.images;
    return item.image || "https://placehold.co/400x400?text=No+Image";
  };

  if (loading)
    return <div className="py-40 text-center font-bold">Loading tech...</div>;

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-4">
          {searchQuery ? `Results for "${searchQuery}"` : "All Products"}
        </h1>
        <p className="text-gray-500 font-medium">
          {filteredProducts.length} items available
        </p>
      </div>

      <div className="flex gap-12">
        <FilterSection>
          <div className="mb-10">
            <h3 className="flex items-center gap-2 font-bold text-lg mb-6">
              <FunnelIcon className="w-5 h-5" /> Filter by Category
            </h3>
            <div className="flex flex-col gap-1">
              {categories.map((cat) => (
                <CategoryButton key={cat}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                  />
                  {cat}
                </CategoryButton>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t">
            <h3 className="flex items-center gap-2 font-bold text-lg mb-6">
              <ArrowsUpDownIcon className="w-5 h-5" /> Sort by
            </h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-[#F5F5F7] border-none rounded-xl p-4 font-medium outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="latest">Latest Items</option>
              <option value="low-price">Price: Low to High</option>
              <option value="high-price">Price: High to Low</option>
              <option value="name">Product Name (A-Z)</option>
            </select>
          </div>
        </FilterSection>

        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <ProductGrid>
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="group cursor-pointer bg-white rounded-[2.5rem] p-6 transition-all hover:shadow-2xl hover:shadow-gray-100 border border-transparent hover:border-gray-100"
                >
                  <div className="aspect-square bg-[#F5F5F7] rounded-[2rem] mb-6 flex items-center justify-center p-8 overflow-hidden">
                    <img
                      src={getProductImage(product)}
                      alt={product.title}
                      className="max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 block">
                      {product.category}
                    </span>
                    <h2 className="text-xl font-bold text-black mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {product.title}
                    </h2>
                    <p className="text-2xl font-black text-black">
                      ${product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </ProductGrid>
          ) : (
            <div className="py-24 text-center">
              <div className="bg-[#F5F5F7] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <MagnifyingGlassIcon className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-2xl font-bold mb-2">No results found.</h3>
              <p className="text-gray-500 mb-8">
                Try using different keywords or filters.
              </p>
              <button
                onClick={() => {
                  navigate("/products");
                  setSelectedCategories([]);
                }}
                className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
