"use client";

import axios from "axios";
import React, { useState, useEffect, FormEvent } from "react";
import { FiUser } from "react-icons/fi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  requestFullfilled,
  requestIntiated,
  requestRejected,
} from "@/lib/store/features/loading/loadingSlice";
import SimpleSpinner from "@/components/loading/SimpleSpinner";

function SignupFormStepTwo() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.loadHandler);

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    user_name: "",
    password: "",
    lastName: "",
    email: "",
  });
  const [username, setUsername] = useState("");
  const [typing, setTyping] = useState(false);
  const [isAvailable, setIsAvailable] = useState<null | boolean>(null);
  const [validationError, setValidationError] = useState("");
  const [isPassTest, setIsPassTest] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.email) {
      dispatch(requestIntiated());
      try {
        const userData = {
          name: formData.firstName + " " + formData.lastName,
          username: formData.user_name,
          password: formData.password,
          email: formData.email,
        };

        const res = await axios.post("/api/users/signup", userData);
        if (res.data.success) {
          dispatch(requestFullfilled());
          localStorage.clear();
          router.push("/dashboard");

        }
      } catch (error) {
        console.log(error);
        dispatch(requestRejected());
      }
    }
  };

  const validateUsername = (username: string) => {
    const usernameRegex = /^[a-z0-9_]{3,}$/;
    if (username.length < 3) {
      return "Username must be at least 3 characters long.";
    }
    if (!usernameRegex.test(username)) {
      return "Only lowercase letters, numbers, and underscores are allowed.";
    }

    setFormData((prev) => ({ ...prev, user_name: username }));

    return "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "password") {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
      setIsPassTest(passwordRegex.test(e.target.value));
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("signup-email");

    if (storedData) {
      const localData = JSON.parse(storedData);
      setIsEmailVerified(localData.verifiedEmail);
      setFormData((prev) => ({ ...prev, email: localData.email }));
    }
    
    if (storedData && !JSON.parse(storedData).verifiedEmail) {
      router.push("/auth/signup");
    }

    if (!username) {
      setTyping(false);
      setIsAvailable(null);
      setValidationError("");
      return;
    }

    const error = validateUsername(username);
    setValidationError(error);

    if (!error) {
      setTyping(true);
      const timer = setTimeout(() => {
        checkUsernameAvailability();
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setTyping(false);
      setIsAvailable(null);
    }
  }, [username, router]);

  const checkUsernameAvailability = async () => {
    setTyping(false);
    try {
      const response = await axios.post(`/api/users/availabilities/usernames`, {
        username,
      });
      setIsAvailable(response.data.available);
    } catch (error) {
      console.error("Error checking username:", error);
      setIsAvailable(null);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="">
      <h2 className="text-2xl text-green-500 tracking-wide font-semibold">Great! Email verified successfully. 
        <br/>Now let's</h2>
      <h1 className="text-4xl my-5 text-white tracking-wide font-bold">
        Build Your Profile
      </h1>
      <div className="">
        <div className="w-full">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 my-3">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={handleInputChange}
                className="w-full bg-slate-800 px-4 rounded-lg focus:bg-transparent py-3 focus:ring-2 focus:ring-purple-500 transition-all text-white placeholder-gray-500 focus:outline-none"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={handleInputChange}
                className="w-full bg-slate-800 px-4 rounded-lg focus:bg-transparent py-3 focus:ring-2 focus:ring-purple-500 transition-all text-white placeholder-gray-500 focus:outline-none"
                required
              />
            </div>
            <div
              className={`w-full flex justify-between items-center px-4 py-3 rounded-lg bg-opacity-70 ${
                validationError
                  ? "bg-red-500 animate-shake"
                  : "bg-gradient-to-r from-purple-600 to-blue-500"
              }`}
            >
              <input
                type="text"
                name="username"
                placeholder="Think of a Username"
                className="w-full bg-transparent text-white placeholder-gray-300 focus:outline-none transition-transform duration-200 focus:scale-105"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <FiUser className="text-white text-lg" />
            </div>

            {username && (
              <div className="mt-2 text-sm">
                <p
                  className={`transition-all ${
                    validationError ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {validationError || "Valid username!"}
                </p>
              </div>
            )}

            {typing && !validationError && (
              <p className="text-yellow-500 mt-2 animate-pulse">
                Checking availability...
              </p>
            )}

            {!validationError && isAvailable !== null && !typing && (
              <p
                className={`mt-2 animate-bounce ${
                  isAvailable ? "text-green-500" : "text-red-500"
                }`}
              >
                {isAvailable
                  ? "Great choice! It's available—claim it now!"
                  : "Sorry! Someone beat you to it—think of something cooler!"}
              </p>
            )}
            <div
              className={`my-5 w-full ${
                !isPassTest && formData.password
                  ? "border-2 border-red-600"
                  : "border-0"
              } bg-slate-800 flex items-center gap-3 px-4 py-3 rounded-lg`}
            >
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                placeholder="Password Ex. MySecure@123"
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
            {formData.password && (
              <div className="my-3 space-y-2 text-sm text-gray-400 mt-4">
                <p>Password Pattern must include:</p>
                <p>At least 8 characters long,</p>
                <p>one (a-z), and (A-Z) letter, one number (0-9),</p>
                <p>and at least one special character (!@#$%^&*)</p>
              </div>
            )}

            <button
              className={`${
                validationError ||
                isAvailable === false ||
                !username ||
                !formData.email
                  ? "bg-gray-900 text-gray-600 cursor-not-allowed"
                  : "text-white bg-gradient-to-r text-lg from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 transform hover:scale-105 transition-all duration-300"
              }
               my-3 w-full  font-semibold py-2 px-6 rounded-lg shadow-md
             `}
              disabled={
                typing || validationError || isAvailable === false || username
                  ? false
                  : true || formData.email
                  ? true
                  : false
              }
            >
              {loading ? (
                <SimpleSpinner />
              ) : error ? (
                "fail to signup Try Again"
              ) : validationError || isAvailable === false || !username ? (
                "Enter your credentials"
              ) : (
                "Claim My Spot!"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupFormStepTwo;
