"use client"

import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"
import { Globe } from "lucide-react"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setLanguage(language === "es" ? "en" : "es")}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border shadow-sm"
      aria-label={language === "es" ? "Switch to English" : "Cambiar a Español"}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <Globe className="w-4 h-4 text-foreground" />
        <span className="absolute -bottom-1 -right-1 text-[8px] font-bold text-foreground bg-background rounded-full w-3 h-3 flex items-center justify-center border border-border">
          {language.toUpperCase()}
        </span>
      </div>
    </motion.button>
  )
}
