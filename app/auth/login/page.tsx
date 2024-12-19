"use client"
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react"


const LogInPage: React.FC = () => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const { data: session } = useSession();

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };
    return (
        <div className="min-h-screen relative flex items-center justify-center bg-black-100">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url('/images/login/laptop-setup.png')`, // Replace with the actual image path
                }}
            ></div>

            {/* Form Sidebar */}
            <div className="absolute left-0 top-0 h-full w-1/3 bg-white/30 backdrop-blur-md z-10 flex items-center px-8">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className="text-4xl font-bold text-gray-800 mb-6">
                        Login<span className="text-blue-600">#</span>
                    </div>
                    {/* Form */}
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
                                <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                                    <i className="fas fa-user"></i>
                                </span>
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label
                                htmlFor="username"
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
                                    <i className={isPasswordVisible ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                                </span>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white rounded-md py-2 font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Submit
                        </button>

                    </form>
                        <button onClick={() => signIn("google")}>Sign in</button>
                </div>
            </div>
        </div>
    );
};

export default LogInPage;
