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
                className={`flex items-center gap-2 px-5 py-2 rounded-full border-[1.5px] font-nunito font-bold text-sm transition-all clickable whitespace-nowrap ${
                  activeCategory === cat.name 
                  ? "bg-espresso text-white border-espresso shadow-lg" 
                  : "bg-surface border-border text-espresso hover:border-terracotta hover:text-terracotta"
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
