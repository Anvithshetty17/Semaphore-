// /next.config.mjs

/** @type {import('next').NextConfig} */

const nextConfig = {
  // Your experimental config is fine
  experimental: {
    optimizePackageImports: ['@react-three/fiber', '@react-three/drei'],
  },

  // ✅ The entire 'webpack' key and function has been removed.

  // Your other settings are fine
  reactStrictMode: false,
};

export default nextConfig;