"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress"; // Import the Progress component from ShadCN

const LogIn = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const [progress, setProgress] = useState(0); // Progress state
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true); // Set loading to true when request starts

    try {
      // Simulate progress updates (e.g., 0% -> 50% -> 100%) while waiting for the response
      setProgress(30);
      await new Promise(resolve => setTimeout(resolve, 500)); // simulate delay for progress
      setProgress(70);
      const { data } = await axios.post(
        "https://food-delivery-backend-navy-eight.vercel.app/users/login",
        {
          username: emailOrUsername,
          password,
        }
      );
      setProgress(100); // Full progress when done

      console.log(data);

      if (data.token) {
        localStorage.setItem("userToken", data.token);

        toast.success("Login successful! You are now logged in.");

        setTimeout(() => router.push("/"), 3000);
      }
    } catch (err) {
      console.error("Login failed:", err);

      toast.error("Login failed! Please check your information and try again.");
    } finally {
      setLoading(false); // Set loading to false after request is completed
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

        {/* Show progress when loading */}
        {loading && (
          <div className="w-full my-4">
            <Progress value={progress} />
          </div>
        )}

        <Button
          onClick={handleLogin}
          className="w-[251px] h-[36px]"
          disabled={loading} // Disable the button when loading
        >
          {loading ? "Logging In..." : "Sign In"}
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