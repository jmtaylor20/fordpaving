import type { MetadataRoute } from "next";
import { services } from "./site-data";
import { siteUrl } from "./structured-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entry = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly") => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1, "weekly"),
    entry("/services/", 0.9, "monthly"),
    ...services.map((service) => entry(`/${service.slug}/`, 0.8, "monthly")),
    entry("/gallery/", 0.7, "monthly"),
    entry("/about/", 0.6, "yearly"),
    entry("/contact/", 0.8, "yearly"),
    entry("/privacy-policy/", 0.2, "yearly"),
  ];
}
