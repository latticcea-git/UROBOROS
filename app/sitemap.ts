import type { MetadataRoute } from "next";
import { serviceSlugs } from "./agency/[service]/service-data";
import { blogPosts } from "./blog/blog-data";
import { bookProjects } from "./book/book-data";
import { indexableCinemaWorks } from "./films/cinema/cinema-data";

const origin = "https://latticce.com";
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/agency", "/book", "/blog", "/design", "/films", "/films/cinema", "/sound", "/studio", "/time"];
  return [
    ...routes.map((route) => ({ url: `${origin}${route}/`, changeFrequency: "monthly" as const, priority: route === "" ? 1 : 0.8 })),
    ...serviceSlugs.map((service) => ({ url: `${origin}/agency/${service}/`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...bookProjects.map((project) => ({ url: `${origin}/book/${project.slug}/`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...blogPosts.map((post) => ({ url: `${origin}/blog/${post.slug}/`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...indexableCinemaWorks.map((work) => ({ url: `${origin}/films/cinema/${work.slug}/`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
