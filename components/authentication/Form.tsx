import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setBasicInfo } from "@/lib/store/features/user/userSlice";
import Input from "@/components/authentication/InputField"; // Adjust the path as needed


const SignupForm: React.FC = () => {

  const dispatch = useAppDispatch()
  const router = useRouter()
  const { name, password, email } = useAppSelector((state) => state.user)
  console.log({ name, password, email })

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
    dispatch(setBasicInfo({ name: `${formData.firstName} ${formData.lastName}`, password: formData.password, email: formData.email }))
    console.log({ name, password, email })
    router.push('/auth/signup/step2')
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Input
          id="firstName"
          type="text"
          value={formData.firstName}
          placeholder="First name"
          onChange={handleChange}
          icon={<FiUser />}
          required
        />
        <Input
          id="lastName"
          type="text"
          value={formData.lastName}
          placeholder="Last name"
          onChange={handleChange}
          icon={<FiUser />}
          required
        />
      </div>

      <Input
        id="email"
        type="text"
        value={formData.email}
        placeholder="Email"
        onChange={handleChange}
        icon={<button type="button" className="text-blue-500" onClick={handleSendOTP}>{otpVerified ? <span className="text-green">Varified</span>: otpSent ? <span className="text-white">OTP sent!</span> : "Varify"}</button>}
        required
      />

      {otpSent && (
        <Input
          id="OTP"
          type="text"
          value={otp}
          placeholder="Enter OTP"
          onChange={(e) => setOtp(e.target.value)}
          icon={<button type="button" onClick={handleVerifyOTP}>Varify OTP</button>}
          required
        />
      )}

      {otpVerified && (
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
          icon={
            showPassword ? (
              <FiEyeOff onClick={() => setShowPassword(false)} className="cursor-pointer" />
            ) : (
              <FiEye onClick={() => setShowPassword(true)} className="cursor-pointer" />
            )
          }
          required
        />
      )}

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
