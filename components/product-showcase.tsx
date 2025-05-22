"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Check } from "lucide-react"

interface Product {
  id: number
  name: string
  description: string
  image: string
  benefits: string[]
  color: string
}

interface ProductShowcaseProps {
  product: Product
  reverse?: boolean
}

export function ProductShowcase({ product, reverse = false }: ProductShowcaseProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100])
  const contentY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <div ref={ref} className="relative">
      <div className={`absolute inset-0 bg-gradient-to-r ${product.color} rounded-3xl opacity-30 blur-3xl -z-10`}></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative">
        <motion.div style={{ y: contentY, opacity }} className={reverse ? "md:order-2" : ""}>
          <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">{product.name}</h3>
          <p className="text-xl text-muted-foreground mb-8">{product.description}</p>
          <div className="space-y-4">
            {product.benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: reverse ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <div className="bg-primary/10 rounded-full p-1.5">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <span className="text-lg text-foreground">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div style={{ y: imageY, opacity }} className={`flex justify-center ${reverse ? "md:order-1" : ""}`}>
          <div className="relative group">
            <div
              className={`absolute -inset-1 bg-gradient-to-r ${product.color} rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-1000`}
            ></div>
            <div className="relative bg-card rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-shadow duration-500">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-auto"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
