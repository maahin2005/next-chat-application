import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setBasicInfo } from "@/lib/store/features/user/userSlice";

const SignupForm: React.FC = () => {

  const dispatch = useAppDispatch()
  const router = useRouter()
  const {name, password, email} = useAppSelector((state)=> state.user)
  console.log({name, password, email})

  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));

    if (id === "password") {
      evaluatePasswordStrength(value);
    }
  };

  const handleSendOTP = async () => {
    const response = await fetch("/api/auth/send-otp", {
      method: "POST",
      body: JSON.stringify({ email: formData.email }),
    });
    const data = await response.json();

    if (response.ok) {
      setMessage(data.message);
      setOtpSent(true);
    } else {
      setMessage(data.error);
    }
  };

  const handleVerifyOTP = async () => {
    const response = await fetch("/api/auth/varify-otp", {
      method: "POST",
      body: JSON.stringify({ otp, email: formData.email }),
    });
    const data = await response.json();

    if (response.ok) {
      setMessage(data.message);
      setOtpVerified(true);
      setOtpSent(false);
    } else {
      setMessage(data.error);
    }
  };

  const evaluatePasswordStrength = (password: string) => {
    if (password.length < 6) {
      setPasswordStrength("weak");
    } else if (password.match(/^(?=.*[A-Z])(?=.*[0-9]).{6,}$/)) {
      setPasswordStrength("medium");
    } else if (password.match(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/)) {
      setPasswordStrength("strong");
    } else {
      setPasswordStrength("weak");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setBasicInfo({ name: `${formData.firstName} ${formData.lastName}`, password:formData.password, email: formData.email }))
    console.log({name, password, email})
    router.push('/auth/signup/step2')
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="w-full bg-gray-800 flex items-center gap-3 px-4 py-3 rounded-lg">
          <div className="flex-1">
            <label htmlFor="firstName" className="sr-only">
              First name
            </label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First name"
              className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none"
              required
            />
          </div>
          <FiUser className="w-5 h-5 text-gray-500" />
        </div>

        <div className="w-full bg-gray-800 flex items-center gap-3 px-4 py-3 rounded-lg">
          <div className="flex-1">
            <label htmlFor="lastName" className="sr-only">
              Last name
            </label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last name"
              className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none"
              required
            />
          </div>
          <FiUser className="w-5 h-5 text-gray-500" />
        </div>
      </div>

      <div className="w-full bg-gray-800 flex items-center gap-3 px-4 py-3 rounded-lg">
        <div className="flex-1">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none"
            required
          />
        </div>
        <button
          type="button"
          onClick={handleSendOTP}
          className="text-sm text-blue-400 hover:underline"
        >
          {otpVerified ? message : otpSent ? message : "Verify"}
        </button>
      </div>

      {otpSent && <div className="w-full bg-gray-800 flex items-center gap-3 px-4 py-3 rounded-lg">
        <div className="flex-1">
          <label htmlFor="email" className="sr-only">
            OTP
          </label>
          <input
            type="OTP"
            id="OTP"
            onChange={(e) => {
              console.log(e.target.value)
              setOtp(e.target.value)
            }}
            placeholder="Enter OTP"
            className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none"
            required
          />
        </div>
        <button
          type="button"
          onClick={handleVerifyOTP}
          className="text-sm text-blue-400 hover:underline"
        >
          {otpVerified ? message : "Verify"}
        </button>
      </div>}

      {otpVerified && <div className="relative">
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <div className="w-full bg-gray-800 flex items-center gap-3 px-4 py-3 rounded-lg">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none"
            required
          />
          {showPassword ? (
            <FiEyeOff
              className="w-5 h-5 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <FiEye
              className="w-5 h-5 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>

        {/* Password strength bar */}
        <div className="mt-2">
          <div
            className={`h-2 rounded-lg ${passwordStrength === "weak"
              ? "bg-red-500"
              : passwordStrength === "medium"
                ? "bg-orange-500"
                : "bg-green-500"
              }`}
            style={{ width: `${passwordStrength === "" ? "0%" : passwordStrength === "weak" ? "33%" : passwordStrength === "medium" ? "66%" : "100%"}` }}
          ></div>
          <p
            className={`text-sm mt-1 ${passwordStrength === "weak"
              ? "text-red-500"
              : passwordStrength === "medium"
                ? "text-orange-500"
                : "text-green-500"
              }`}
          >
            {passwordStrength === ""
              ? "" : passwordStrength === "weak"
                ? "Weak"
                : passwordStrength === "medium"
                  ? "Medium"
                  : "Strong"}
          </p>
        </div>
      </div>}

      <div className="flex gap-4">
        <button
          type="button"
          className="flex-1 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium"
        >
          Change method
        </button>
        <button
          type="submit"
          className="flex-1 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium"
        >
          Create account
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
