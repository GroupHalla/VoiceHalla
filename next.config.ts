import type { NextConfig } from "next";

const BASE_PATH = "/VoiceHalla";

const nextConfig: NextConfig = {
  output: "export",
  basePath: BASE_PATH,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
