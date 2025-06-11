import withExportImages from "next-export-optimize-images";

const isGitHubPages = process.env.NEXT_PUBLIC_DEPLOY_TARGET === 'github';

const nextConfig = withExportImages({
  reactStrictMode: true,
  output: "export",
  basePath: isGitHubPages ? '/kinokotogame.club' : '',
  assetPrefix: isGitHubPages ? '/kinokotogame.club' : '',
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
