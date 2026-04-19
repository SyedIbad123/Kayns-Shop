import { MetadataRoute } from "next";
import { allCollections } from "@/data/collection";
import { sportUniforms } from "@/data/uniformSports";
import { getPortfolioProducts } from "@/lib/portfolio-products.server";

const BASE_URL = "https://kayns.co.uk";

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
      url: `${BASE_URL}/quote/success`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/uniform`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
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

  const customizeRoutes: MetadataRoute.Sitemap = allCollections.map((item) => ({
    url: `${BASE_URL}/customize/${item.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

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
    ...customizeRoutes,
    ...uniformSportRoutes,
    ...portfolioProductRoutes,
  ];
}
