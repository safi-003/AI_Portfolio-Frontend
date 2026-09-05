import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    '192.168.1.6',
    '192.168.1.2',
    '172.22.112.1',
    '172.20.10.3',
    '192.168.94.81',
    '10.90.22.81'
  ],
};

export default nextConfig;