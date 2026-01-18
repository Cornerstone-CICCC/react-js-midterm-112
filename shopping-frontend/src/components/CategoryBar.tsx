import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ComputerDesktopIcon,
  DeviceTabletIcon,
  SparklesIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";

const categories = [
  { name: "Laptops", icon: <ComputerDesktopIcon />, slug: "laptops" },
  { name: "Tablets", icon: <DeviceTabletIcon />, slug: "tablets" },
  { name: "Accessories", icon: <SparklesIcon />, slug: "mobile-accessories" },
  { name: "Smartphones", icon: <DevicePhoneMobileIcon />, slug: "smartphone" },
];

const CategoryBar: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (slug: string) => {
    navigate(`/products?category=${slug}`);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1120px] mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-black">
            Browse By Category
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <div
              key={i}
              onClick={() => handleCategoryClick(cat.slug)}
              className="bg-[#F5F5F5] rounded-2xl h-40 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-black hover:text-white transition-all duration-300 group border border-transparent hover:shadow-xl"
            >
              <div className="w-14 h-14 transition-transform group-hover:scale-110">
                {cat.icon}
              </div>
              <span className="font-semibold text-[16px]">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryBar;
