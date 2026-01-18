import React from "react";
import { Images } from "../assets/image";

const BannerGrid: React.FC = () => (
  <section className="w-full flex flex-col lg:flex-row overflow-hidden">
    <div className="w-full lg:w-1/2 flex flex-col">
      <div className="relative bg-white h-[300px] flex items-center overflow-hidden">
        <img
          src={Images.ps5}
          className="absolute left-0 bottom-0 h-full object-contain object-left-bottom"
        />
        <div className="relative z-20 ml-auto w-1/2 p-8">
          <h2 className="text-5xl font-medium">Playstation 5</h2>
          <p className="text-[#909090] text-sm mt-4">
            Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O.
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row h-[300px]">
        <div className="flex-1 bg-[#EDEDED] relative flex items-center overflow-hidden">
          <img
            src={Images.airpods}
            className="absolute left-0 h-[80%] object-contain"
          />
          <div className="ml-auto w-2/3 p-6 z-20">
            <h3 className="text-3xl font-light">
              Apple AirPods <span className="font-bold">Max</span>
            </h3>
          </div>
        </div>
        <div className="flex-1 bg-[#353535] text-white relative flex items-center overflow-hidden">
          <img
            src={Images.visionPro}
            className="absolute left-0 h-[80%] object-contain"
          />
          <div className="ml-auto w-2/3 p-6 z-20">
            <h3 className="text-3xl font-light">
              Apple Vision <span className="font-bold">Pro</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
    <div className="w-full lg:w-1/2 bg-[#EDEDED] relative flex items-center min-h-[500px]">
      <div className="p-14 z-20 w-1/2">
        <h2 className="text-6xl font-light">
          Macbook <span className="font-bold">Air</span>
        </h2>
        <p className="text-[#909090] my-6">
          The new 15-inch MacBook Air makes room for more of what you love.
        </p>
        <button className="border border-black px-12 py-3 rounded-md hover:bg-black hover:text-white transition">
          Shop Now
        </button>
      </div>
      <img
        src={Images.macbook}
        className="absolute right-0 bottom-0 w-[60%] h-full object-contain object-right-bottom"
      />
    </div>
  </section>
);

export default BannerGrid;
