import type { SiteMetadata } from "@/lib/types"
import type { Metadata } from "next"

/**
 * Site metadata configuration
 * Customize this file with your own information for SEO and social media sharing
 */
export const siteMetadata: SiteMetadata = {
  /**
   * Accent color theme for the portfolio.
   */
  theme: "blue",

  /**
   * Site title (shown in browser tabs and search results)
   */
  title: "Constanza Contador — Portafolio Profesional",

  /**
   * Site description (shown in search results and social media)
   */
  description:
    "Portafolio profesional de Constanza Contador, analista programadora y desarrolladora de software. Explora mis proyectos, experiencia y habilidades técnicas.",

  /**
   * Keywords for SEO
   */
  keywords: [
    "Constanza Contador",
    "Analista Programadora",
    "Software Engineer",
    "Next.js",
    "React",
    "TypeScript",
    "Web Development",
    "Portfolio",
  ],

  /**
   * Author information
   */
  author: {
    name: "Constanza Contador",
    url: "https://www.linkedin.com/in/cocontador",
  },

  /**
   * Base URL of your website
   */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://portafolioconstanzacontador.vercel.app",

  /**
   * Social media handles
   */
  social: {
    twitter: "@cocontador",
  },

  /**
   * Optional: Custom Open Graph image for the index (home) page.
   * Si dejas esto en null, usará la imagen generada automáticamente.
   */
  ogImage: null,
}

/**
 * Generate the complete metadata object for Next.js
 */
export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: [{ name: siteMetadata.author.name, url: siteMetadata.author.url }],
  creator: siteMetadata.author.name,
  publisher: siteMetadata.author.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icons/favicon.ico",
    shortcut: "/icons/favicon.ico",
    apple: "/icons/favicon.ico",
  },
  metadataBase: new URL(siteMetadata.siteUrl),
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    ...(siteMetadata.ogImage && {
      images: [
        {
          url: siteMetadata.ogImage,
          width: 1200,
          height: 630,
          alt: siteMetadata.title,
        },
      ],
    }),
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    creator: siteMetadata.social.twitter,
    ...(siteMetadata.ogImage && { images: [siteMetadata.ogImage] }),
  },
  category: "technology",
}