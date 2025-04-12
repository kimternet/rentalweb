import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/landing',
        destination: '/landing',
      },
    ];
  },
};

export default nextConfig;
