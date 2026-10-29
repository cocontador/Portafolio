"use client"

import Link from "next/link"
import HoverArrow from "@/components/HoverArrow"
import { cn } from "@/lib/utils"

interface ViewAllHeaderProps {
  title: string
  pageUrl: string
  linkText?: string // Texto opcional para el botón (por defecto dirá "Ver todo")
}

/**
 * A functional component that renders a "View All" button with a link to a specified page.
 */
export default function ViewAllHeader({ title, pageUrl, linkText = "Ver todo" }: ViewAllHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
      <Link
        href={pageUrl}
        className={cn(
          "group flex items-center gap-1.5",
          "text-sm font-semibold text-accent-600 dark:text-accent-400",
          "hover:gap-2.5 transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-accent-500 focus-visible:ring-offset-2",
          "dark:focus-visible:ring-offset-black rounded-sm"
        )}
      >
        <span className="text-sm font-semibold text-accent-600 dark:text-accent-400">
          {linkText}
        </span>
        <HoverArrow className="text-base" />
      </Link>
    </div>
  )
}