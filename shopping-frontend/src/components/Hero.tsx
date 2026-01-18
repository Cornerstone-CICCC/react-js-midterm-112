import React from "react";
import styled from "styled-components";
import IphoneImage from "../assets/image/iphone-14-pro.png";

const BuyButton = styled.button`
  border: 1px solid #fff;
  padding: 16px 56px;
  border-radius: 6px;
  color: #fff;
  transition: all 0.3s;
  &:hover {
    background: #fff;
    color: #000;
  }
`;

const Hero: React.FC = () => (
  <section className="w-full bg-[#211C24] overflow-hidden">
    <div className="max-w-[1120px] mx-auto px-4 min-h-[632px] flex flex-col md:flex-row items-center justify-between">
      <div className="pt-12 md:pt-0 text-center md:text-left">
        <span className="text-[25px] font-semibold text-white/40">
          Pro.Beyond.
        </span>
        <h1 className="text-white text-[72px] md:text-[96px] font-thin leading-none tracking-tighter">
          iPhone 14 <span className="font-bold">Pro</span>
        </h1>
        <p className="text-[#909090] text-[18px] my-8">
          Created to change everything for the better. For everyone.
        </p>
        <BuyButton>Buy Now</BuyButton>
      </div>
      <div className="relative mt-10 md:mt-0 flex items-end">
        <img
          src={IphoneImage}
          alt="iPhone 14 Pro"
          className="w-full max-w-[500px] z-10"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full" />
      </div>
    </div>
  </section>
);

export default Hero;
