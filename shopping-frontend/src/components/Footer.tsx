import React from "react";
import styled from "styled-components";

const SocialIcon = styled.a`
  color: #ffffff;
  font-size: 20px;
  transition: opacity 0.3s ease;
  &:hover {
    opacity: 0.6;
  }
`;

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-16 md:py-24">
      <div className="max-w-[1120px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
          <div className="flex flex-col gap-6">
            <h2 className="text-[24px] font-bold">TechMarket</h2>
            <p className="text-[#909090] text-[14px] leading-relaxed max-w-[300px]">
              We are a residential interior design firm located in Portland. Our
              boutique-studio offers more than.
            </p>
            <div className="flex gap-6 mt-4">
              <SocialIcon href="#">
                <i className="fab fa-twitter"></i>
              </SocialIcon>
              <SocialIcon href="#">
                <i className="fab fa-facebook-f"></i>
              </SocialIcon>
              <SocialIcon href="#">
                <i className="fab fa-tiktok"></i>
              </SocialIcon>
              <SocialIcon href="#">
                <i className="fab fa-instagram"></i>
              </SocialIcon>
            </div>
          </div>
          <div>
            <h4 className="text-[16px] font-bold mb-6">Services</h4>
            <ul className="text-[#CFCFCF] text-[14px] flex flex-col gap-4">
              <li>
                <a href="#" className="hover:text-white transition">
                  Bonus program
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Gift cards
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Credit and payment
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Service contracts
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-[16px] font-bold mb-6">
              Assistance to the buyer
            </h4>
            <ul className="text-[#CFCFCF] text-[14px] flex flex-col gap-4">
              <li>
                <a href="#" className="hover:text-white transition">
                  Find an order
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Terms of delivery
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Exchange and return of goods
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Guarantee
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
