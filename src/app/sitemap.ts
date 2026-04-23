import { MetadataRoute } from "next";
import { allCollections } from "@/data/collection";
import { sportUniforms } from "@/data/uniformSports";
import { getPortfolioProducts } from "@/lib/portfolio-products.server";

const BASE_URL = "https://www.kayns.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/quote`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/uniform`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/delivery-information`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const collectionRoutes: MetadataRoute.Sitemap = allCollections.map(
    (item) => ({
      url: `${BASE_URL}/collection/${item.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  const uniformSportRoutes: MetadataRoute.Sitemap = sportUniforms.map(
    (sport) => ({
      url: `${BASE_URL}/uniform/${sport.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  const portfolioProductRoutes: MetadataRoute.Sitemap =
    getPortfolioProducts().map((product) => ({
      url: `${BASE_URL}/portfolio/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    }));

  return [
    ...staticRoutes,
    ...collectionRoutes,
    ...uniformSportRoutes,
    ...portfolioProductRoutes,
  ];
}
