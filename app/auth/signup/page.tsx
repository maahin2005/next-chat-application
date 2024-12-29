"use client";

import React, { useState } from "react";
import { AiOutlineWechatWork } from "react-icons/ai";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GoogleButton from "react-google-button";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setBasicInfo } from "@/lib/store/features/user/userSlice";
import axios from "axios";
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URI;
console.log("backendUrl:", backendUrl)

const Signup: React.FC = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user)
    console.log("user:", user)
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible((prev) => !prev);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const signupTheUser = async(obj:any) => {
        try {
            obj.name = "Angel"
           console.log("OBJ: ", obj)
            const resp = await axios.post("/api/users/signup",obj);

            console.log("RESP: ", resp);
            
        } catch (error) {
            console.log("ERROR: " + error)
        }
    }

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        console.log("started signup process...")

        const { username, email, password, confirmPassword } = formData;
        console.log(formData)

        // Basic validation
        if (!username || !email || !password || !confirmPassword) {
            setError("All fields are required.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            signupTheUser(formData);
            console.log("After function call")
            dispatch(setBasicInfo(formData))
            console.log("After function dispatch")

            // router.push("/dashboard")
        } catch (error) {
            console.log("ERROR: ", error)
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-md py-4">
                <div className="container mx-auto flex justify-center px-4 md:px-8">
                    <div className="flex items-center gap-2 text-2xl font-semibold text-gray-800 font-kanit">
                        <AiOutlineWechatWork className="text-blue-600" />
                        <h1>LetsChat.io</h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center">
                <div className="max-w-4xl mx-auto p-4 w-full">
                    <div className="bg-white shadow-md rounded-lg p-8 flex flex-col md:flex-row items-center gap-8">
                        <div className="gap-2 text-4xl items-center font-kanit hidden md:flex">
                            <AiOutlineWechatWork className="text-blue-600" />
                            <h1>LetsChat.io</h1>
                        </div>

                        {/* Signup Form */}
                        <div className="w-full md:w-1/2 max-w-md">
                            <div className="text-4xl font-bold text-gray-800 mb-6 text-center">
                                Sign Up<span className="text-blue-600">#</span>
                            </div>
                            <form onSubmit={handleSignup} className="space-y-4">
                                {/* Error Message */}
                                {error && <div className="text-red-600 text-sm">{error}</div>}

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
                                            placeholder="Username"
                                            value={formData.username}
                                            onChange={handleInputChange}
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
                                        Email
                                    </label>
                                    <div className="relative mt-1">
                                        <input
                                            type="email"
                                            id="email"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={handleInputChange}
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
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full border-b border-gray-300 bg-transparent px-2 py-2 focus:outline-none focus:ring-0 focus:border-blue-500"
                                        />
                                        <span
                                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 cursor-pointer"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {isPasswordVisible ? <FiEye /> : <FiEyeOff />}
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
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            className="w-full border-b border-gray-300 bg-transparent px-2 py-2 focus:outline-none focus:ring-0 focus:border-blue-500"
                                        />
                                        <span
                                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 cursor-pointer"
                                            onClick={toggleConfirmPasswordVisibility}
                                        >
                                            {isConfirmPasswordVisible ? <FiEye /> : <FiEyeOff />}
                                        </span>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white rounded-md py-2 font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Register
                                </button>
                            </form>

                            {/* Divider */}
                            <div className="flex items-center my-4">
                                <div className="w-full border-t border-gray-300"></div>
                                <span className="px-2 text-gray-500 text-sm">or</span>
                                <div className="w-full border-t border-gray-300"></div>
                            </div>

                            <div className="flex justify-center">
                                <GoogleButton onClick={() => console.log("Google Login")} />
                            </div>

                            {/* Links Below the Form */}
                            <div className="mt-6 text-sm text-center space-y-2">
                                <Link
                                    href="/auth/login"
                                    className="text-blue-600 hover:underline transition duration-300"
                                >
                                    Already have an account? Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Signup;
