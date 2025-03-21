import { Pizza, Facebook, Instagram } from "lucide-react";
import React from "react";
// import { useNavigate } from "react-router-dom";

const Footer = () => {
  // const navigate = useNavigate();

  // const handleClick = () => {
  //   navigate('/new-path');
  // };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-10 gap-12 bg-[#1A1A1A] text-[#FAFAFA]">
      {/* Middle section of footer */}
      <div className="w-full max-w-[1440px] mx-auto flex flex-wrap p-6 md:px-6 my-5">
        {/* Logo Section */}
        <div className="flex-1 min-w-[300px] w-full mx-auto text-white rounded-lg my-5">
          <div className="flex items-center gap-3 justify-start">
            <Pizza className="w-6 h-6" />
            <h4 className="font-bold italic text-left sm:text-lg">Logo will here</h4>
          </div>
        </div>
        {/* Navigation Section */}
        <div className="flex-1 p-6 text-white flex flex-col md:flex-row justify-between gap-6">
          {/* Balkana Section */}
          <div className="flex flex-col gap-2">
            <span className="text-gray-400">BALKANA</span>
            <div className="flex flex-col justify-start gap-2">
              <span className="cursor-pointer hover:underline">HOME</span>
              <span className="cursor-pointer hover:underline">CONTACT US</span>
              <span className="cursor-pointer hover:underline">DELIVERY ZONE</span>
            </div>
          </div>
          {/* Menu Section */}
          <div className="flex flex-col justify-start gap-2">
            <span className="text-gray-400">MENU</span>
            <div className="flex flex-col justify-start gap-2">
              <span className="cursor-pointer hover:underline">PIZZA</span>
              <span className="cursor-pointer hover:underline">DRINKS</span>
              <span className="cursor-pointer hover:underline">DESSERTS</span>
            </div>
          </div>
          {/* Social Media Section */}
          <div className="flex flex-col gap-2">
            <span className="text-gray-400">FOLLOW US</span>
            <div className="flex justify-start gap-2">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook className="cursor-pointer" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="cursor-pointer" />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom section of footer */}
      <div className="w-full max-w-[1440px] mx-auto flex flex-wrap justify-center md:justify-start gap-6 text-sm text-gray-500 py-4 border-t border-gray-700">
        <a href="#" className="cursor-pointer hover:underline">Copyright 2024 © BALKANA</a>
        <a href="#" className="cursor-pointer hover:underline">Privacy Policy</a>
        <a href="#" className="cursor-pointer hover:underline">Terms and Conditions</a>
        <a href="#" className="cursor-pointer hover:underline">Cookie Policy</a>
      </div>
    </div>
  );
};

export default Footer;
