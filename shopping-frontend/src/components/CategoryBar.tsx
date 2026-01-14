import React from "react";
import {
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  ClockIcon,
  CameraIcon,
  SpeakerWaveIcon,
  DeviceTabletIcon,
} from "@heroicons/react/24/outline";

const categories = [
  { name: "Phones", icon: <DevicePhoneMobileIcon /> },
  { name: "Smart Watches", icon: <ClockIcon /> },
  { name: "Cameras", icon: <CameraIcon /> },
  { name: "Headphones", icon: <SpeakerWaveIcon /> },
  { name: "Computers", icon: <ComputerDesktopIcon /> },
  { name: "Gaming", icon: <DeviceTabletIcon /> },
];

const CategoryBar: React.FC = () => (
  <section className="py-20 bg-white">
    <div className="max-w-[1120px] mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-medium">Browse By Category</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="bg-[#EDEDED] rounded-xl h-32 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-black hover:text-white transition group"
          >
            <div className="w-12 h-12 group-hover:invert-0">{cat.icon}</div>
            <span className="font-medium">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CategoryBar;
