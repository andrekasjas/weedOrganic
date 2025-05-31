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
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/contexts/language-context"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()
  const { t } = useLanguage()

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
      name: t("products.oil.name"),
      description: t("products.oil.description"),
      image: "8.jpeg",
      benefits: [t("products.oil.benefit1"), t("products.oil.benefit2"), t("products.oil.benefit3")],
      color: "from-green-500/20 to-purple-500/20 dark:from-green-500/10 dark:to-purple-500/10",
    },
    {
      id: 2,
      name: t("products.cream.name"),
      description: t("products.cream.description"),
      image: "11.jpeg",
      benefits: [t("products.cream.benefit1"), t("products.cream.benefit2"), t("products.cream.benefit3")],
      color: "from-blue-500/20 to-green-500/20 dark:from-blue-500/10 dark:to-green-500/10",
    },
    {
      id: 3,
      name: t("products.liniment.name"),
      description: t("products.liniment.description"),
      image: "12.jpeg",
      benefits: [t("products.liniment.benefit1"), t("products.liniment.benefit2"), t("products.liniment.benefit3")],
      color: "from-purple-500/20 to-green-500/20 dark:from-purple-500/10 dark:to-green-500/10",
    },
  ]

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden transition-colors duration-500">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? "bg-background/80 dark:bg-background/90 backdrop-blur-lg shadow-sm dark:shadow-none dark:border-b dark:border-border py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center"
          >
            <Image src="3.png" alt="Weed Organic Logo" width={180} height={80} className="h-12 w-auto" />
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="hidden md:flex items-center gap-8"
          >
            <NavLink href="#productos" label={t("nav.products")} />
            <NavLink href="#beneficios" label={t("nav.benefits")} />
            <NavLink href="#contacto" label={t("nav.contact")} />
            <a
              href="https://instagram.com/weed_organic_colombia"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-300"
            >
              <InstagramIcon className="h-5 w-5" />
              <span>@weed_organic_colombia</span>
            </a>
            <LanguageToggle />
            <ThemeToggle />
          </motion.div>

          {/* Mobile Menu Button and Toggles */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageToggle />
            <ThemeToggle />
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold text-primary mb-6 tracking-tight"
          >
            {t("hero.title")}
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-purple-600 dark:from-green-500 dark:to-purple-500">
              {t("hero.subtitle")}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12"
          >
            {t("hero.description")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
            className="flex flex-col md:flex-row justify-center gap-4 mb-12"
          >
            <ContactButton
              href="https://wa.me/573203104943"
              icon={<WhatsappIcon className="h-5 w-5" />}
              text={t("hero.whatsapp1")}
            />
            <ContactButton
              href="https://wa.me/573102517667"
              icon={<WhatsappIcon className="h-5 w-5" />}
              text={t("hero.whatsapp2")}
            />
          </motion.div>
        </motion.div>

        <FloatingElements />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.3, ease: "easeOut" }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        >
          <a href="#productos" className="flex flex-col items-center">
            <span className="text-primary mb-2">{t("hero.discover")}</span>
            <ChevronDown className="h-6 w-6 text-primary animate-bounce" />
          </a>
        </motion.div>
      </section>

      {/* Products Showcase */}
      <section id="productos" className="py-20 md:py-32 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background to-transparent z-10"></div>
        <div className="container mx-auto px-4 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">{t("products.title")}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("products.description")}</p>
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
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">{t("pain.title")}</h2>
              <p className="text-xl text-muted-foreground mb-8">{t("pain.description")}</p>
              <div className="space-y-4">
                {[t("pain.benefit1"), t("pain.benefit2"), t("pain.benefit3")].map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
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
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <a
                  href="https://wa.me/573203104943?text=Hola,%20me%20interesa%20el%20Linimento%20CBD%20para%20el%20dolor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {t("pain.cta")}
                  <ArrowRight className="h-5 w-5" />
                </a>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-600/30 to-purple-600/30 dark:from-green-500/20 dark:to-purple-500/20 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-1000"></div>
                <div className="relative bg-card rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="12.jpeg"
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
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-t from-accent/20 to-transparent"></div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-20 md:py-32 bg-accent/20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">{t("benefits.title")}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("benefits.description")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BenefitCard
              icon="pain-relief"
              title={t("benefits.pain.title")}
              description={t("benefits.pain.description")}
              delay={0.2}
            />
            <BenefitCard
              icon="anti-stress"
              title={t("benefits.anxiety.title")}
              description={t("benefits.anxiety.description")}
              delay={0.4}
            />
            <BenefitCard
              icon="sleep"
              title={t("benefits.sleep.title")}
              description={t("benefits.sleep.description")}
              delay={0.6}
            />
            <BenefitCard
              icon="inflammation"
              title={t("benefits.inflammation.title")}
              description={t("benefits.inflammation.description")}
              delay={0.8}
            />
            <BenefitCard
              icon="skin"
              title={t("benefits.skin.title")}
              description={t("benefits.skin.description")}
              delay={1}
            />
            <BenefitCard
              icon="neuro"
              title={t("benefits.neuro.title")}
              description={t("benefits.neuro.description")}
              delay={1.2}
            />
          </div>
        </div>

        <div className="absolute top-0 left-0 w-64 h-64 bg-green-200 dark:bg-green-900/30 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-200 dark:bg-purple-900/30 rounded-full filter blur-3xl opacity-20 translate-x-1/3 translate-y-1/3"></div>
      </section>

      {/* Parallax Section */}
      <ParallaxSection imageUrl="5.jpeg" title={t("parallax.title")} text={t("parallax.text")} />

      {/* Skin Care Section */}
      <section className="py-20 md:py-32 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex justify-center md:order-1"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-green-500/30 dark:from-blue-500/20 dark:to-green-500/20 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-1000"></div>
                <div className="relative bg-card rounded-2xl overflow-hidden shadow-xl">
                  <Image src="11.jpeg" alt="Crema Corporal CBD" width={600} height={600} className="w-full h-auto" />
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="md:order-2"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">{t("skincare.title")}</h2>
              <p className="text-xl text-muted-foreground mb-8">{t("skincare.description")}</p>
              <div className="space-y-4">
                {[t("products.cream.benefit1"), t("products.cream.benefit2"), t("products.cream.benefit3")].map(
                  (benefit, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
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
                  ),
                )}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <a
                  href="https://wa.me/573203104943?text=Hola,%20me%20interesa%20la%20Crema%20Corporal%20CBD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {t("skincare.cta")}
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">{t("contact.title")}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("contact.description")}</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-card/80 dark:bg-card/50 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-border"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 md:p-12">
                  <h3 className="text-2xl font-bold text-primary mb-4">{t("contact.write")}</h3>
                  <p className="text-muted-foreground mb-6">{t("contact.team")}</p>
                  <div className="space-y-4">
                    <a
                      href="https://wa.me/573203104943"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-primary hover:text-primary/80 transition-colors duration-300"
                    >
                      <WhatsappIcon className="h-5 w-5" />
                      <span>+57 320 310 4943</span>
                    </a>
                    <a
                      href="https://wa.me/573102517667"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-primary hover:text-primary/80 transition-colors duration-300"
                    >
                      <WhatsappIcon className="h-5 w-5" />
                      <span>+57 310 251 7667</span>
                    </a>
                    <a
                      href="https://instagram.com/weed_organic_colombia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-primary hover:text-primary/80 transition-colors duration-300"
                    >
                      <InstagramIcon className="h-5 w-5" />
                      <span>@weed_organic_colombia</span>
                    </a>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-8 md:p-12 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-primary font-medium mb-4">{t("contact.qr")}</p>
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-green-400/50 to-green-600/50 dark:from-green-400/30 dark:to-green-600/30 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                      <Image
                        src="10.jpeg"
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
        <div className="absolute inset-0 bg-[url('/3.png')] bg-center bg-no-repeat opacity-5 bg-contain"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">{t("cta.title")}</h2>
            <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto mb-10">{t("cta.description")}</p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              href="https://wa.me/573203104943"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-background text-primary px-8 py-4 rounded-full text-lg font-medium hover:bg-background/90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {t("cta.button")}
              <ArrowRight className="h-5 w-5" />
            </motion.a>
          </motion.div>
        </div>

        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-accent/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 dark:bg-muted/10 text-foreground py-12 md:py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/3.png')] bg-center bg-no-repeat opacity-5 bg-contain"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <Image src="3.png" alt="Weed Organic Logo" width={180} height={80} className="h-12 w-auto mb-4" />
              <p className="text-muted-foreground">{t("footer.description")}</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">{t("footer.links")}</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#productos"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {t("nav.products")}
                  </a>
                </li>
                <li>
                  <a
                    href="#beneficios"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {t("nav.benefits")}
                  </a>
                </li>
                <li>
                  <a
                    href="#contacto"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {t("nav.contact")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">{t("footer.contact")}</h3>
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
            <p>
              © {new Date().getFullYear()} Weed Organic. {t("footer.rights")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="relative text-foreground hover:text-primary transition-colors duration-300 py-2 group">
      {label}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-500 group-hover:w-full"></span>
    </a>
  )
}
