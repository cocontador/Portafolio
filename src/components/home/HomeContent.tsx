"use client"

import { motion, MotionConfig } from "framer-motion"
import {
  fadeUpVariants,
  staggerContainerVariants,
  staggerItemVariants,
} from "@/components/home/animations"
import BlogPreview from "@/components/home/BlogPreview"
import ProjectsPreview from "@/components/home/ProjectsPreview"
import QuickFacts from "@/components/home/QuickFacts"
import WorkPreview from "@/components/home/WorkPreview"
import { homeIntroConfig } from "@/data/content"
import { BlogPostProps, ProjectProps, WorkItemProps } from "@/lib/types"

interface HomeContentProps {
  blog?: BlogPostProps[] // Opcional por si acaso
  work: WorkItemProps[]
  projects: ProjectProps[]
}

export default function HomeContent({ work, projects }: HomeContentProps) {
  return (
    <MotionConfig reducedMotion="user">
      <section className="px-4 max-w-4xl mx-auto">
        {/* Intro Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeUpVariants}
          viewport={{ once: true }}
          className="mt-6 mb-8"
        >
          {/* Título Centrado */}
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100 flex items-center justify-center flex-wrap gap-2 text-center">
            Hola, soy {homeIntroConfig.shortName || homeIntroConfig.name}
            <motion.span
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              className="inline-block"
            >
              👋
            </motion.span>
          </h1>

          {/* Contenedor principal con flex para móvil y float para pantallas grandes */}
          <div className="flex flex-col items-center md:block">
            {/* Foto Circular: centrada en móvil, flotada a la izquierda en pantallas medianas (md) */}
            <motion.img
              variants={staggerItemVariants}
              src="/projects/concon.jpeg"
              alt="Constanza Contador"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-lg border-2 border-primary mb-6 md:float-left md:mr-6 md:mb-4 flex-shrink-0"
            />

            {/* Párrafos de texto: justificados para ordenarlos en el teléfono */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={staggerContainerVariants}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {homeIntroConfig.introParagraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  variants={staggerItemVariants}
                  className="text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300 text-justify"
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <QuickFacts />
        <WorkPreview work={work} />
        <ProjectsPreview projects={projects} />
      </section>
    </MotionConfig>
  )
}