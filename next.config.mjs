/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/UROBOROS",
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
