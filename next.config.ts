import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: 'res.cloudinary.com', pathname: '/sushabhan/**' },
      { hostname: 'lh3.googleusercontent.com', pathname: '/a/**' },
    ]
  }
};

export default nextConfig;
