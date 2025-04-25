import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["doctorlistingingestionpr.azureedge.net"], // Allow external images from this domain
  },
};

export default nextConfig;
