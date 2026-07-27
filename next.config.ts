import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Docker 이미지를 작게 유지. Dockerfile 이 .next/standalone 을 복사한다.
  output: "standalone",
};

export default nextConfig;
