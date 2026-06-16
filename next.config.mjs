/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,

  images: {
    // Serve modern formats; Vercel optimizes remote images on the fly in prod.
    // In local dev we skip the optimizer (it needs outbound network) so images
    // load directly — production builds still get AVIF/WebP optimization.
    unoptimized: process.env.NODE_ENV === "development",
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },

  // Lets Next tree-shake GSAP imports more aggressively.
  experimental: {
    optimizePackageImports: ["gsap"],
  },

  // Security headers (Next already sets immutable caching for hashed assets).
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
