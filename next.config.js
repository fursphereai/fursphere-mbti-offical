/** @type {import('next').NextConfig} */

const nextConfig = {
  // images: {
  //   domains: ['baywrgbxvrfhttfhwggf.supabase.co'],
  //   // Or use remotePatterns for more specific control
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'baywrgbxvrfhttfhwggf.supabase.co',
  //       port: '',
  //       pathname: '/storage/v1/object/**',
  //     },
  //   ],
  // },
  images: {
    domains: ['baywrgbxvrfhttfhwggf.supabase.co'],
  },
  experimental: {
    appDir: true,
  },
  eslint: {
    // Disable ESLint during production builds
    ignoreDuringBuilds: true,
  },
};


module.exports = nextConfig 