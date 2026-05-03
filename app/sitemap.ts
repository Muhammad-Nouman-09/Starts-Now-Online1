// app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://startsnow.site";

  const staticRoutes = [
    "",
    "/about",
    "/blog",
    "/coin",
    "/contact",
    "/privacy",
    "/terms",
    "/crypto-profit-calculator-with-fees",
    "/crypto-to-usd-converter-instant",
    "/live-crypto-market-prices-tracker",
  ];

  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}