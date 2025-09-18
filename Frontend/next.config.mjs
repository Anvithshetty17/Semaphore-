/** @type {import('next').NextConfig} */

const API_BASE_URL = process.env.NEXT_PUBLIC_URL;

const nextConfig = {
  // Optimize development experience
  experimental: {
    optimizePackageImports: ['@react-three/fiber', '@react-three/drei'],
  },
  // Webpack configuration to prevent crashes
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },


  async rewrites() {
    return [
      {
        source: '/api/:path*',
      destination: `${API_BASE_URL}/api/:path*`,
      },
    ];
  },
  // Disable strict mode in development to prevent double renders
  reactStrictMode: false,
};

export default nextConfig;
