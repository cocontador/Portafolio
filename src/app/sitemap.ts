import { siteMetadata } from "@/data/metadata"
import { getAllBlogPosts, getAllProjects, getAllWorkItems } from "@/lib/mdx"
import type { MetadataRoute } from "next"

const base = siteMetadata.siteUrl

/**
 * Parses a "Mon YYYY" string (e.g. "Aug 2024") to the first of that month, in UTC so the
 * result doesn't depend on the build machine's timezone.
 */
const monthStart = (value: string) => {
  const parsed = new Date(`${value} 1 UTC`)
  return isNaN(parsed.getTime()) ? new Date() : parsed
}

/** The most recent of the given dates, with fallback to current date if empty. */
const newest = (dates: Date[]) => {
  const validDates = dates.filter(d => d instanceof Date && !isNaN(d.getTime()))
  if (validDates.length === 0) return new Date()
  return new Date(Math.max(...validDates.map(Number)))
}

/**
 * Generates a sitemap.xml file for the website.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, workItems, projects] = await Promise.all([
    getAllBlogPosts().catch(() => []),
    getAllWorkItems().catch(() => []),
    getAllProjects().catch(() => []),
  ])

  const tags = [...new Set(posts.flatMap(post => post.tags ?? []))]

  const blogPostRoutes: MetadataRoute.Sitemap = posts.map(post => {
    const postDate = post.date ? new Date(post.date) : new Date()
    return {
      url: `${base}/blog/${post.slug}`,
      lastModified: isNaN(postDate.getTime()) ? new Date() : postDate,
      changeFrequency: "monthly",
      priority: 0.6,
    }
  })

  const blogTagRoutes: MetadataRoute.Sitemap = tags.map(tag => {
    const tagPosts = posts.filter(p => p.tags?.includes(tag))
    const tagDates = tagPosts.map(p => (p.date ? new Date(p.date) : new Date()))
    return {
      url: `${base}/blog/tag/${encodeURIComponent(tag.toLowerCase())}`,
      lastModified: newest(tagDates),
      changeFrequency: "weekly",
      priority: 0.5,
    }
  })

  const workRoutes: MetadataRoute.Sitemap = workItems.map(item => ({
    url: `${base}/work/${item.slug}`,
    lastModified: monthStart(item.end === "Present" ? item.start : item.end),
    changeFrequency: "yearly",
    priority: 0.6,
  }))

  const projectRoutes: MetadataRoute.Sitemap = projects.map(project => {
    const endDate = project.endDate ? new Date(project.endDate) : new Date()
    return {
      url: `${base}/projects/${project.slug}`,
      lastModified: isNaN(endDate.getTime()) ? new Date() : endDate,
      changeFrequency: "monthly",
      priority: 0.6,
    }
  })

  // The listing pages' lastModified is the newest of the items they list.
  const postsDate = newest(blogPostRoutes.map(r => r.lastModified as Date))
  const workDate = newest(workRoutes.map(r => r.lastModified as Date))
  const projectsDate = newest(projectRoutes.map(r => r.lastModified as Date))

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: newest([postsDate, workDate, projectsDate]),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/work`,
      lastModified: workDate,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${base}/projects`,
      lastModified: projectsDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/blog`,
      lastModified: newest(posts.map(post => (post.date ? new Date(post.date) : new Date()))),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ]

  return [...staticRoutes, ...blogPostRoutes, ...blogTagRoutes, ...workRoutes, ...projectRoutes]
}