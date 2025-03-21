"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";

const LogIn = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const { data } = await axios.post(
        "https://food-delivery-backend-navy-eight.vercel.app/users/login",
        {
          username: emailOrUsername,
          password,
        }
      );

      console.log(data);
      // data.token
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-[#F7F7F8]">
      <div className="flex flex-col items-center w-[416px] h-auto gap-4">
        <div className="flex w-full justify-start items-center gap-4">
          <p className="text-2xl font-semibold">Log In</p>
        </div>
        <div className="w-full">
          <Input
            placeholder="Email or Username"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-full">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
          />
        </div>
        <Button onClick={handleLogin} className="w-[251px] h-[36px]">
          Sign In
        </Button>
        <p className="text-base text-[12px] font-normal leading-6 tracking-normal align-middle text-[rgba(113,113,122,1)] mt-4">
          Don&apos;t have an account?{" "}
          <Link className="text-blue-500" href="/signup">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
