import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev-only headers to relax CSP for HMR/overlay which uses eval
  // This adds 'unsafe-eval' only in development to avoid breaking Next dev tooling
  async headers() {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/(.*)",
          headers: [
            {
              key: "Content-Security-Policy",
              value:
                "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self' ws:; object-src 'none';",
            },
          ],
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
