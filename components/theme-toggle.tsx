"use client"

import { useTheme } from "@/components/theme-provider"
import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border shadow-sm"
      aria-label={theme === "light" ? "Activar modo oscuro" : "Activar modo claro"}
    >
      <div className="relative w-5 h-5">
        <motion.div
          initial={{ opacity: theme === "light" ? 1 : 0, scale: theme === "light" ? 1 : 0 }}
          animate={{ opacity: theme === "light" ? 1 : 0, scale: theme === "light" ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun className="w-4 h-4 text-foreground" />
        </motion.div>
        <motion.div
          initial={{ opacity: theme === "dark" ? 1 : 0, scale: theme === "dark" ? 1 : 0 }}
          animate={{ opacity: theme === "dark" ? 1 : 0, scale: theme === "dark" ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className="w-4 h-4 text-foreground" />
        </motion.div>
      </div>
    </motion.button>
  )
}
