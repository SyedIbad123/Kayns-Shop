import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/product/:slug*",
        destination: "/portfolio",
        permanent: true,
      },
      {
        source: "/product-category/:slug*",
        destination: "/portfolio",
        permanent: true,
      },
      {
        source: "/shop/:slug*",
        destination: "/portfolio",
        permanent: true,
      },
      {
        source: "/my-account/:slug*",
        destination: "/",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.freepik.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.bigfootdigital.co.uk",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
