import webpack from "webpack";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
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
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "standalone",
  images: {
    domains: ["sandbox.servihero.com"],
  },
};

export default nextConfig;
