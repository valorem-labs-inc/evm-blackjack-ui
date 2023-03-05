/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  // scope: '/app',
  sw: "service-worker.js",
});

module.exports =
  // withPWA(
  {
    reactStrictMode: true,
    experimental: {
      appDir: true,
    },
    transpilePackages: ["ui"],
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack"],
      });

      return config;
    },
  };
// );
