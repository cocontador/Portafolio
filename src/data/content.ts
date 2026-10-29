import { IconType } from "react-icons"
import {
  FaMapMarkerAlt,
  FaBook,
  FaLanguage,
  FaUniversity,
    FaTools,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaRunning,
} from "react-icons/fa"
import { FaDumbbell, FaWater} from "react-icons/fa6"
import { SocialPlatform } from "@/lib/types"

/**
 * Configuration for the home page intro section
 */
export const homeIntroConfig = {
  /**
   * Your full name (used in breadcrumbs, footer, and other places)
   */
  name: "Constanza Contador Moraga",

  /**
   * Your short/first name (optional - used in "Hola, Soy..." greeting)
   * If not provided, the full name will be used
   */
  shortName: "Constanza",

  /**
   * Introduction paragraphs (can be multiple)
   */
  introParagraphs: [
    "Soy analista programador titulada de Duoc UC y, tras 6 años de exitoso ejercicio profesional como cirujano dentista, decidí dar un giro estratégico hacia el desarrollo de software. Durante 2 años y medio de carrera académica intensiva, me enfoqué en construir soluciones reales, destacando como scrum master y desarrolladora de WALO (un SaaS multitenant para microemprendedores que hoy se encuentra en proceso de postulación a fondos CORFO). Además, consolidé mis competencias técnicas realizando mi práctica profesional en CloudLatam, donde profundicé en arquitectura, redes y seguridad en Google Cloud Platform (GCP) durante 4 meses.",

    "Fuera del código, soy una persona muy activa y disciplinada, me apasiona hacer deporte, subir cerros, correr carreras de trail, surfear, leer y disfrutar de mi tiempo libre junto a mis perritas",
  ],
  /**
   * Quick facts displayed as chips below your introduction
   * Fill in the fields below. Leave empty ("") to hide a fact.
   */
  facts: {
    education: "Duoc UC -  Analista programador",
    location: "Viña del Mar, Chile",
    languages: "EN / ES",
    role: "Full-Stack Dev",
  },

  /**
   * Additional custom facts to display below the predefined ones.
   * Add any extra facts you want to display with their icons.
   * You must use an icon from react-icons and provide its label.
   */
  additionalFacts: [
  { icon: FaBook, label: "Lectura" },
  { icon: FaDumbbell, label: "Entrenamiento de Pesas" },
  { icon: FaRunning, label: "Trail Running" },
  { icon: FaWater, label: "Surf" },
] as Array<{ icon: IconType; label: string }>,

  /**
   * Number of work items to show in the preview sections on the home page.
   * Note that the actual number shown may be less if there aren't enough items.
   * If the actual number of items is larger than this, a "View All" link will be displayed.
   * This number must be a number greater than zero.
   */
  workItemsToShow: 3,

  /**
   * Number of projects to show in the preview sections on the home page.
   * Note that the actual number shown may be less if there aren't enough items.
   * If the actual number of items is larger than this, a "View All" link will be displayed.
   * This number must be a number greater than zero. We recommend keeping it low and
   * having a multiple of 2 for better grid layout (e.g., 2 or 4).
   */
  projectsToShow: 2,

  /**
   * Number of blog posts and projects to show in the preview sections on the home page.
   * Note that the actual number shown may be less if there aren't enough items.
   * If the actual number of items is larger than this, a "View All" link will be displayed.
   * This number must be a number greater than zero. We recommend keeping it low (=3) and
   * having a multiple of 3 for better grid layout.
   */
  blogPostsToShow: 3,
}

/**
 * Configuration for pagination settings within the site.
 */
export const paginationConfig = {
  /**
   * Number of blog posts to show per page for "/blog" and "/blog?page=n" routes.
   * This number must be a number greater than zero.
   */
  blogPostsPerPage: 5,

  /**
   * Number of work items to show per page for "/work" and "/work?page=n" routes.
   * This number must be a number greater than zero.
   */
  workItemsPerPage: 6,

  /**
   * Number of projects to show per page for "/projects" and "/projects?page=n" routes.
   * This number must be a number greater than zero.
   */
  projectsPerPage: 6,
}

/**
 * Configuration for the footer
 */
export const footerConfig = {
  /**
   * Name displayed in the copyright notice
   */
  copyrightName: "Constanza Contador",

  /**
   * Show version and attribution section
   * Set to true if you want to hide the "built by @alemoraru" attribution and version number.
   * By default, this is true to give credit to the template creator, but you can disable it if desired.
   */
  showVersionAndAttribution: true,

  /**
   * Social media links
   * Simply add your URLs below. Leave empty ("") to hide a social link.
   */
  socialLinks: {
    github: "https://github.com/cocontador",
    linkedin: "https://www.linkedin.com/in/cocontador",
    email: "constanzacontador.mo@gmail.com",
  } as Record<SocialPlatform, string>,
}

// USERS DO NOT NEED TO MODIFY BELOW THIS LINE
// YOU CAN, HOWEVER, EXTEND THE ICON MAPS IF NEEDED

/**
 * Internal mapping of predefined fact categories to their icons
 * This is used internally by the HomeContent component - users don't need to modify this
 */
export const factIconMap: Record<keyof typeof homeIntroConfig.facts, IconType> = {

  education: FaUniversity,
  location: FaMapMarkerAlt,
  languages: FaLanguage,
  role: FaTools,
}

/**
 * Internal mapping of social platforms to their icons and labels
 * This is used internally by the Footer component - users don't need to modify this
 */
export const socialIconMap: Partial<Record<SocialPlatform, { icon: IconType; label: string }>> = {
  github: { icon: FaGithub, label: "GitHub" },
  linkedin: { icon: FaLinkedin, label: "LinkedIn" },
  email: { icon: FaEnvelope, label: "Email" },
}