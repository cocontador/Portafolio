"use client"

import { useState } from "react"
import Link from "next/link"
import { FaCodeBranch, FaCheck, FaFilePdf } from "react-icons/fa"
import { footerConfig, socialIconMap } from "@/data/content"
import { appVersion } from "@/lib/constants"
import { SocialPlatform } from "@/lib/types"
import { cn } from "@/lib/utils"

/**
 * Internal component to render social media links and CV download button
 */
function SocialLinks() {
  const [copied, setCopied] = useState(false)

  return (
    <div className="flex items-center justify-center gap-4 flex-wrap">
      {Object.entries(footerConfig.socialLinks)
        .filter(([_, url]) => url && url.trim() !== "")
        .map(([platform, url]) => {
          const platformKey = platform as SocialPlatform
          const socialLink = socialIconMap[platformKey]

          if (!socialLink) return null

          const { icon: Icon, label } = socialLink
          const isEmail = platform === "email"

          // Manejador para copiar el correo y abrir el cliente de correo
          const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
            if (isEmail) {
              e.preventDefault()
              const emailAddress = url.replace("mailto:", "")
              
              // 1. Copiar al portapapeles
              navigator.clipboard.writeText(emailAddress).then(() => {
                setCopied(true)
                setTimeout(() => setCopied(false), 2500)
              })

              // 2. Abrir de forma garantizada el cliente de correo
              window.open(`mailto:${emailAddress}`, "_self")
            }
          }

          const href = isEmail && !url.startsWith("mailto:") ? `mailto:${url}` : url

          return (
            <div key={label} className="relative group/tooltip">
              <Link
                href={href}
                onClick={handleClick}
                aria-label={label}
                target={isEmail ? undefined : "_blank"}
                rel={isEmail ? undefined : "noopener noreferrer"}
                className={cn(
                  "group relative flex items-center justify-center w-11 h-11",
                  "rounded-lg border border-gray-300 dark:border-gray-700",
                  "bg-gray-100 dark:bg-gray-800",
                  "text-gray-700 dark:text-gray-300",
                  "hover:border-accent-500 dark:hover:border-accent-400",
                  "hover:bg-accent-500/10 dark:hover:bg-accent-500/10",
                  "hover:text-accent-600 dark:hover:text-accent-400",
                  "transition-all duration-200",
                  "hover:scale-110 hover:shadow-md",
                  "active:scale-95",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500",
                  "focus-visible:ring-offset-2 dark:focus-visible:ring-offset-black"
                )}
              >
                {isEmail && copied ? (
                  <FaCheck className="w-5 h-5 text-green-500 animate-bounce" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </Link>

              {/* Tooltip de aviso cuando se copia */}
              {isEmail && copied && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded-md whitespace-nowrap shadow-md pointer-events-none dark:bg-white dark:text-black">
                  ¡Correo copiado!
                </span>
              )}
            </div>
          )
        })}

      {/* Botón de descarga de CV en PDF */}
      <div className="relative group/tooltip">
        <a
          href="/projects/cv.pdf"
          download="Constanza_Contador_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Descargar CV"
          className={cn(
            "group relative flex items-center justify-center w-11 h-11",
            "rounded-lg border border-gray-300 dark:border-gray-700",
            "bg-gray-100 dark:bg-gray-800",
            "text-gray-700 dark:text-gray-300",
            "hover:border-accent-500 dark:hover:border-accent-400",
            "hover:bg-accent-500/10 dark:hover:bg-accent-500/10",
            "hover:text-accent-600 dark:hover:text-accent-400",
            "transition-all duration-200",
            "hover:scale-110 hover:shadow-md",
            "active:scale-95",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500",
            "focus-visible:ring-offset-2 dark:focus-visible:ring-offset-black"
          )}
        >
          <span className="text-xs font-bold tracking-tight">CV</span>
        </a>

        {/* Tooltip opcional al pasar el mouse */}
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded-md whitespace-nowrap shadow-md pointer-events-none opacity-0 group-hover/tooltip:opacity-100 transition-opacity dark:bg-white dark:text-black">
          Descargar CV
        </span>
      </div>
    </div>
  )
}

export default function Footer() {
  return (
    <footer
      className={cn(
        "relative mt-6 py-6 text-center text-sm text-gray-600 dark:text-gray-400",
        "px-4 border-t border-gray-200 dark:border-gray-900",
        "bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-sm",
        "before:content-[''] before:absolute before:top-0 before:left-0 before:right-0",
        "before:h-px before:bg-linear-to-r before:from-transparent",
        "before:via-gray-500/30 before:to-transparent"
      )}
      id="footerPortfolio"
    >
      {/* Social Links Grid */}
      <div className="flex justify-center flex-wrap gap-4 mb-4">
        <SocialLinks />
      </div>

      {/* Divider */}
      <div className="max-w-xs mx-auto mb-4 h-px bg-linear-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />

      {/* Copyright */}
      <p className="text-sm mb-2 text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} {footerConfig.copyrightName}. All rights reserved.
      </p>

      {/* Version & Attribution - Terminal style */}
      {footerConfig.showVersionAndAttribution && (
        <div
          className={cn(
            "flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3",
            "text-xs font-mono text-gray-500 dark:text-gray-500"
          )}
        >
          <Link
            href={`https://github.com/alemoraru/nextjs-portofolio-website/releases/tag/v${appVersion}`}
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md",
              "bg-gray-200 dark:bg-gray-800",
              "border border-gray-300 dark:border-gray-700",
              "hover:border-accent-500 dark:hover:border-accent-400",
              "hover:bg-accent-500/10 dark:hover:bg-accent-500/10",
              "transition-all duration-200",
              "hover:shadow-sm"
            )}
          >
            <FaCodeBranch className="w-3.5 h-3.5" />
            <span>v{appVersion}</span>
          </Link>

          <span className="text-gray-400 dark:text-gray-600">•</span>

          <span>Built with Next.js</span>
        </div>
      )}
    </footer>
  )
}