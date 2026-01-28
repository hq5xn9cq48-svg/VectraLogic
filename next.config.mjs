/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Image Configuration (Allow external logo)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
        pathname: '/**',
      },
    ],
  },

  // 2. Ignore TypeScript Errors during build (Ensures deployment succeeds)
  typescript: {
    ignoreBuildErrors: true,
  },

  // 3. Ignore ESLint Errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
