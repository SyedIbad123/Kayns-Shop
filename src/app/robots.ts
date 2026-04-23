import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.kayns.co.uk/sitemap.xml",
    host: "https://www.kayns.co.uk",
  };
}
