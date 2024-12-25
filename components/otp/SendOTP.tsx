"use client";

import { useState } from "react";

export default function SendOTP() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSendOTP = async () => {
    const response = await fetch("/api/auth/send-otp", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    const data = await response.json();

    if (response.ok) {
      setMessage(data.message);
    } else {
      setMessage(data.error);
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSendOTP}>Send OTP</button>
      {message && <p>{message}</p>}
    </div>
  );
}
