import withExportImages from "next-export-optimize-images";

const nextConfig = withExportImages({
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: {
    deviceSizes: [640, 960, 1280, 1600, 1920],
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
    ],
  },
  allowedDevOrigins: ["192.168.0.211"],
});

export default nextConfig;
