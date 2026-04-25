"use client"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight, Check } from "lucide-react"
import Image from "next/image"

const categoryData = {
  Dogs: {
    title: "The Ultimate Dog Care Guide",
    description: "Your canine companion deserves the best. From high-energy play to calming nutrition, discover how to support their unique journey.",
    careTips: ["Daily exercise for mental stimulation", "High-protein diets for muscle health", "Regular dental checks for longevity"],
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee",
    color: "bg-primary-light/40",
    accent: "text-primary",
    buttonBg: "btn-primary",
    dotBg: "bg-primary",
    products: [1, 4]
  },
  Cats: {
    title: "Nurturing Your Feline Friend",
    description: "Cats are masters of subtlety. Learn how to create a stimulating environment that respects their independence while keeping them healthy.",
    careTips: ["Vertical space for exploration", "Hydration-focused nutrition", "Interactive play to mimic hunting"],
    image: "https://images.unsplash.com/photo-1548546738-8509cb246ed3",
    color: "bg-secondary-light/60",
    accent: "text-secondary",
    buttonBg: "btn-primary bg-secondary hover:bg-secondary/90",
    dotBg: "bg-secondary",
    products: [2, 6]
  },
  Grooming: {
    title: "The Art of Pet Pampering",
    description: "Grooming is more than just looks—it's health. Discover the tools and techniques to keep their coat shiny and skin irritant-free.",
    careTips: ["Brushing to reduce shedding", "Sensitive-skin friendly soaps", "Paw pad and ear care"],
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7",
    color: "bg-primary-light/30",
    accent: "text-text-heading",
    buttonBg: "btn-primary",
    dotBg: "bg-primary",
    products: [4, 11]
  },
  "Eco Product": {
    title: "Sustainability for Paws",
    description: "Choose products that are kind to your pet and the planet. Our eco-collection focuses on biodegradable materials and organic ingredients.",
    careTips: ["Biodegradable waste bags", "Hemp and bamboo accessories", "Locally sourced organic treats"],
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1",
    color: "bg-secondary-light/50",
    accent: "text-secondary",
    buttonBg: "btn-primary bg-secondary hover:bg-secondary/90",
    dotBg: "bg-secondary",
    products: [1, 11]
  }
}

export default function CategoryShowcase({ category, onClose }) {
  const data = categoryData[category]
  if (!data) return null

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="overflow-hidden bg-surface relative z-30 border-b border-border"
    >
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <span className={`font-sans font-bold uppercase tracking-[0.2em] text-[10px] lg:text-xs ${data.accent}`}>
                Care & Community
              </span>
              <button onClick={onClose} className="p-2 hover:bg-primary/5 rounded-full transition-colors clickable">
                <X className="w-6 h-6 text-text-heading" />
              </button>
            </div>
            
            <h2 className="text-3xl lg:text-[48px] font-serif font-bold text-text-heading leading-tight">{data.title}</h2>
            <p className="text-base lg:text-lg font-sans text-text-body leading-relaxed max-w-xl">
              {data.description}
            </p>
            
            <div className="grid sm:grid-cols-2 gap-8 pt-4">
              <div className="space-y-4">
                <h4 className="font-sans font-bold text-[10px] uppercase tracking-widest text-text-muted/60 flex items-center gap-2">
                  ✨ Pro Care Tips
                </h4>
                <ul className="space-y-4">
                  {data.careTips.map((tip, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-sans font-medium text-text-heading">
                      <div className={`w-5 h-5 ${data.color} ${data.accent} rounded-full flex items-center justify-center shrink-0`}>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-end">
                <button className={`${data.buttonBg} w-full flex items-center justify-center gap-2 group clickable text-xs uppercase tracking-[0.15em]`}>
                  Shop {category} <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          <div className={`relative h-[300px] lg:h-[500px] rounded-[32px] overflow-hidden ${data.color} shadow-inner`}>
            <Image 
              src={data.image} 
              alt={category} 
              fill 
              unoptimized={true}
              className="object-cover mix-blend-multiply opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
