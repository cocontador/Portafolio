import HomeContent from "@/components/home/HomeContent"
import JsonLd from "@/components/JsonLd"
import { footerConfig, homeIntroConfig } from "@/data/content"
import { siteMetadata } from "@/data/metadata"
import { getAllProjects, getAllWorkItems } from "@/lib/mdx" // <--- Ya no importamos getAllBlogPosts
import type { Person, WithContext } from "schema-dts"

/**
 * Home component that serves as the main landing page for the portfolio.
 * This is accessed at the root URL ("/") of the application.
 */
export default async function Home() {
  // Solo cargamos trabajo y proyectos, eliminamos el blog
  const [work, projects] = await Promise.all([
    getAllWorkItems(),
    getAllProjects(),
  ])

  const sameAs = Object.values(footerConfig.socialLinks).filter(url => url && url !== "/")

  const jsonLd: WithContext<Person> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteMetadata.author.name,
    url: siteMetadata.siteUrl,
    description: siteMetadata.description,
    jobTitle: homeIntroConfig.facts.role,
    ...(sameAs.length > 0 && { sameAs }),
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <HomeContent work={work} projects={projects} blog={[]} />
    </>
  )
}