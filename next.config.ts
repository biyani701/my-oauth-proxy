import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  async headers() {
       return [
         {
           // Apply these headers to all routes
           source: '/:path*',
           headers: [
             {
               key: 'Access-Control-Allow-Origin',
               value: '*', // In production, you should restrict this to your client domains
             },
             {
               key: 'Access-Control-Allow-Methods',
               value: 'GET, POST, PUT, DELETE, OPTIONS',
             },
             {
               key: 'Access-Control-Allow-Headers',
               value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, Origin, Cache-Control, Pragma',
             },
             {
               key: 'Access-Control-Allow-Credentials',
               value: 'true',
             },
             // Removed CSP header to avoid conflicts with Next.js's built-in CSP
           ],
         },
       ];
     },
  images: {
    remotePatterns: [
      // GitHub profile pictures
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      // Google profile pictures
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      // Facebook profile pictures
      {
        protocol: 'https',
        hostname: 'platform-lookaside.fbsbx.com',
      },
      {
        protocol: 'https',
        hostname: '*.fbcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'graph.facebook.com',
      },
      // LinkedIn profile pictures
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
      },
      {
        protocol: 'https',
        hostname: '*.licdn.com',
      },
      // Auth0 profile pictures
      {
        protocol: 'https',
        hostname: '*.auth0.com',
      },
      {
        protocol: 'https',
        hostname: 's.gravatar.com',
      },
    ],
  },
};

export default nextConfig;
