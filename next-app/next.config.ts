const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.thecatapi.com",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "*.thedogapi.com",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "kinokotogame.mods.jp",
        port: "",
        pathname: "/public/image/**",
      },
    ],
  },
  allowedDevOrigins: ["192.168.0.211"],
};

export default nextConfig;
