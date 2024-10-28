import webpack from "webpack";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  experimental: {
    optimizePackageImports: ["package-name"],
    turbo: {
      resolveAlias: {
        // for turbopack - this is inserted because of this issue when using @twilio/conversation
        // https://github.com/vercel/next.js/issues/60687#issuecomment-1993484474
        "isomorphic-form-data": "./form-data-mock.js",
      },
    },
  },
  // This is still needed on builds since turbopack doesn't support production build yet
  webpack(config) {
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /^isomorphic-form-data$/,
        `${config.context}/form-data-mock.js`,
      ),
    );
    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "sandbox.servihero.com",
        port: "",
        pathname: "/",
      },
    ],
  },
};

export default nextConfig;
