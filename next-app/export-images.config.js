/**
 * @type {import('next-export-optimize-images').Config}
 */
const isGitHubPages = process.env.NEXT_PUBLIC_DEPLOY_TARGET === "github";
const config = {
  basePath: isGitHubPages ? "/kinokotogame.club" : "",
};

export default config;
