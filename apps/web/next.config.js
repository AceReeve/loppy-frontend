module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  experimental: {
    optimizePackageImports: ["package-name"],
    turbo: {
      resolveAlias: {
        // this is inserted because of this issue when using @twilio/conversation
        // https://github.com/vercel/next.js/issues/60687#issuecomment-1993484474
        "isomorphic-form-data": "./form-data-mock.js",
      },
    },
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
