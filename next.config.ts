import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets-global.website-files.com",
        port:"",
        pathname: "/**", // Allows all paths under this domain
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port:"",
        pathname: "/**", // Allows all paths under this domain
      }, 
      {
        protocol: "https",
        hostname: "randomuser.me",
        port:"",
        pathname: "/**", // Allows all paths under this domain
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port:"",
        pathname: "/**", // Allows all paths under this domain
      }

    ],
    // domains: ["randomuser.me", "via.placeholder.com","lh3.googleusercontent.com"],
  },
};

export default nextConfig;
