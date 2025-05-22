"use client"

import { motion } from "framer-motion"
import { InstagramIcon } from "lucide-react"
import { WhatsappIcon } from "./whatsapp-icon"
import { ThemeToggle } from "./theme-toggle"

interface MobileMenuProps {
  onClose: () => void
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  const menuVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: "100%", transition: { duration: 0.3 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  }

  const menuItems = [
    { href: "#productos", label: "Productos" },
    { href: "#beneficios", label: "Beneficios" },
    { href: "#contacto", label: "Contacto" },
  ]

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={menuVariants}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg flex flex-col p-6"
    >
      <div className="flex justify-between mb-8">
        <ThemeToggle />
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      <nav className="flex-1">
        <ul className="space-y-6">
          {menuItems.map((item, i) => (
            <motion.li key={item.href} custom={i} initial="hidden" animate="visible" variants={itemVariants}>
              <a
                href={item.href}
                onClick={onClose}
                className="text-2xl font-medium text-primary block py-2 border-b border-border"
              >
                {item.label}
              </a>
            </motion.li>
          ))}
        </ul>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        className="mt-8 space-y-4"
      >
        <a
          href="https://wa.me/573203104943"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-primary"
        >
          <WhatsappIcon className="h-5 w-5" />
          <span>+57 320 310 4943</span>
        </a>
        <a
          href="https://wa.me/573102517667"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-primary"
        >
          <WhatsappIcon className="h-5 w-5" />
          <span>+57 310 251 7667</span>
        </a>
        <a
          href="https://instagram.com/weed_organic_colombia"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-primary"
        >
          <InstagramIcon className="h-5 w-5" />
          <span>@weed_organic_colombia</span>
        </a>
      </motion.div>
    </motion.div>
  )
}
