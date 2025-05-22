"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { WhatsappIcon } from "@/components/whatsapp-icon"
import { InstagramIcon, ChevronDown, ArrowRight, Menu, X } from "lucide-react"
import { BenefitCard } from "@/components/benefit-card"
import { ContactButton } from "@/components/contact-button"
import { ParallaxSection } from "@/components/parallax-section"
import { ProductShowcase } from "@/components/product-showcase"
import { MobileMenu } from "@/components/mobile-menu"
import { ScrollIndicator } from "@/components/scroll-indicator"
import { HeroParallax } from "@/components/hero-parallax"
import { FloatingElements } from "@/components/floating-elements"
import { useMobile } from "@/hooks/use-mobile"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const products = [
    {
      id: 1,
      name: "Aceite CBD",
      description:
        "Gotas de Cannabidiol de uso sublingual o tópico, con 1,000 mg de CBD. Ideal para tratar dolores crónicos, ansiedad, depresión e insomnio.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8-si7QqBUrZCjFSPOcfm9QYdL1M7Bphs.jpeg",
      benefits: ["Alivio del dolor", "Reduce ansiedad", "Mejora el sueño"],
      color: "from-green-500/20 to-purple-500/20 dark:from-green-500/10 dark:to-purple-500/10",
    },
    {
      id: 2,
      name: "Crema Corporal CBD",
      description:
        "Crema con extracto de cannabis para hidratación y cuidado de la piel. Propiedades emolientes, astringentes y tonificantes que ayudan a nutrir la piel.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/11-0CAgn5wnQMjBiBr2FWsVftsYM13pBV.jpeg",
      benefits: ["Hidratación profunda", "Cuidado de la piel", "Efecto calmante"],
      color: "from-blue-500/20 to-green-500/20 dark:from-blue-500/10 dark:to-green-500/10",
    },
    {
      id: 3,
      name: "Linimento CBD",
      description:
        "Relajante muscular en gel con extracto de cannabis. Ideal para deportistas, disminuye el efecto de calambres y ayuda a restaurar el funcionamiento muscular.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12-ZSixHYtgPfvGqrYtAkE7eZgPetuZIq.jpeg",
      benefits: ["Relajante muscular", "Acción calmante", "Reduce inflamación"],
      color: "from-purple-500/20 to-green-500/20 dark:from-purple-500/10 dark:to-green-500/10",
    },
  ]

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden transition-colors duration-300">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/80 dark:bg-background/90 backdrop-blur-lg shadow-sm dark:shadow-none dark:border-b dark:border-border py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-DREZ0opxMhhj4teiWpPvFKVxUyW0iC.png"
              alt="Weed Organic Logo"
              width={180}
              height={80}
              className="h-12 w-auto"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex items-center gap-8"
          >
            <NavLink href="#productos" label="Productos" />
            <NavLink href="#beneficios" label="Beneficios" />
            <NavLink href="#contacto" label="Contacto" />
            <a
              href="https://instagram.com/weed_organic_colombia"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <InstagramIcon className="h-5 w-5" />
              <span>@weed_organic_colombia</span>
            </a>
            <ThemeToggle />
          </motion.div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              onClick={toggleMobileMenu}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>{mobileMenuOpen && <MobileMenu onClose={toggleMobileMenu} />}</AnimatePresence>

      {/* Scroll Indicator */}
      <ScrollIndicator />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroParallax />

        <motion.div style={{ opacity, scale, y }} className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-primary mb-6 tracking-tight"
          >
            Productos Naturales
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-purple-600 dark:from-green-500 dark:to-purple-500">
              a Base de Cannabis CBD
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12"
          >
            Nos dedicamos al cuidado y bienestar de tu cuerpo con productos orgánicos de alta calidad
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col md:flex-row justify-center gap-4 mb-12"
          >
            <ContactButton
              href="https://wa.me/573203104943"
              icon={<WhatsappIcon className="h-5 w-5" />}
              text="WhatsApp: +57 320 310 4943"
            />
            <ContactButton
              href="https://wa.me/573102517667"
              icon={<WhatsappIcon className="h-5 w-5" />}
              text="WhatsApp: +57 310 251 7667"
            />
          </motion.div>
        </motion.div>

        <FloatingElements />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        >
          <a href="#productos" className="flex flex-col items-center">
            <span className="text-primary mb-2">Descubre más</span>
            <ChevronDown className="h-6 w-6 text-primary animate-bounce" />
          </a>
        </motion.div>
      </section>

      {/* Products Showcase */}
      <section id="productos" className="py-20 md:py-32 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background to-transparent z-10"></div>
        <div className="container mx-auto px-4 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">Nuestros Productos</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Descubre nuestra línea de productos orgánicos a base de CBD para el cuidado de tu cuerpo y bienestar
            </p>
          </motion.div>

          <div className="space-y-32 md:space-y-48">
            {products.map((product, index) => (
              <ProductShowcase key={product.id} product={product} reverse={index % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Pain Relief Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background to-accent/20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">¿Dolor en Espalda, Cuello o Cintura?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Nuestro Linimento CBD es tu mejor opción para aliviar dolores musculares y articulares de forma natural
                y efectiva.
              </p>
              <div className="space-y-4">
                {["Relajante muscular", "Acción calmante para el dolor", "Reduce la inflamación"].map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="bg-primary/10 rounded-full p-1.5">
                      <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-lg text-foreground">{benefit}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <a
                  href="https://wa.me/573203104943?text=Hola,%20me%20interesa%20el%20Linimento%20CBD%20para%20el%20dolor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full transition-colors shadow-lg"
                >
                  Consultar ahora
                  <ArrowRight className="h-5 w-5" />
                </a>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-600/30 to-purple-600/30 dark:from-green-500/20 dark:to-purple-500/20 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-1000"></div>
                <div className="relative bg-card rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12-ZSixHYtgPfvGqrYtAkE7eZgPetuZIq.jpeg"
                    alt="Linimento CBD para dolor"
                    width={600}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-full h-40 bg-gradient-to-t from-accent/20 to-transparent"></div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-20 md:py-32 bg-accent/20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">¿Qué es el CBD?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              El CBD (cannabidiol) es un compuesto natural del cannabis que no causa efectos psicoactivos
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BenefitCard
              icon="pain-relief"
              title="Alivio del Dolor"
              description="Alivia dolores musculares, crónicos y articulares de forma natural y efectiva"
              delay={0.1}
            />
            <BenefitCard
              icon="anti-stress"
              title="Reduce Ansiedad"
              description="Ayuda a disminuir los niveles de estrés y ansiedad, mejorando tu bienestar mental"
              delay={0.3}
            />
            <BenefitCard
              icon="sleep"
              title="Mejora el Sueño"
              description="Contribuye a un descanso más profundo y reparador, mejorando la calidad del sueño"
              delay={0.5}
            />
            <BenefitCard
              icon="inflammation"
              title="Anti-inflamatorio"
              description="Reduce la inflamación en articulaciones y músculos, ideal para deportistas"
              delay={0.7}
            />
            <BenefitCard
              icon="skin"
              title="Cuidado de la Piel"
              description="Ayuda a tratar problemas como acné, eczema y psoriasis, mejorando la salud de la piel"
              delay={0.9}
            />
            <BenefitCard
              icon="neuro"
              title="Apoyo Neurológico"
              description="Beneficioso para personas con trastornos neurológicos como epilepsia o Parkinson"
              delay={1.1}
            />
          </div>
        </div>

        <div className="absolute top-0 left-0 w-64 h-64 bg-green-200 dark:bg-green-900/30 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-200 dark:bg-purple-900/30 rounded-full filter blur-3xl opacity-20 translate-x-1/3 translate-y-1/3"></div>
      </section>

      {/* Parallax Section */}
      <ParallaxSection
        imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-wzM9blRqlq57IlRYcfzCuVIrbrfdNL.jpeg"
        title="¿Sabías que?"
        text="El cannabis se ha utilizado desde hace miles de años en Asia y el Medio Oriente por sus propiedades medicinales, rituales y textiles. Civilizaciones antiguas como la china y la india ya lo usaban."
      />

      {/* Skin Care Section */}
      <section className="py-20 md:py-32 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex justify-center md:order-1"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-green-500/30 dark:from-blue-500/20 dark:to-green-500/20 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-1000"></div>
                <div className="relative bg-card rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/11-0CAgn5wnQMjBiBr2FWsVftsYM13pBV.jpeg"
                    alt="Crema Corporal CBD"
                    width={600}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="md:order-2"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">Hidratación y Cuidado de la Piel</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Nuestra Crema Corporal CBD proporciona hidratación profunda y cuidado integral para tu piel, con
                propiedades emolientes y tonificantes.
              </p>
              <div className="space-y-4">
                {["Hidratación profunda", "Cuidado de la piel", "Efecto calmante"].map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="bg-primary/10 rounded-full p-1.5">
                      <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-lg text-foreground">{benefit}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <a
                  href="https://wa.me/573203104943?text=Hola,%20me%20interesa%20la%20Crema%20Corporal%20CBD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full transition-colors shadow-lg"
                >
                  Consultar ahora
                  <ArrowRight className="h-5 w-5" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 w-full h-full max-w-6xl -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-green-100/30 to-blue-100/30 dark:from-green-900/10 dark:to-blue-900/10 rounded-full filter blur-3xl opacity-30"></div>
      </section>

      {/* Contact Section */}
      <section
        id="contacto"
        className="py-20 md:py-32 bg-gradient-to-b from-background to-accent/20 relative overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">Contáctanos</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Estamos ubicados en Pamplona, Norte de Santander, Colombia
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-card/80 dark:bg-card/50 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-border"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 md:p-12">
                  <h3 className="text-2xl font-bold text-primary mb-4">Escríbenos</h3>
                  <p className="text-muted-foreground mb-6">
                    Nuestro equipo está listo para responder tus preguntas y ayudarte a encontrar el producto ideal para
                    ti.
                  </p>
                  <div className="space-y-4">
                    <a
                      href="https://wa.me/573203104943"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-primary hover:text-primary/80 transition-colors"
                    >
                      <WhatsappIcon className="h-5 w-5" />
                      <span>+57 320 310 4943</span>
                    </a>
                    <a
                      href="https://wa.me/573102517667"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-primary hover:text-primary/80 transition-colors"
                    >
                      <WhatsappIcon className="h-5 w-5" />
                      <span>+57 310 251 7667</span>
                    </a>
                    <a
                      href="https://instagram.com/weed_organic_colombia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-primary hover:text-primary/80 transition-colors"
                    >
                      <InstagramIcon className="h-5 w-5" />
                      <span>@weed_organic_colombia</span>
                    </a>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-8 md:p-12 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-primary font-medium mb-4">Escanea nuestro código QR de Instagram</p>
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-green-400/50 to-green-600/50 dark:from-green-400/30 dark:to-green-600/30 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10-AvqMd9npMMx4WHkBVf59SYwa6KGjIq.jpeg"
                        alt="Instagram QR Code"
                        width={200}
                        height={200}
                        className="relative rounded-lg shadow-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-200 dark:bg-green-900/30 rounded-full filter blur-3xl opacity-20 translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-purple-200 dark:bg-purple-900/30 rounded-full filter blur-3xl opacity-20 -translate-x-1/3"></div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-primary to-primary-foreground/20 dark:from-primary/80 dark:to-primary-foreground/10 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-DREZ0opxMhhj4teiWpPvFKVxUyW0iC.png')] bg-center bg-no-repeat opacity-5 bg-contain"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">¿Listo para mejorar tu bienestar?</h2>
            <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto mb-10">
              Nuestros productos de CBD orgánico están diseñados para ayudarte a sentirte mejor naturalmente
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/573203104943"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-background text-primary px-8 py-4 rounded-full text-lg font-medium hover:bg-background/90 transition-colors shadow-lg"
            >
              Contáctanos ahora
              <ArrowRight className="h-5 w-5" />
            </motion.a>
          </motion.div>
        </div>

        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-accent/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 dark:bg-muted/10 text-foreground py-12 md:py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-DREZ0opxMhhj4teiWpPvFKVxUyW0iC.png')] bg-center bg-no-repeat opacity-5 bg-contain"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-DREZ0opxMhhj4teiWpPvFKVxUyW0iC.png"
                alt="Weed Organic Logo"
                width={180}
                height={80}
                className="h-12 w-auto mb-4"
              />
              <p className="text-muted-foreground">
                Productos a base de cannabis CBD para el cuidado y bienestar de tu cuerpo.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Enlaces rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#productos" className="text-muted-foreground hover:text-foreground transition-colors">
                    Productos
                  </a>
                </li>
                <li>
                  <a href="#beneficios" className="text-muted-foreground hover:text-foreground transition-colors">
                    Beneficios
                  </a>
                </li>
                <li>
                  <a href="#contacto" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contacto</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <WhatsappIcon className="h-5 w-5" />
                  <span>+57 320 310 4943</span>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <WhatsappIcon className="h-5 w-5" />
                  <span>+57 310 251 7667</span>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <InstagramIcon className="h-5 w-5" />
                  <span>@weed_organic_colombia</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} Weed Organic. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="relative text-foreground hover:text-primary transition-colors py-2 group">
      {label}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
    </a>
  )
}
