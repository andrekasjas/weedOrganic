"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface ContactButtonProps {
  href: string
  icon: ReactNode
  text: string
}

export function ContactButton({ href, icon, text }: ContactButtonProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-primary-foreground px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
    >
      {icon}
      <span>{text}</span>
    </motion.a>
  )
}
