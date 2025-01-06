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
    ],
    domains: ["randomuser.me", "via.placeholder.com"],
  },
};

export default nextConfig;
