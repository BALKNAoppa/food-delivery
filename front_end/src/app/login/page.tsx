"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress"; // Import Progress component
import { Eye, EyeOff } from "lucide-react"; // Import ShadCN icons

const LogIn = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState({
    emailOrUsername: false,
    password: false,
  }); // Error state
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError({ emailOrUsername: false, password: false });
    if (!emailOrUsername || !password) {
      return;
    }

    try {
      setProgress(30);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setProgress(70);

      const { data } = await axios.post(
        "https://food-delivery-backend-navy-eight.vercel.app/users/login",
        {
          username: emailOrUsername,
          password,
        }
      );

      setProgress(100);

      if (data.token) {
        localStorage.setItem("userToken", data.token);
        toast.success("Login successful! You are now logged in.");
        setTimeout(() => router.push("/"), 3000);
      } else {
        setError({ emailOrUsername: true, password: true });
        toast.error(
          "Login failed! Please check your information and try again."
        );
      }
    } catch  {
      setError({ emailOrUsername: true, password: true });
      toast.error("Login failed! Please check your information and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    if (field === "emailOrUsername") {
      setEmailOrUsername(e.target.value);
    } else if (field === "password") {
      setPassword(e.target.value);
    }
    setError((prev) => ({ ...prev, [field]: false }));
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-[#F7F7F8]">
      <div className="flex flex-col items-center w-[416px] h-auto gap-4">
        <div className="flex w-full justify-start items-center gap-4">
          <p className="text-2xl font-semibold">Log In</p>
        </div>

        <form
          onSubmit={handleLogin}
          className="w-full flex flex-col items-center gap-4"
        >
          <Input
            placeholder="Email or Username"
            value={emailOrUsername}
            onChange={(e) => handleInputChange(e, "emailOrUsername")}
            className={`w-full ${
              error.emailOrUsername ? "border-red-500" : ""
            }`}
          />
          <div className="relative w-full">
            <Input
            placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => handleInputChange(e, "password")}
              className={`w-full ${error.password ? "border-red-500" : ""}`} 
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-gray-500" />
              ) : (
                <Eye className="w-5 h-5 text-gray-500" />
              )}
            </button>
          </div>

          {loading && (
            <div className="w-full my-4">
              <Progress value={progress} />
            </div>
          )}
          <Button
            type="submit"
            className="w-[251px] h-[36px]"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Sign In"}
          </Button>
        </form>
        <p className="text-[12px] text-gray-500 mt-4">
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
