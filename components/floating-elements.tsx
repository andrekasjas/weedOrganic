"use client"

import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

export function FloatingElements() {
  const isMobile = useMobile()

  if (isMobile) return null

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-1/4 left-1/4 w-8 h-8 bg-primary/20 rounded-full"
        style={{
          animation: "float 8s ease-in-out infinite",
          animationDelay: "0s",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute top-1/3 right-1/4 w-12 h-12 bg-purple-500/20 dark:bg-purple-500/10 rounded-full"
        style={{
          animation: "float 10s ease-in-out infinite",
          animationDelay: "1s",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="absolute bottom-1/4 left-1/3 w-10 h-10 bg-primary/20 rounded-full"
        style={{
          animation: "float 12s ease-in-out infinite",
          animationDelay: "2s",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="absolute bottom-1/3 right-1/3 w-6 h-6 bg-purple-500/20 dark:bg-purple-500/10 rounded-full"
        style={{
          animation: "float 9s ease-in-out infinite",
          animationDelay: "3s",
        }}
      />
    </>
  )
}
