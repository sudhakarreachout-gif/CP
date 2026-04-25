"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Scissors, Stethoscope, Carrot, ArrowRight, Check, Plus, Minus, X, Send } from "lucide-react"
import Image from "next/image"

const services = [
  {
    id: "grooming",
    title: "Luxury Grooming",
    icon: <Scissors className="w-6 h-6" />,
    color: "#3B5E45", // Forest Green
    lightColor: "#E8F0EA",
    description: "Our spa-like grooming experience focuses on comfort and care. Using organic shampoos and gentle techniques, we leave your pet smelling and feeling like royalty.",
    longDescription: "Our grooming philosophy goes beyond just a haircut. We provide a sensory-friendly environment designed to reduce anxiety. Each session includes a deep-coat conditioning treatment, aromatherapy baths using pet-safe botanical oils, and a stress-free nail trimming process. Our master groomers are trained in breed-specific styles and skin health diagnostics.",
    features: ["Deep Coat Conditioning", "Stress-Free Nail Trimming", "Aromatherapy Baths", "Skin Health Audit", "Organic Breed Styling"],
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7"
  },
  {
    id: "vet",
    title: "Vet Consultation",
    icon: <Stethoscope className="w-6 h-6" />,
    color: "#C45E2A", // Terracotta
    lightColor: "#F5E6DA",
    description: "Professional medical advice delivered with empathy. Our certified vets offer comprehensive checkups and specialized care plans for pets of all ages.",
    longDescription: "We believe in proactive health management. Our veterinary team provides comprehensive digital checkups, behavior counseling, and preventative screening. We specialize in early detection of age-related issues and personalized vitality plans. Whether it's a routine check or a complex health concern, we guide you with science and heart.",
    features: ["Virtual Health Checks", "Nutrition Diagnostics", "Preventative Care Plans", "Behavior Counseling", "24/7 Digital Support"],
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee"
  },
  {
    id: "nutrition",
    title: "Nutrition Plans",
    icon: <Carrot className="w-6 h-6" />,
    color: "#8C7B6E", // Muted Taupe
    lightColor: "#F8F1E8",
    description: "We believe food is medicine. Our nutritionists create custom meal plans based on your pet's breed, activity level, and specific health requirements.",
    longDescription: "Optimal health starts in the bowl. Our certified pet nutritionists analyze your pet's specific requirements to craft seasonal meal plans. We focus on weight management, allergy diagnostics, and performance-based feeding. Using a science-backed approach, we help you choose the right balance of proteins, vitamins, and minerals for a long, vibrant life.",
    features: ["Breed-Specific Diets", "Weight Management", "Allergy-Friendly Options", "Metabolic Profiling", "Seasonal Diet Shifts"],
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a"
  }
]

