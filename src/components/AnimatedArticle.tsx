"use client"

import { motion } from "framer-motion"
import { ReactNode, useEffect } from "react"

export default function AnimatedArticle({ children }: { children: ReactNode }) {
  useEffect(() => {
    const hash = window.location.hash // Lee el #demo-walo de la URL
    if (hash) {
      const targetId = hash.replace("#", "")
      
      let attempts = 0
      const maxAttempts = 30 // Intentará durante 3 segundos máximo

      const interval = window.setInterval(() => {
        const element = document.getElementById(targetId)
        attempts++

        if (element) {
          window.clearInterval(interval)
          element.scrollIntoView({ behavior: "smooth", block: "start" })
        } else if (attempts >= maxAttempts) {
          window.clearInterval(interval)
        }
      }, 100)

      return () => window.clearInterval(interval)
    }
  }, [])

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto px-4 max-w-4xl flex flex-col items-center justify-center text-left"
    >
      {children}
    </motion.article>
  )
}