"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Check } from "lucide-react"

interface ProductCardProps {
  name: string
  description: string
  image: string
  benefits: string[]
  index: number
}

export function ProductCard({ name, description, image, benefits, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="p-6 flex flex-col h-full">
        <div className="mb-6 flex justify-center">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={200}
            height={300}
            className="h-64 object-contain"
          />
        </div>
        <h3 className="text-2xl font-bold text-green-800 mb-3">{name}</h3>
        <p className="text-gray-600 mb-6 flex-grow">{description}</p>
        <div className="space-y-2">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="bg-green-100 rounded-full p-1">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-gray-700">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
