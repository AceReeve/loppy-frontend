/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui", "repo/tailwind-config"],
  experimental: {
    optimizePackageImports: ["package-name"],
  },
};
