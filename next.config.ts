import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.NETLIFY ? "export" : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
