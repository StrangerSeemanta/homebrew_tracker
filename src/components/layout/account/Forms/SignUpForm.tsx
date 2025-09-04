"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Link from "next/link";
import React, { useState } from "react";
import { BsArrowRight } from "react-icons/bs";

import { IoIosEye, IoIosEyeOff } from "react-icons/io";

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      {" "}
      <div className="w-full min-h-[400px] border-4 border-double border-theme-primary p-10 max-w-6xl rounded-none">
        <div className=" grid place-items-center grid-cols-1 md:grid-cols-2 w-full gap-20">
          <div className="w-full">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-subtitle mb-5 text-theme-foreground text-shadow-themed">
              Sign Up !
            </h1>
            <Button variant="filled" className="mt-5 w-full">
              <span>Continue With Google</span>
            </Button>
          </div>
          <form action="#" className="flex flex-col gap-4 w-full">
            <Input
              label="Full Name"
              id="name"
              name="name"
              type="text"
              variant={"outlined"}
              placeholder="Enter your full name"
              autoComplete="name"
              required
            />
            <Input
              label="Username (Auto Generated)"
              id="name"
              name="name"
              type="text"
              variant={"outlined"}
              placeholder="Auto Generated Username"
              autoComplete="name"
              required
              readOnly
            />
            <Input
              label="Email"
              type="email"
              id="email"
              name="email"
              variant={"outlined"}
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
            <div className="relative">
              <Input
                label="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                autoComplete="password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-4 cursor-pointer group"
              >
                {showPassword ? (
                  <IoIosEye size={25} className={" animate-opacity-in"} />
                ) : (
                  <IoIosEyeOff size={25} className={" animate-opacity-in"} />
                )}
              </button>
            </div>
            <Button
              variant="filled"
              className=" flex items-center justify-center gap-2"
            >
              <span>Sign Up</span>
              <BsArrowRight className="group-hover:underline" />
            </Button>
          </form>
        </div>

        <Link
          href={"/account/login"}
          className="flex justify-center group items-center gap-2 mt-10 hover:text-theme-primary hover:tracking-wider transition-all duration-300"
        >
          <h1 className="text-2xl">{"Need To Log In"}</h1>
          <BsArrowRight className="group-hover:underline" />
        </Link>
      </div>
    </>
  );
}

export default SignUpForm;
