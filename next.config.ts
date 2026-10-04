import type { NextConfig } from "next";

/** Old Vite/React Router URLs → new routes (HTTP 301) so existing rankings carry over. */
const legacyPackages: Record<string, string> = {
  "classic-kaziranga": "/tours/kaziranga-tour-package-3n4d",
  "dehing-patkai-tour": "/tours/upper-assam-rainforest-tour-4n5d",
  "dibru-saikhowa-tour": "/tours/upper-assam-rainforest-tour-4n5d",
  "tawang-tour": "/tours/tawang-tour-package-6n7d",
  "nagaland-tour": "/tours/nagaland-tour-package-5n6d",
  "anini-tour": "/tours/anini-dibang-valley-tour-6n7d",
  "cherrapunji-tour": "/tours/shillong-cherrapunji-tour-3n4d",
  "shillong-tour": "/tours/shillong-cherrapunji-tour-3n4d",
  "meghalaya-tour": "/tours/meghalaya-tour-package-4n5d",
  "dawki-tour": "/tours/meghalaya-root-bridge-dawki-adventure-3n4d",
};

const statePages: Record<string, string> = {
  assam: "/assam-tour-packages",
  "arunachal-pradesh": "/arunachal-pradesh-tour-packages",
  meghalaya: "/meghalaya-tour-packages",
  nagaland: "/nagaland-tour-packages",
};

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1600],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    return [
      { source: "/packages", destination: "/tours", statusCode: 301 },
      ...Object.entries(legacyPackages).map(([id, destination]) => ({
        source: `/packages/${id}`,
        destination,
        statusCode: 301,
      })),
      { source: "/packages/:id", destination: "/tours", statusCode: 301 },
      ...Object.entries(statePages).map(([state, destination]) => ({
        source: `/places/${state}`,
        destination,
        statusCode: 301,
      })),
      { source: "/places", destination: "/tours", permanent: false },
      { source: "/assam", destination: "/assam-tour-packages", statusCode: 301 },
      { source: "/meghalaya", destination: "/meghalaya-tour-packages", statusCode: 301 },
      { source: "/nagaland", destination: "/nagaland-tour-packages", statusCode: 301 },
      { source: "/arunachal", destination: "/arunachal-pradesh-tour-packages", statusCode: 301 },
      { source: "/arunachal-pradesh", destination: "/arunachal-pradesh-tour-packages", statusCode: 301 },
      { source: "/blog", destination: "/travel-guide", statusCode: 301 },
      { source: "/blog/:slug", destination: "/travel-guide/:slug", statusCode: 301 },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
