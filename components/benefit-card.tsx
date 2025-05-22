"use client"

import { motion } from "framer-motion"
import { Heart, Brain, Moon, Activity, Droplet, Zap } from "lucide-react"

interface BenefitCardProps {
  icon: string
  title: string
  description: string
  delay: number
}

export function BenefitCard({ icon, title, description, delay }: BenefitCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "pain-relief":
        return <Activity className="h-8 w-8 text-primary" />
      case "anti-stress":
        return <Heart className="h-8 w-8 text-primary" />
      case "sleep":
        return <Moon className="h-8 w-8 text-primary" />
      case "inflammation":
        return <Zap className="h-8 w-8 text-primary" />
      case "skin":
        return <Droplet className="h-8 w-8 text-primary" />
      case "neuro":
        return <Brain className="h-8 w-8 text-primary" />
      default:
        return <Activity className="h-8 w-8 text-primary" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-border"
    >
      <div className="bg-gradient-to-br from-primary/5 to-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-inner">
        {getIcon()}
      </div>
      <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  )
}
