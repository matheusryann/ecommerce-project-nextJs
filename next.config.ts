import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // mais simples que remotePatterns pra este caso
    domains: [
      "d4lgxe9bm8juw.cloudfront.net",
      "fsc-projects-static.s3.us-east-1.amazonaws.com",
    ],
  },
};

export default nextConfig;
