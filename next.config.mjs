/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "desu.shikimori.one",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
