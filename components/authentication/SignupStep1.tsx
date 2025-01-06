import React, { useState } from "react";

const SignupStep2: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    city: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-white mb-4">Step 2: Additional Information</h2>

      {/* Username */}
      <div className="w-full bg-gray-800 flex items-center gap-3 px-4 py-3 rounded-lg mb-4">
        <input
          type="text"
          id="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username (e.g., john_doe)"
          className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none"
          required
        />
      </div>

      {/* Phone */}
      <div className="w-full bg-gray-800 flex items-center gap-3 px-4 py-3 rounded-lg mb-4">
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number (e.g., +1234567890)"
          className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none"
          required
        />
      </div>

      {/* City */}
      <div className="w-full bg-gray-800 flex items-center gap-3 px-4 py-3 rounded-lg mb-4">
        <input
          type="text"
          id="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City (e.g., New York)"
          className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none"
          required
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4">
        <button
          type="button"
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
        >
          Back
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SignupStep2;
