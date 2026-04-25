"use client"
import { motion } from "framer-motion"

const reasons = [
  {
    icon: "🩺",
    title: "Vet-Curated Products",
    description: "Every product is reviewed and approved by certified veterinarians before it reaches your pet.",
    color: "bg-secondary-light/80"
  },
  {
    icon: "🌿",
    title: "Eco-Conscious Packaging",
    description: "Sustainable materials, minimal waste. Good for your pet and the planet they run around on.",
    color: "bg-primary-light/60"
  },
  {
    icon: "🐾",
    title: "Pet-Parent Community",
    description: "10,000+ families who believe their pets deserve the very best. Join them.",
    color: "bg-primary-light/40"
  }
]

export default function WhyCuddlePaw() {
  return (
    <section className="section-padding bg-bg relative overflow-hidden border-t border-border/50">
      {/* Subtle floating glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-light/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-24">
          <h2 className="section-title">
            The Cuddle Paw Promise
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-20 lg:gap-32">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex flex-col items-center text-center space-y-10"
            >
              {/* Icon with soft circular background */}
              <div className={`w-[112px] h-[112px] ${reason.color} rounded-full flex items-center justify-center text-[48px] transition-transform duration-1000 hover:rotate-[10deg] hover:scale-110 shadow-sm border border-white/40`}>
                {reason.icon}
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-serif font-bold text-text-heading tracking-tight">{reason.title}</h3>
                <p className="text-[16px] text-text-body leading-relaxed font-sans max-w-[320px]">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
