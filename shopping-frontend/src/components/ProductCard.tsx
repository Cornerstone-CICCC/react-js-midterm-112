import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Card = styled.div`
  background-color: #f6f6f6;
  border-radius: 9px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #ffffff;
    box-shadow: 0px 32px 64px -12px rgba(0, 0, 0, 0.14);
  }
`;

const BuyButton = styled.button`
  width: 100%;
  background-color: #000;
  color: #fff;
  padding: 12px 0;
  border-radius: 8px;
  font-weight: 500;
  margin-top: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #333;
  }
`;

const ProductCard: React.FC<{ product: any }> = ({ product }) => {
  const navigate = useNavigate();

  const handleNavigateToDetail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  return (
    <Card onClick={() => navigate(`/product/${product.id}`)}>
      <div className="w-full h-[160px] flex items-center justify-center mb-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="max-h-full object-contain mix-blend-multiply"
        />
      </div>
      <div className="text-center">
        <h3 className="text-[16px] font-medium h-12 line-clamp-2">
          {product.title}
        </h3>
        <span className="text-[24px] font-bold">
          ${product.price.toLocaleString()}
        </span>
      </div>

      <BuyButton onClick={handleNavigateToDetail}>Buy Now</BuyButton>
    </Card>
  );
};

export default ProductCard;
