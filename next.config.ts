import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images:{
  remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  }, experimental: {
    optimizePackageImports: ["react-icons"],
  },
};

export default nextConfig;
