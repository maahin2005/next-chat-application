"use client";

import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineWechatWork } from "react-icons/ai";
import { useSession, signIn, signOut } from "next-auth/react"

const Signup: React.FC = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const { data: session } = useSession();

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prev) => !prev);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto flex justify-center px-4 md:px-8">
          {/* Logo */}
          <div className="flex items-center gap-2 text-2xl font-semibold text-gray-800 font-kanit">
            <AiOutlineWechatWork className="text-blue-600" />
            <h1>LetsChat.io</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-around">
        <div className="max-w-4xl mx-auto p-4 w-full">
          <div className="bg-white shadow-md rounded-lg p-8 flex flex-col md:flex-row justify-around items-center gap-8">
            {/* Logo Section */}
            <div className="gap-2 text-4xl items-center font-kanit hidden md:flex">
              <AiOutlineWechatWork className="text-blue-600" />
              <h1>LetsChat.io</h1>
            </div>

            {/* Signup Form */}
            <div className="w-full md:w-1/2 max-w-md">
              <div className="text-4xl font-bold text-gray-800 mb-6 text-center">
                Sign Up<span className="text-blue-600">#</span>
              </div>
              <form className="space-y-4">
                {/* Username Input */}
                <div>
                  <label
                    htmlFor="username"
                    className="block text-gray-700 text-sm font-medium"
                  >
                    Username
                  </label>
                  <div className="relative mt-1">
                    <input
                      type="text"
                      id="username"
                      placeholder="username"
                      className="w-full border-b border-gray-300 bg-transparent px-3 py-2 focus:outline-none focus:ring-0 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-medium"
                  >
                    Email Address
                  </label>
                  <div className="relative mt-1">
                    <input
                      type="email"
                      id="email"
                      placeholder="Email"
                      className="w-full border-b border-gray-300 bg-transparent px-3 py-2 focus:outline-none focus:ring-0 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-medium"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      id="password"
                      placeholder="Password"
                      className="w-full border-b border-gray-300 bg-transparent px-2 py-2 focus:outline-none focus:ring-0 focus:border-blue-500"
                    />
                    <span
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {isPasswordVisible ? (
                        <AiOutlineEye size={20} />
                      ) : (
                        <AiOutlineEyeInvisible size={20} />
                      )}
                    </span>
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-gray-700 text-sm font-medium"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={isConfirmPasswordVisible ? "text" : "password"}
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      className="w-full border-b border-gray-300 bg-transparent px-2 py-2 focus:outline-none focus:ring-0 focus:border-blue-500"
                    />
                    <span
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 cursor-pointer"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {isConfirmPasswordVisible ? (
                        <AiOutlineEye size={20} />
                      ) : (
                        <AiOutlineEyeInvisible size={20} />
                      )}
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white rounded-md py-2 font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Sign Up
                </button>
              </form>

              <button onClick={() => signIn("google")}>Sign in</button>

              {/* Links Below the Form */}
              <div className="mt-6 text-sm text-center space-y-2">
                <a
                  href="/auth/login"
                  className="text-blue-600 hover:underline transition duration-300"
                >
                  Already have an account? Login
                </a>
                <br />
                <a
                  href="/forgot-password"
                  className="text-blue-600 hover:underline transition duration-300"
                >
                  Forgot Password?
                </a>
                <br />
                <a
                  href="/help"
                  className="text-blue-600 hover:underline transition duration-300"
                >
                  Need help getting started?
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;
