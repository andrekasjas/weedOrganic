"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "es" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  es: {
    // Header
    "nav.products": "Productos",
    "nav.benefits": "Beneficios",
    "nav.contact": "Contacto",

    // Hero
    "hero.title": "Productos Naturales",
    "hero.subtitle": "a Base de Cannabis CBD",
    "hero.description": "Nos dedicamos al cuidado y bienestar de tu cuerpo con productos orgánicos de alta calidad",
    "hero.discover": "Descubre más",
    "hero.whatsapp1": "WhatsApp: +57 320 310 4943",
    "hero.whatsapp2": "WhatsApp: +57 310 251 7667",

    // Products
    "products.title": "Nuestros Productos",
    "products.description":
      "Descubre nuestra línea de productos orgánicos a base de CBD para el cuidado de tu cuerpo y bienestar",
    "products.oil.name": "Aceite CBD",
    "products.oil.description":
      "Gotas de Cannabidiol de uso sublingual o tópico, con 1,000 mg de CBD. Ideal para tratar dolores crónicos, ansiedad, depresión e insomnio.",
    "products.oil.benefit1": "Alivio del dolor",
    "products.oil.benefit2": "Reduce ansiedad",
    "products.oil.benefit3": "Mejora el sueño",
    "products.cream.name": "Crema Corporal CBD",
    "products.cream.description":
      "Crema con extracto de cannabis para hidratación y cuidado de la piel. Propiedades emolientes, astringentes y tonificantes que ayudan a nutrir la piel.",
    "products.cream.benefit1": "Hidratación profunda",
    "products.cream.benefit2": "Cuidado de la piel",
    "products.cream.benefit3": "Efecto calmante",
    "products.liniment.name": "Linimento CBD",
    "products.liniment.description":
      "Relajante muscular en gel con extracto de cannabis. Ideal para deportistas, disminuye el efecto de calambres y ayuda a restaurar el funcionamiento muscular.",
    "products.liniment.benefit1": "Relajante muscular",
    "products.liniment.benefit2": "Acción calmante",
    "products.liniment.benefit3": "Reduce inflamación",

    // Pain Relief Section
    "pain.title": "¿Dolor en Espalda, Cuello o Cintura?",
    "pain.description":
      "Nuestro Linimento CBD es tu mejor opción para aliviar dolores musculares y articulares de forma natural y efectiva.",
    "pain.benefit1": "Relajante muscular",
    "pain.benefit2": "Acción calmante para el dolor",
    "pain.benefit3": "Reduce la inflamación",
    "pain.cta": "Consultar ahora",

    // Benefits
    "benefits.title": "¿Qué es el CBD?",
    "benefits.description":
      "El CBD (cannabidiol) es un compuesto natural del cannabis que no causa efectos psicoactivos",
    "benefits.pain.title": "Alivio del Dolor",
    "benefits.pain.description": "Alivia dolores musculares, crónicos y articulares de forma natural y efectiva",
    "benefits.anxiety.title": "Reduce Ansiedad",
    "benefits.anxiety.description": "Ayuda a disminuir los niveles de estrés y ansiedad, mejorando tu bienestar mental",
    "benefits.sleep.title": "Mejora el Sueño",
    "benefits.sleep.description": "Contribuye a un descanso más profundo y reparador, mejorando la calidad del sueño",
    "benefits.inflammation.title": "Anti-inflamatorio",
    "benefits.inflammation.description": "Reduce la inflamación en articulaciones y músculos, ideal para deportistas",
    "benefits.skin.title": "Cuidado de la Piel",
    "benefits.skin.description":
      "Ayuda a tratar problemas como acné, eczema y psoriasis, mejorando la salud de la piel",
    "benefits.neuro.title": "Apoyo Neurológico",
    "benefits.neuro.description": "Beneficioso para personas con trastornos neurológicos como epilepsia o Parkinson",

    // Parallax
    "parallax.title": "¿Sabías que?",
    "parallax.text":
      "El cannabis se ha utilizado desde hace miles de años en Asia y el Medio Oriente por sus propiedades medicinales, rituales y textiles. Civilizaciones antiguas como la china y la india ya lo usaban.",

    // Skin Care
    "skincare.title": "Hidratación y Cuidado de la Piel",
    "skincare.description":
      "Nuestra Crema Corporal CBD proporciona hidratación profunda y cuidado integral para tu piel, con propiedades emolientes y tonificantes.",
    "skincare.cta": "Consultar ahora",

    // Contact
    "contact.title": "Contáctanos",
    "contact.description": "Estamos ubicados en Pamplona, Norte de Santander, Colombia",
    "contact.write": "Escríbenos",
    "contact.team":
      "Nuestro equipo está listo para responder tus preguntas y ayudarte a encontrar el producto ideal para ti.",
    "contact.qr": "Escanea nuestro código QR de Instagram",

    // CTA
    "cta.title": "¿Listo para mejorar tu bienestar?",
    "cta.description": "Nuestros productos de CBD orgánico están diseñados para ayudarte a sentirte mejor naturalmente",
    "cta.button": "Contáctanos ahora",

    // Footer
    "footer.description": "Productos a base de cannabis CBD para el cuidado y bienestar de tu cuerpo.",
    "footer.links": "Enlaces rápidos",
    "footer.contact": "Contacto",
    "footer.rights": "Todos los derechos reservados.",
  },
  en: {
    // Header
    "nav.products": "Products",
    "nav.benefits": "Benefits",
    "nav.contact": "Contact",

    // Hero
    "hero.title": "Natural Products",
    "hero.subtitle": "Based on Cannabis CBD",
    "hero.description": "We are dedicated to the care and well-being of your body with high-quality organic products",
    "hero.discover": "Discover more",
    "hero.whatsapp1": "WhatsApp: +57 320 310 4943",
    "hero.whatsapp2": "WhatsApp: +57 310 251 7667",

    // Products
    "products.title": "Our Products",
    "products.description": "Discover our line of organic CBD-based products for body care and wellness",
    "products.oil.name": "CBD Oil",
    "products.oil.description":
      "Cannabidiol drops for sublingual or topical use, with 1,000 mg of CBD. Ideal for treating chronic pain, anxiety, depression and insomnia.",
    "products.oil.benefit1": "Pain relief",
    "products.oil.benefit2": "Reduces anxiety",
    "products.oil.benefit3": "Improves sleep",
    "products.cream.name": "CBD Body Cream",
    "products.cream.description":
      "Cream with cannabis extract for hydration and skin care. Emollient, astringent and toning properties that help nourish the skin.",
    "products.cream.benefit1": "Deep hydration",
    "products.cream.benefit2": "Skin care",
    "products.cream.benefit3": "Soothing effect",
    "products.liniment.name": "CBD Liniment",
    "products.liniment.description":
      "Muscle relaxant gel with cannabis extract. Ideal for athletes, reduces cramping effects and helps restore muscle function.",
    "products.liniment.benefit1": "Muscle relaxant",
    "products.liniment.benefit2": "Soothing action",
    "products.liniment.benefit3": "Reduces inflammation",

    // Pain Relief Section
    "pain.title": "Back, Neck or Waist Pain?",
    "pain.description":
      "Our CBD Liniment is your best option to relieve muscle and joint pain naturally and effectively.",
    "pain.benefit1": "Muscle relaxant",
    "pain.benefit2": "Soothing action for pain",
    "pain.benefit3": "Reduces inflammation",
    "pain.cta": "Consult now",

    // Benefits
    "benefits.title": "What is CBD?",
    "benefits.description": "CBD (cannabidiol) is a natural cannabis compound that does not cause psychoactive effects",
    "benefits.pain.title": "Pain Relief",
    "benefits.pain.description": "Relieves muscle, chronic and joint pain naturally and effectively",
    "benefits.anxiety.title": "Reduces Anxiety",
    "benefits.anxiety.description": "Helps reduce stress and anxiety levels, improving your mental well-being",
    "benefits.sleep.title": "Improves Sleep",
    "benefits.sleep.description": "Contributes to deeper and more restorative rest, improving sleep quality",
    "benefits.inflammation.title": "Anti-inflammatory",
    "benefits.inflammation.description": "Reduces inflammation in joints and muscles, ideal for athletes",
    "benefits.skin.title": "Skin Care",
    "benefits.skin.description": "Helps treat problems like acne, eczema and psoriasis, improving skin health",
    "benefits.neuro.title": "Neurological Support",
    "benefits.neuro.description": "Beneficial for people with neurological disorders such as epilepsy or Parkinson's",

    // Parallax
    "parallax.title": "Did you know?",
    "parallax.text":
      "Cannabis has been used for thousands of years in Asia and the Middle East for its medicinal, ritual and textile properties. Ancient civilizations like the Chinese and Indian already used it.",

    // Skin Care
    "skincare.title": "Hydration and Skin Care",
    "skincare.description":
      "Our CBD Body Cream provides deep hydration and comprehensive care for your skin, with emollient and toning properties.",
    "skincare.cta": "Consult now",

    // Contact
    "contact.title": "Contact Us",
    "contact.description": "We are located in Pamplona, Norte de Santander, Colombia",
    "contact.write": "Write to us",
    "contact.team": "Our team is ready to answer your questions and help you find the ideal product for you.",
    "contact.qr": "Scan our Instagram QR code",

    // CTA
    "cta.title": "Ready to improve your well-being?",
    "cta.description": "Our organic CBD products are designed to help you feel better naturally",
    "cta.button": "Contact us now",

    // Footer
    "footer.description": "Cannabis CBD-based products for the care and well-being of your body.",
    "footer.links": "Quick links",
    "footer.contact": "Contact",
    "footer.rights": "All rights reserved.",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("weed-organic-language") as Language
    if (savedLanguage && (savedLanguage === "es" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("weed-organic-language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
