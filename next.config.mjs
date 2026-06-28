/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  serverExternalPackages: [
    "@better-auth/kysely-adapter",
  ],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;