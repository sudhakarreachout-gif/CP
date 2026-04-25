"use client"
import { motion, AnimatePresence } from "framer-motion"
import CategoryShowcase from "./CategoryShowcase"

const categories = [
  { name: "Dogs", icon: "🐶" },
  { name: "Cats", icon: "🐱" },
  { name: "Grooming", icon: "✂️" },
  { name: "Eco Product", icon: "🌿" },
]

export default function CategoryScroll({ activeCategory, onSelect }) {
  return (
    <>
      <section className="sticky top-16 z-50 bg-bg py-3 border-b border-border">
        <div className="container mx-auto px-4 py-3 overflow-x-auto hide-scrollbar">
          <div className="flex md:justify-center gap-3 min-w-max">
            {categories.map((cat, i) => (
              <motion.button
                key={cat.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => onSelect(activeCategory === cat.name ? null : cat.name)}
                className={`flex items-center gap-3 px-6 py-2.5 rounded-full border-[1.5px] font-sans font-bold text-[13px] transition-all clickable whitespace-nowrap uppercase tracking-wider ${
                  activeCategory === cat.name 
                  ? "bg-text-heading text-white border-text-heading shadow-[0_8px_20px_rgba(28,20,16,0.15)]" 
                  : "bg-surface border-border text-text-heading hover:border-primary hover:text-primary"
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                <span>{cat.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeCategory && (
          <CategoryShowcase 
            category={activeCategory} 
            onClose={() => onSelect(null)} 
          />
        )}
      </AnimatePresence>
    </>
  )
}
