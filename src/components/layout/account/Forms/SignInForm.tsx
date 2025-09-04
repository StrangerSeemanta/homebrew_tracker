"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Link from "next/link";
import React, { useState } from "react";
import { BsArrowRight } from "react-icons/bs";

import { IoIosEye, IoIosEyeOff } from "react-icons/io";

function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className="min-w-[450px] min-h-[400px] border-4 border-double border-theme-primary p-6 rounded-none ">
        <h1 className="text-4xl font-subtitle mb-5 text-theme-foreground text-shadow-themed">
          Log In !
        </h1>

        <form action="#" className="flex flex-col gap-4 ">
          <Input
            label="Email"
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
            <span>Log In</span>
            <BsArrowRight className="group-hover:underline" />
          </Button>
        </form>
        <Link
          href={"/account/create"}
          className="flex justify-center group items-center gap-2 my-5 hover:text-theme-primary hover:tracking-wider transition-all duration-300"
        >
          <h1>{"Create New Account"}</h1>
          <BsArrowRight className="group-hover:underline" />
        </Link>
        <div className="w-full">
          <Button variant="filled" className="mb-5 w-full">
            <span>Continue With Google</span>
          </Button>
        </div>
      </div>
    </>
  );
}

export default SignInForm;
