"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import SendOTP from "@/components/otp/SendOTP";
import AuthNav from "@/components/authentication/login/AuthNav";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
} from "@/lib/store/features/login/loginSlice";

import { FcGoogle } from "react-icons/fc";
import { FiUser } from "react-icons/fi";
import { AppDispatch } from "@/lib/store/store";
import SimpleSpinner from "@/components/loading/SimpleSpinner";

const Login: React.FC = () => {
  const { data: session, status } = useSession();
  const [isAPICalled, setIsAPICalled] = useState(false);
  const router = useRouter()

  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: any) => state.login);

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const signin = async (userData:any) => {
    console.log("HIIIIIIIIIIIIIII");
    try {
  
      setIsAPICalled(true);
      const res = await axios.post("/api/users/google-provider", userData);
  
      if(res.data.success) {
        alert(res.data.msg);
        router.push("/dashboard");
      }
  
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const handleAuthByGoogle = async () => {
    try {
      await signIn("google");
    } catch (error) {
      console.error("Google auth error:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginRequest());
    try {
      const res = await axios.post("/api/users/login", credentials);

      console.log("res: ===> ", res);
      if (res.data.success) {
        dispatch(loginSuccess());
        router.push("/dashboard");
      }
    } catch (error) {
      dispatch(loginFailure((error as Error).message));
      console.log("error: " + error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (session && session?.user && status === "authenticated") {
      const userData = {
        name: session?.user?.name,
        email: session?.user?.email,
        profileImage: session?.user?.image,
      };
      if(!isAPICalled){
        signin(userData);
      }
    }
  }, [session, status]);

  return (
    <div className="flex h-fit min-h-screen md:bg-[url('/images/login/bg-22.jpg')] bg-no-repeat bg-center bg-cover ">
      <div className="w-4/5 border-r-2 border-white my-20 md:my-auto md:w-[50%] lg:w-[45%]  p-3 md:p-5 flex flex-col h-fit md:min-h-screen md:bg-slate-950 md:bg-opacity-70">
        <div className="h-[80%] md:ml-10 my-auto sm:w-[70%] lg:w-[60%] ">
          <div>
            <header className="mb-10 text-white">
              <h1 className="text-5xl font-bold">Welcome Back</h1>
              <p className=" text-gray-400 mt-2">To</p>
              <h2 className="text-5xl font-bold mt-2">
                Letschat<span className="text-blue-500">.</span>
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Not a member?{" "}
                <a
                  href="/auth/signup"
                  className="text-blue-500 hover:underline"
                >
                  Sign Up
                </a>
              </p>
            </header>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="w-full bg-slate-800 bg-opacity-70 flex items-center gap-3 px-4 py-3 rounded-lg">
              <input
                type="text"
                name="username"
                placeholder="username"
                onChange={handleInputChange}
                className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none"
                required
              />
              <FiUser className="w-5 h-5 text-gray-500" />
            </div>
            <div className="my-5 w-full bg-slate-800 bg-opacity-70 flex items-center gap-3 px-4 py-3 rounded-lg">
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                placeholder="password"
                onChange={handleInputChange}
                className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none"
                required
              />
              {isPasswordVisible ? (
                <FiEye
                  className="w-5 h-5 text-gray-500 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <FiEyeOff
                  className="w-5 h-5 text-gray-500 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
            <button
              type="submit"
              className="text-white w-full bg-blue-700 flex justify-center items-center rounded-lg h-10 p-2 py-3"
            >
              {!loading ? "Login" : <SimpleSpinner />}
            </button>
          </form>
          <div className="flex justify-center items-center gap-4 my-8">
            <div className="h-2 border-b-2 border-gray-400 w-1/2"></div>
            <p className="text-sm text-gray-300">OR</p>
            <div className="h-2 border-b-2 border-gray-400 w-1/2"></div>
          </div>
          <button
            className="my-3 transition-colors font-kanit text-lg tracking-wide bg-slate-200 text-black flex justify-center items-center gap-3 hover:text-white w-full m-auto hover:bg-transparent border-gray-200 rounded-full border-2 h-10 p-3"
            onClick={handleAuthByGoogle}
          >
            <FcGoogle className="text-2xl " /> Continue with Google
          </button>
        </div>
      </div>
      <div className="hidden md:inline-block flex-1">
        {/* <video autoPlay loop muted className="h-full w-full object-cover">
          <source src="/images/login/bgRocketEarthGif.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
      </div>
    </div>
  );
};

export default Login;
