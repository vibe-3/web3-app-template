import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  watchOptions: {
    pollIntervalMs: 1000
  },
  webpackDevMiddleware: (config: any) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
};

export default nextConfig;
