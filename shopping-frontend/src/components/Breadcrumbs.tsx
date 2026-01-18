import React from "react";
import { Link } from "react-router-dom";

interface BreadcrumbProps {
  category?: string;
  productName?: string;
}

const Breadcrumbs: React.FC<BreadcrumbProps> = ({ category, productName }) => {
  return (
    <nav className="flex items-center gap-2 py-8 text-[16px] font-medium text-[#A7A7A7]">
      <Link to="/" className="hover:text-black transition">
        Home
      </Link>
      <span>{">"}</span>
      <Link to="/products" className="hover:text-black transition">
        Catalog
      </Link>

      {category && (
        <>
          <span>{">"}</span>
          <Link
            to={`/products?category=${category}`}
            className="hover:text-black transition capitalize"
          >
            {category.replace("-", " ")}
          </Link>
        </>
      )}

      {productName && (
        <>
          <span>{">"}</span>
          <span className="text-black truncate max-w-[200px] md:max-w-none">
            {productName}
          </span>
        </>
      )}
    </nav>
  );
};

export default Breadcrumbs;
