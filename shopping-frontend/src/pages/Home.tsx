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

  useEffect(() => {
    const fetchDBProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3500/products");
        const data = await res.json();

        const list = Array.isArray(data) ? data : data.products || [];

        setAllProducts(list);
      } catch (err) {
        console.error("DB Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDBProducts();
  }, []);

  useEffect(() => {
    if (allProducts.length === 0) return;

    let sorted = [...allProducts];

    if (activeTab === "Best Seller") {
      sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (activeTab === "Featured Products") {
      sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else {
      sorted.sort((a, b) => b._id.localeCompare(a._id));
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
          <div className="text-center py-20 text-gray-400 font-bold italic">
            Loading Tech Items...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {!loading && displayProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No products found in DB.
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
