"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

interface ParallaxSectionProps {
  imageUrl: string
  title: string
  text: string
}

export function ParallaxSection({ imageUrl, title, text }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9])

  return (
    <section ref={ref} className="relative h-[80vh] overflow-hidden flex items-center justify-center">
      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]) }} className="absolute inset-0 z-0">
        <Image src={imageUrl || "/placeholder.svg"} alt="Parallax Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70" />
      </motion.div>
      <motion.div style={{ y, opacity, scale }} className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-black/30 dark:bg-black/50 backdrop-blur-sm p-8 md:p-12 rounded-2xl"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">{title}</h2>
          <p className="text-xl md:text-2xl">{text}</p>
        </motion.div>
      </motion.div>
    </section>
  )
}
