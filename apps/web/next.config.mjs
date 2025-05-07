/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  images: {
    domains: ["i.ytimg.com", "static.toiimg.com", "cdn.mos.cms.futurecdn.net"],
  },
};

export default nextConfig;
