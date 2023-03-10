/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SURVAQ_API_ORIGIN: process.env.SURVAQ_API_ORIGIN,
  },
  experimental: {
    appDir: true,
  },
  runtime: "edge",
};

module.exports = nextConfig;
