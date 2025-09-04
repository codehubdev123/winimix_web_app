import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "shopo.quomodothemes.website",
      "plus.unsplash.com",
      "images.unsplash.com",
    ],
  },
};

export default nextConfig;
