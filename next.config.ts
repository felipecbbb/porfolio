import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85],
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920],
  },
};

export default nextConfig;
