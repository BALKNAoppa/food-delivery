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
      <div className="w-[1440px] mx-auto flex my-5 flex-wrap">
        <div className="flex-1 min-w-[300px] p-6 text-white text-center rounded-lg my-5">
          <div className="flex items-center gap-2">
            <Pizza className="w-5 h-5" />
            <h4 className="font-bold italic">Logo will here</h4>
          </div>
        </div>
        <div className="flex-1 p-6 text-white flex justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-[rgb(113,113,122)]">BALKANA</span>
            <div className="flex flex-col justify-start gap-2">
              <span className="cursor-pointer hover:underline">HOME</span>
              <span className="cursor-pointer hover:underline">CONTACT US</span>
              <span className="cursor-pointer hover:underline">
                DELIVERY ZONE
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-start gap-2">
            <span className="text-[rgb(113,113,122)]">MENU</span>
            <div className="flex flex-col justify-start gap-2">
              <span className="cursor-pointer hover:underline">PIZZA</span>
              <span className="cursor-pointer hover:underline">DRINKS</span>
              <span className="cursor-pointer hover:underline">DESSERTS</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[rgb(113,113,122)]">FOLLOW US</span>
            <div className="flex justify-start gap-2">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="cursor-pointer" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="cursor-pointer" />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* buttom section of footer */}
      <div className="my-5">
        <div className="w-[1440px] mx-auto flex gap-12 text-sm text-[rgb(113,113,122)]">
          <a href=""
          >
            <span className="cursor-pointer hover:underline">
              Copyright 2024 © BALKANA
            </span>
          </a>
          <a href="">
            <span className="cursor-pointer hover:underline">
              Privacy Policy
            </span>
          </a>
          <a href="">
            <span className="cursor-pointer hover:underline">
              Terms and Condition
            </span>
          </a>
          <a href="">
            <span className="cursor-pointer hover:underline">
              Cookie policy
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
