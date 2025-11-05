import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack empty config to allow webpack config to exist
  // DO NOT EDIT: This configuration is critical for Docker/Daytona compatibility
  turbopack: {},

  // Webpack configuration for Docker/Daytona polling fallback
  // Used only if explicitly running with --webpack flag
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,           // Check for changes every second
        aggregateTimeout: 300, // Delay before rebuilding
      };
    }
    return config;
  },
};

export default nextConfig;
