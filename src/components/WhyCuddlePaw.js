"use client"
import { motion } from "framer-motion"

const reasons = [
  {
    icon: "🩺",
    title: "Vet-Curated Products",
    description: "Every product is reviewed and approved by certified veterinarians before it reaches your pet.",
    color: "bg-sage/15"
  },
  {
    icon: "🌿",
    title: "Eco-Conscious Packaging",
    description: "Sustainable materials, minimal waste. Good for your pet and the planet they run around on.",
    color: "bg-butter/20"
  },
  {
    icon: "🐾",
    title: "Pet-Parent Community",
    description: "10,000+ families who believe their pets deserve the very best. Join them.",
    color: "bg-terracotta/12"
  }
]

export default function WhyCuddlePaw() {
  return (
    <section className="section-padding bg-terracotta/5 relative overflow-hidden">
      {/* Subtle floating glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/40 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-24">
          <h2 className="text-[42px] md:text-[52px] font-serif font-black text-espresso tracking-tight">
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
              className="flex flex-col items-center text-center space-y-8"
            >
              {/* Icon with soft circular background */}
              <div className={`w-[96px] h-[96px] ${reason.color} rounded-full flex items-center justify-center text-[42px] transition-transform duration-700 hover:rotate-[10deg] hover:scale-110 shadow-sm bg-white/50`}>
                {reason.icon}
              </div>
              
              <div className="space-y-4">
                <h3 className="text-[26px] font-serif font-bold text-espresso tracking-tight">{reason.title}</h3>
                <p className="text-[16px] text-espresso/70 leading-[1.8] font-jakarta max-w-[320px]">
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
