/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix:
    process.env.VERCEL_ENV === "production"
      ? `https://${process.env.VERCEL_URL}`
      : undefined,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS" },
        ],
      },
    ];
  },
  experimental: {
    appDir: true
  }
};

module.exports = nextConfig;
