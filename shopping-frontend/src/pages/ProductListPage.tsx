import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import ProductCard from "../components/ProductCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const PageContainer = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 16px;
  display: flex;
  gap: 32px;
`;

const FilterSidebar = styled.aside`
  width: 256px;
  flex-shrink: 0;
  display: none;
  @media (min-width: 1024px) {
    display: block;
  }
`;

const ProductGridSection = styled.section`
  flex-grow: 1;
`;

const ProductListPage: React.FC = () => {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [displayProducts, setDisplayProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState<string>(
    categoryParam || "all"
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const allowedCategories = [
    "smartphones",
    "laptops",
    "tablets",
    "mobile-accessories",
  ];

  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/products?limit=100")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.products.filter((p: any) =>
          allowedCategories.includes(p.category)
        );
        setAllProducts(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory("all");
    }
    setSelectedBrands([]);
  }, [categoryParam]);

  useEffect(() => {
    let filtered = [...allProducts];

    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) => selectedBrands.includes(p.brand));
    }

    if (searchTerm) {
      const query = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query)
      );
    }

    setDisplayProducts(filtered);
  }, [selectedCategory, selectedBrands, searchTerm, allProducts]);

  const handleCategoryChange = (cat: string) => {
    if (cat === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams);
    setSelectedCategory(cat);
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const availableBrands = Array.from(
    new Set(allProducts.map((p) => p.brand))
  ).sort();

  return (
    <PageContainer>
      <FilterSidebar>
        <div className="mb-10">
          <h3 className="font-bold text-lg mb-4 border-b pb-2">Category</h3>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleCategoryChange("all")}
              className={`text-left text-sm ${
                selectedCategory === "all"
                  ? "font-bold text-black"
                  : "text-[#989898]"
              }`}
            >
              All Products
            </button>
            {allowedCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`text-left text-sm capitalize ${
                  selectedCategory === cat
                    ? "font-bold text-black"
                    : "text-[#989898]"
                }`}
              >
                {cat.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4 border-b pb-2">Brand</h3>
          <div className="max-h-[400px] overflow-y-auto pr-2 space-y-3">
            {availableBrands.map((brand) => (
              <label
                key={brand}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-black cursor-pointer"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                />
                <span className="text-sm text-[#989898] group-hover:text-black transition-colors">
                  {brand}
                </span>
              </label>
            ))}
          </div>
        </div>
      </FilterSidebar>

      <ProductGridSection>
        <div className="mb-8 space-y-6">
          <div className="relative max-w-md">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Search products or brands..."
              className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center">
            <p className="text-[#8B8B8B] text-sm">
              Selected Products:{" "}
              <span className="text-black font-bold">
                {displayProducts.length}
              </span>
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        ) : displayProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-40 bg-gray-50 rounded-[32px] border border-dashed border-gray-200">
            <p className="text-gray-500 font-medium">
              No products found for this filter.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedBrands([]);
              }}
              className="mt-4 text-sm font-bold underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </ProductGridSection>
    </PageContainer>
  );
};

export default ProductListPage;
