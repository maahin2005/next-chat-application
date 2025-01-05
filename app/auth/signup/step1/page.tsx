"use client"
import React from "react";
import SignupForm from "@/components/authentication/Form";

const SignupPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden text-white">
      {/* Background Image */}
      {/* <div className="absolute inset-0">
        <img
          src="/path-to-your-background-image.jpg" // Replace with your image path
          alt="Background"
          className="w-full h-full object-cover opacity-40"
        />
      </div> */}

      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-gray-900 bg-opacity-60"></div> */}

      {/* Content */}
      <div className="relative max-w-4xl px-10 py-12 bg-gray-900/80 rounded-lg shadow-lg">
        <header className="mb-10">
          <h1 className="text-4xl font-bold">Anywhere App</h1>
          <p className="text-sm text-gray-400 mt-2">START FOR FREE</p>
          <h2 className="text-3xl font-bold mt-2">
            Create new account<span className="text-blue-500">.</span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Already a member?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Log In
            </a>
          </p>
        </header>

        {/* Signup Form Component */}
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
