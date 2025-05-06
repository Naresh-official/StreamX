/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  images: {
    domains: ["i.ytimg.com", "static.toiimg.com"],
  },
};

export default nextConfig;
