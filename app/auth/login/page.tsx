"use client";

import React, { useEffect, useState } from "react";
import { FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GoogleButton from "react-google-button";
import Input from "@/components/authentication/InputField"; // Adjust the path as needed
import { useAppDispatch } from "@/lib/store/hooks";

const Login: React.FC = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(true);
  const { data: session, status } = useSession();
  console.log("session:", session, "status:", status)
  const router = useRouter();

  const togglePasswordVisibility = () => {
    console.log(isPasswordVisible);
    setPasswordVisible(!isPasswordVisible);
  };
  useEffect(() => { console.log("session: ", session) }, [session])

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch()


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/homepage')
  };

  return (
    < div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden " >
      <div className="relative max-w-4xl px-5 py-12 bg-gray-900/80 rounded-lg shadow-lg">

        <div className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Login<span className="text-blue-600">#</span>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Username Input */}
          <Input
            id="firstName"
            type="text"
            value={formData.firstName}
            placeholder="First name"
            onChange={handleChange}
            icon={<FiUser />}
            required
          />

          {/* Password Input */}
          <Input
            id="password"
            type={isPasswordVisible ? "password" : "text"}
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
            icon={isPasswordVisible ? <FiEye onClick={togglePasswordVisibility} /> : <FiEyeOff onClick={togglePasswordVisibility} />}
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-md py-2 font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="w-full border-t border-gray-300"></div>
          <span className="px-2 text-gray-500 text-sm">or</span>
          <div className="w-full border-t border-gray-300"></div>
        </div>

        <div className="flex flex-col items-center">
          <GoogleButton onClick={() => signIn("google")} />
          <button onClick={() => signOut()}>Sign Out</button>
        </div>

        {/* Links Below the Form */}
        <div className="mt-6 text-sm text-center space-y-2">
          <Link
            href="/auth/signup/step1"
            className="text-blue-600 hover:underline transition duration-300"
          >
            Sign Up
          </Link>
          <br />
          <Link
            href="/forgot-password"
            className="text-blue-600 hover:underline transition duration-300"
          >
            Forgot Password?
          </Link>
          <br />
          <Link
            href="/help"
            className="text-blue-600 hover:underline transition duration-300"
          >
            Need help getting started?
          </Link>
        </div>
      </div>
    </div >
  );
};

export default Login;