function BookingForm({ service, onClose }) {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => onClose(), 2500)
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-text-heading/70 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-bg w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl relative border border-white/10"
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-text-heading/5 rounded-full z-10 transition-colors">
          <X className="w-6 h-6 text-text-heading" />
        </button>

        <div className="p-8 sm:p-12">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-20 h-20 bg-secondary-light text-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-serif text-text-heading">Talk Soon! 🐾</h3>
              <p className="text-text-muted font-sans font-medium">We've received your request. One of our care specialists will reach out shortly.</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em]" style={{ color: service.color }}>
                  Start a Conversation
                </span>
                <h3 className="text-3xl font-serif text-text-heading mt-2">Let's Talk About {service.title}</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-sans font-bold text-text-muted/60 ml-2 uppercase tracking-widest">YOUR NAME</label>
                  <input required type="text" className="w-full px-6 py-4 rounded-2xl bg-surface border border-border focus:border-primary outline-none font-sans text-text-body transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-sans font-bold text-text-muted/60 ml-2 uppercase tracking-widest">PET'S NAME & BREED</label>
                  <input required type="text" className="w-full px-6 py-4 rounded-2xl bg-surface border border-border focus:border-primary outline-none font-sans text-text-body transition-all" placeholder="Buddy, Golden Retriever" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-sans font-bold text-text-muted/60 ml-2 uppercase tracking-widest">EMAIL ADDRESS</label>
                  <input required type="email" className="w-full px-6 py-4 rounded-2xl bg-surface border border-border focus:border-primary outline-none font-sans text-text-body transition-all" placeholder="hello@cuddlepaw.com" />
                </div>
                <button 
                  type="submit"
                  style={{ backgroundColor: service.color }}
                  className="w-full py-5 rounded-[100px] text-white font-sans font-bold text-base shadow-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-6 uppercase tracking-[0.15em]"
                >
                  Send Request <Send className="w-5 h-5" />
                </button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ServicesTabs() {
  const [activeTab, setActiveTab] = useState("grooming")
  const [isExpanded, setIsExpanded] = useState(false)
  const [showBooking, setShowBooking] = useState(false)

  const currentService = services.find(s => s.id === activeTab)

  return (
    <section id="services" className="section-padding bg-surface border-t border-border/40">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="section-title">Care Beyond the Bowl</h2>
          <p className="section-subtitle">
            Expert services tailored to the unique personality and needs of your beloved companions.
          </p>
        </div>

        {/* Desktop Tabs */}
        <div className="hidden md:flex flex-wrap justify-center gap-5 mb-16">
          {services.map((s) => (
            <button
              key={s.id}
              onClick={() => { setActiveTab(s.id); setIsExpanded(false); }}
              style={{ 
                backgroundColor: activeTab === s.id ? s.color : 'transparent',
                borderColor: activeTab === s.id ? s.color : '#E8DDD2',
                color: activeTab === s.id ? '#FFFFFF' : ''
              }}
              className={`flex items-center gap-4 px-10 py-5 rounded-[100px] font-sans font-bold transition-all whitespace-nowrap border-[1.5px] clickable uppercase tracking-widest text-[11px] ${
                activeTab === s.id 
                ? "shadow-[0_12px_24px_rgba(196,94,42,0.15)] scale-105" 
                : "bg-bg text-text-muted hover:text-text-heading hover:border-primary/30"
              }`}
            >
              <span className={activeTab === s.id ? "text-white" : ""} style={{ color: activeTab === s.id ? "white" : s.color }}>{s.icon}</span>
              {s.title}
            </button>
          ))}
        </div>

        {/* Mobile Accordion / Desktop Content */}
        <div className="md:grid lg:grid-cols-2 gap-16 items-center bg-bg rounded-[40px] p-8 lg:p-20 border border-border shadow-[0_8px_40px_rgba(44,36,22,0.04)] overflow-hidden">
          {/* Mobile Accordion View */}
          <div className="md:hidden space-y-4">
            {services.map((s) => (
              <div key={s.id} className="border-b border-border/50 last:border-0 pb-5">
                <button 
                  onClick={() => setActiveTab(activeTab === s.id ? null : s.id)}
                  className="w-full flex items-center justify-between py-2 text-text-heading font-sans font-bold clickable transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span style={{ color: s.color }}>{s.icon}</span>
                    {s.title}
                  </div>
                  {activeTab === s.id ? <Minus className="w-5 h-5 text-primary" /> : <Plus className="w-5 h-5 text-text-muted" />}
                </button>
                <AnimatePresence>
                  {activeTab === s.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 space-y-8">
                        <p className="text-[15px] font-sans text-text-body leading-relaxed">
                          {s.description}
                        </p>
                        <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-inner">
                          <Image src={s.image} alt={s.title} fill unoptimized={true} className="object-cover" />
                        </div>
                        <button 
                          onClick={() => setShowBooking(true)}
                          style={{ backgroundColor: s.color }}
                          className="w-full py-5 rounded-[100px] text-white font-sans font-bold uppercase tracking-[0.2em] text-[11px] shadow-lg"
                        >
                          Send Request 🐾
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Desktop Content View */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="hidden md:block space-y-10"
            >
              <div 
                className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-sm border border-white/40"
                style={{ backgroundColor: currentService.lightColor, color: currentService.color }}
              >
                {currentService.icon}
              </div>
              <h3 className="text-[40px] font-serif font-bold text-text-heading leading-tight">{currentService.title}</h3>
              
              <div className="space-y-6">
                <p className="text-[18px] font-sans text-text-body leading-relaxed max-w-xl">
                  {currentService.description}
                </p>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.p 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="text-[16px] font-sans text-text-muted leading-relaxed italic border-l-[3px] pl-6 overflow-hidden"
                      style={{ borderColor: currentService.color }}
                    >
                      {currentService.longDescription}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-12 pt-4">
                {currentService.features.map(f => (
                  <li key={f} className="flex items-center gap-4 font-sans font-bold text-[12px] text-text-heading uppercase tracking-widest group/item">
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover/item:scale-110"
                      style={{ backgroundColor: currentService.lightColor, color: currentService.color }}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-8 pt-8">
                <button 
                  onClick={() => setShowBooking(true)}
                  style={{ backgroundColor: currentService.color }}
                  className="px-12 py-5 rounded-[100px] text-white font-sans font-bold text-base shadow-2xl hover:brightness-110 active:scale-95 transition-all flex items-center gap-4 uppercase tracking-[0.15em]"
                >
                  Send Request 🐾 <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-3 font-sans font-bold text-text-muted hover:text-text-heading group transition-colors px-6 uppercase tracking-[0.2em] text-[11px]"
                >
                  {isExpanded ? "Show Less" : "Learn More"} 
                  <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rotate-90" />
                  </motion.div>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + "-img"}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6 }}
              className="hidden md:block relative h-full min-h-[500px] rounded-[20px] overflow-hidden shadow-lg"
            >
              <Image 
                src={currentService.image} 
                alt={currentService.title} 
                fill
                unoptimized={true}
                className="object-cover rounded-[20px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-text-heading/40 to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {showBooking && (
          <BookingForm 
            service={currentService} 
            onClose={() => setShowBooking(false)} 
          />
        )}
      </AnimatePresence>
    </section>
  )
}
