import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Card = styled.div`
  background-color: #f6f6f6;
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid transparent;

  &:hover {
    background-color: #ffffff;
    box-shadow: 0px 32px 64px -12px rgba(0, 0, 0, 0.14);
    border-color: #eee;
    transform: translateY(-4px);
  }
`;

const BuyButton = styled.button`
  width: 100%;
  background-color: #000;
  color: #fff;
  padding: 14px 0;
  border-radius: 12px;
  font-weight: 600;
  margin-top: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #333;
    transform: scale(1.02);
  }
`;

const ProductCard: React.FC<{ product: any }> = ({ product }) => {
  const navigate = useNavigate();

  const productId = product._id || product.id;

  const getProductImage = () => {
    if (product.thumbnail) return product.thumbnail;
    if (product.images && Array.isArray(product.images))
      return product.images[0];
    if (typeof product.images === "string") return product.images;
    return "https://placehold.co/400x400?text=No+Image";
  };

  const handleNavigateToDetail = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (productId) {
      navigate(`/product/${productId}`);
    } else {
      console.error("Product ID is missing:", product);
    }
  };

  return (
    <Card onClick={handleNavigateToDetail}>
      <div className="w-full h-[180px] flex items-center justify-center mb-6 overflow-hidden rounded-xl">
        <img
          src={getProductImage()}
          alt={product.title}
          className="max-h-full object-contain transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="text-center w-full">
        <h3 className="text-[16px] font-bold text-black h-12 line-clamp-2 mb-2 px-2">
          {product.title}
        </h3>
        <p className="text-[24px] font-black text-black">
          ${product.price?.toLocaleString() || "0"}
        </p>
      </div>

      <BuyButton onClick={handleNavigateToDetail}>Buy Now</BuyButton>
    </Card>
  );
};

export default ProductCard;
