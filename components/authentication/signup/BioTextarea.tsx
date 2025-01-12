"use client";

import React, { useState } from "react";

function BioTextarea({ getBio }: any) {
  const [bio, setBio] = useState("");
  const maxChars = 250;

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;

    if (input.length <= maxChars) {
      setBio(input);
    }

    getBio(bio);
  };

  return (
    <div className="flex flex-col gap-2">
      <textarea
        placeholder="Write a short bio about yourself..."
        className="w-full max-h-32 px-4 py-3 rounded-lg bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        rows={4}
        value={bio}
        onChange={handleInputChange}
      />
      <div className="text-right text-gray-400 text-sm">
        {bio.length}/{maxChars} characters
      </div>
    </div>
  );
}

export default BioTextarea;
