"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function HeroParallax() {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 500])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 700])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-accent/50 to-background dark:from-accent/10 dark:to-background"
      />

      <motion.div
        style={{ y: y2, opacity }}
        className="absolute -top-20 -left-20 w-96 h-96 bg-green-200/20 dark:bg-green-900/10 rounded-full blur-3xl"
      />

      <motion.div
        style={{ y: y3, opacity }}
        className="absolute top-1/3 -right-20 w-80 h-80 bg-purple-200/20 dark:bg-purple-900/10 rounded-full blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute inset-0 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-DREZ0opxMhhj4teiWpPvFKVxUyW0iC.png')] bg-center bg-no-repeat bg-contain"
        style={{ filter: "blur(1px)" }}
      />
    </div>
  )
}
