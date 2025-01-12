"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  requestFullfilled,
  requestIntiated,
  requestRejected,
} from "@/lib/store/features/loading/loadingSlice";
import SimpleSpinner from "@/components/loading/SimpleSpinner";
import axios from "axios";

function SignupFormStepOne() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.loadHandler);
  const [emailCheckingLoading, setEmailCheckingLoading] = useState(false);
  const [basicFormData, setBasicFormData] = useState({ email: "" });
  const [otpSent, setOtpSent] = useState(false);
  const [inputOTP, setInputOTP] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [timer, setTimer] = useState(0);
  const [emailValidationError, setEmailValidationError] = useState("");
  const [emailAvailability, setEmailAvailability] = useState<null | boolean>(
    null
  );

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setBasicFormData({ ...basicFormData, email });

    if (!emailRegex.test(email)) {
      setEmailValidationError("Invalid email format.");
      setEmailAvailability(null);
      return;
    } else {
      setEmailValidationError("");
    }

    checkEmailAvailability(email);
  };

  const checkEmailAvailability = async (email: string) => {
    setEmailCheckingLoading(true);
    try {
      const response = await axios.post(`/api/users/availabilities/emails`, {
        email,
      });
      setEmailAvailability(response.data.available);
      setEmailCheckingLoading(false);
    } catch (error) {
      console.error("Error checking email availability:", error);
      setEmailAvailability(null);
      setEmailCheckingLoading(false);
    }
  };

  const sendOTPtoMail = async (e: FormEvent) => {
    e.preventDefault();
    if (!basicFormData.email || !emailRegex.test(basicFormData.email)) {
      setEmailValidationError("Please enter a valid email.");
      return;
    }
    if (!emailAvailability) {
      setEmailValidationError("Email is already in use. Try for Login!");
      return;
    }

    dispatch(requestIntiated());
    try {
      const res = await axios.post("/api/otp/send", {
        email: basicFormData.email,
      });

      if (res.data.success) {
        setOtpSent(true);
        setTimer(90);
        dispatch(requestFullfilled());
      }
    } catch (err) {
      console.error("Error sending OTP:", err);
      dispatch(requestRejected());
    }
  };

  const verifyUserOTP = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(requestIntiated());
    try {
      const res = await axios.post("/api/otp/check", {
        otp: inputOTP,
        email: basicFormData.email,
      });

      if (res.data.success) {
        setIsVerified(true);
        dispatch(requestFullfilled());
        localStorage.setItem(
          "signup-email",
          JSON.stringify({ verifiedEmail: true, email: basicFormData.email })
        );
        router.push("/auth/signup/build-profile");
      } else {
        dispatch(requestRejected());
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      dispatch(requestRejected());
    }
  };

  const handleResendOTP = async () => {
    setTimer(0);
    dispatch(requestIntiated());
    try {
      const res = await axios.post("/api/otp/send", {
        email: basicFormData.email,
      });

      if (res.data.success) {
        setOtpSent(true);
        setTimer(120);
        dispatch(requestFullfilled());
      }
    } catch (err) {
      console.error("Error sending OTP:", err);
      dispatch(requestRejected());
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }

  }, [timer]);

  return (
    <div>
      <h1 className="text-3xl md:text-4xl my-5 m-auto text-white tracking-wide">
        First, Verify Yourself!
      </h1>

      {!otpSent && (
        <form onSubmit={sendOTPtoMail}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={basicFormData.email}
            onChange={handleInputChange}
            className="w-full bg-slate-800 px-4 my-5 rounded-lg focus:bg-transparent py-3 focus:ring-2 focus:ring-purple-500 transition-all text-white placeholder-gray-500 focus:outline-none"
            required
          />
          {emailValidationError && basicFormData.email && (
            <p className="text-red-500 text-sm">{emailValidationError}</p>
          )}
          {emailCheckingLoading && (
            <p className="text-orange-500 text-sm">
              Checking your email availability...
            </p>
          )}
          {emailAvailability !== null && !emailValidationError && (
            <p
              className={`text-sm ${
                emailAvailability ? "text-green-500" : "text-red-500"
              }`}
            >
              {emailAvailability
                ? "Email is available!"
                : "Email is already in use."}
            </p>
          )}
          <button
            type="submit"
            disabled={emailAvailability ? false : true}
            className="shadow-md w-full text-white font-semibold tracking-wide text-xl bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg h-10 py-3 flex justify-center items-center"
          >
            {loading ? <SimpleSpinner /> : "Send OTP"}
          </button>
        </form>
      )}

      {otpSent && (
        <form onSubmit={verifyUserOTP}>
          <div className="w-full bg-slate-800 px-4 py-3 my-5 rounded-lg">
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={inputOTP}
              onChange={(e) => setInputOTP(e.target.value)}
              className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="shadow-md w-full text-xl bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg h-10 py-3 flex justify-center items-center"
          >
            {loading && timer > 0 ? (
              <SimpleSpinner />
            ) : error ? (
              "Invalid OTP"
            ) : isVerified ? (
              "Verified Successfully! Redirecting..."
            ) : (
              "Verify OTP"
            )}
          </button>
        </form>
      )}

      {otpSent && (
        <div className="text-center my-3">
          {timer > 0 ? (
            <p className="text-blue-600">Resend OTP in {timer}s</p>
          ) : (
            <button
              className="text-blue-600 underline block"
              onClick={handleResendOTP}
            >
              {loading ? <SimpleSpinner /> : "Resend OTP"}
            </button>
          )}
          <button
            className="text-blue-600 mx-2 underline hover:no-underline"
            onClick={() => setOtpSent(false)}
          >
            Change Email
          </button>
        </div>
      )}
    </div>
  );
}

export default SignupFormStepOne;
