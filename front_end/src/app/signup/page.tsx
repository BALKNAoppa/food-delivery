"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [username, setUsername] = useState("");
  const [step, setStep] = useState(1);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
  const validateEmaillPassword = () => {
    let isValid = true;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 6 characters long and include at least one letter, one number, and one special character."
      );
      isValid = false;
    } else {
      setPasswordError("");
    }
    if (isValid) {
      setStep(2);
    }
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        "https://food-delivery-backend-navy-eight.vercel.app/users",
        {
          email,
          password,
          username: firstName + lastName,
          firstName,
          gender,
          lastName,
          phone,
        }
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-[#F7F7F8]">
      <div className="flex flex-col items-center w-[416px] h-auto gap-4">
        {step === 2 && (
          <div className="flex w-full justify-start items-center gap-4">
            <Button
              variant="outline"
              className="w-[36px] h-[36px]"
              onClick={handleBack}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </div>
        )}

        {step === 1 && (
          <p className="text-2xl font-semibold w-full text-left">Sign Up</p>
        )}

        {step === 1 && (
          <>
            <div className="w-full">
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>
            <div className="w-full flex flex-col">
              <div className="relative w-full">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
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
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>
          </>
        )}
        {step === 2 && (
          <div className="w-full flex flex-col gap-4">
            <p className="text-2xl font-semibold w-full text-left mb-4">
              Additional Information
            </p>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full"
            />
            <Input
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full"
            />
            <Input
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full"
            />
            <Input
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full"
            />
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-[200px] border border-gray-300 rounded-md p-2 text-sm"
            >
              <option value="">Choose Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        )}

        <Button
          className="w-full h-[36px]"
          onClick={step === 1 ? validateEmaillPassword : handleSubmit}
        >
          {step === 1 ? "Next" : "Submit"}
        </Button>

        <p className="text-base text-[12px] font-normal leading-6 tracking-normal align-middle text-[rgba(113,113,122,1)]">
          Already have an account?{" "}
          <Link className="text-blue-500" href="/login">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
