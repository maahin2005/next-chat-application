"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { setAdditionalInfo } from "@/lib/store/features/user/userSlice";
import Link from "next/link";
import Input from "@/components/authentication/InputField"; // Adjust the path as needed
import { FiPhone, FiUser } from "react-icons/fi";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";

const SignupStep2 = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { username, mobileNo, city } = useAppSelector((state) => state.user);

  // Local state for form inputs
  const [formData, setFormData] = useState({
    username: "",
    mobileNo: "",
    city: "",
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();

    // Dispatch action to store data in Redux
    dispatch(setAdditionalInfo(formData));
    console.log({ username, mobileNo, city });

    // Navigate to Step 3
    // router.push("/homepage");
  };

  const handleBackStep = () => {
    router.push("/auth/signup/step1"); // Navigate back to Step 1
  };

  return (
    <div className="min-h-screen flex items-center bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden text-white">
      <div className="max-w-md mx-auto p-6 bg-gray-900 rounded-lg shadow-md">
        {/* Step Header */}
        <h1 className="text-2xl font-bold text-blue-500 mb-2">Step 2 of 3</h1>
        <h2 className="text-lg font-semibold text-white mb-6">Provide Additional Information</h2>

        <form onSubmit={handleNextStep} className="space-y-4 text-center">
          {/* Username Input */}
          <Input
            id="firstName"
            type="text"
            value={formData.username}
            placeholder="Username"
            onChange={handleChange}
            icon={<FiUser />}
            required
          />

          {/* Mobile Number Input */}
          <Input
            id="mobileNo"
            type="text"
            value={formData.mobileNo}
            placeholder="Mobile No."
            onChange={handleChange}
            icon={<FiPhone />}
            required
          />

          {/* City Input */}
          <Input
            id="city"
            type="text"
            value={formData.city}
            placeholder="Enter your city"
            onChange={handleChange}
            icon={<FaMagnifyingGlassLocation />}
            required
          />

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={handleBackStep}
              className="bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Next
            </button>
          </div>
          <Link href="/dashboard">Skip</Link>
        </form>

        {/* Current Redux State Display (For Debugging) */}
        <div className="mt-4 text-sm text-gray-400">
          <p>Current Data:</p>
          <ul className="list-disc list-inside">
            <li>Username: {username || "Not provided"}</li>
            <li>Mobile No: {mobileNo || "Not provided"}</li>
            <li>City: {city || "Not provided"}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SignupStep2;
