import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import BannerGrid from "../components/BannerGrid";
import CategoryBar from "../components/CategoryBar";
import ProductCard from "../components/ProductCard";

const Home: React.FC = () => {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [displayProducts, setDisplayProducts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("New Arrival");
  const [loading, setLoading] = useState(true);

  const allowedCategories = [
    "laptops",
    "mobile-accessories",
    "smartphones",
    "tablets",
  ];

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.products.filter((p: any) =>
          allowedCategories.includes(p.category)
        );
        setAllProducts(filtered);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let sorted = [...allProducts];

    if (activeTab === "Best Seller") {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (activeTab === "Featured Products") {
      sorted.sort((a, b) => b.discountPercentage - a.discountPercentage);
    } else {
      sorted.sort((a, b) => b.id - a.id);
    }

    setDisplayProducts(sorted.slice(0, 8));
  }, [activeTab, allProducts]);

  const tabs = ["New Arrival", "Best Seller", "Featured Products"];

  return (
    <main className="w-full">
      <Hero />
      <BannerGrid />
      <CategoryBar />

      <section className="max-w-[1120px] mx-auto px-4 py-20">
        <div className="flex gap-8 mb-8 border-b border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-[16px] transition-all ${
                activeTab === tab
                  ? "border-b-2 border-black font-medium text-black"
                  : "text-[#8B8B8B]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
