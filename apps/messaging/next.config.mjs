import webpack from "webpack";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui", "repo/tailwind-config"],
  webpack(config) {
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /^isomorphic-form-data$/,
        `${config.context}/form-data-mock.js`,
      ),
    );
    return config;
  },
  experimental: {
    optimizePackageImports: ["package-name"],
  },
};

export default nextConfig;
