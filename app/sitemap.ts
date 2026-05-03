import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://startsnow.site";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },

    // CORE PAGES
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
    },

    // 🔥 IMPORTANT SEO TOOL PAGES
    {
      url: `${baseUrl}/crypto-profit-calculator-with-fees`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${baseUrl}/live-crypto-market-prices-tracker`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cryptocurrency-converter-live-rates`,
      lastModified: new Date(),
      priority: 0.9,
    },
  ];
}