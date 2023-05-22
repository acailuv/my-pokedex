/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    API_BASE_URL: process.env.API_BASE_URL,
    IMAGE_CAPTURE_INTERVAL_MS: process.env.IMAGE_CAPTURE_INTERVAL_MS,
    DETECTION_TOLERANCE_COUNT: process.env.DETECTION_TOLERANCE_COUNT,
  },
};

module.exports = nextConfig;
