"use client"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import ProductCard from "./ProductCard"

import { categories, allProducts } from "@/data/products"

export default function ProductGrid({ activeCategory = null, onSelect }) {
  const filteredProducts = activeCategory 
    ? allProducts.filter(p => p.category === activeCategory) 
    : allProducts.slice(0, 10);

  return (
    <section id="shop" className="section-padding bg-bg min-h-[600px] paw-pattern pt-0">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="section-title">
            {activeCategory ? `${activeCategory} Essentials` : 'Curated for Every Paw'}
          </h2>
          <p className="section-subtitle">
            {activeCategory 
              ? `Handpicked, premium essentials specifically curated for your ${activeCategory.toLowerCase()}.`
              : 'Handpicked for happy, healthy pets. Every product is vet-approved and paw-tested.'
            }
          </p>
        </div>

        {/* Filter Pills - Seamlessly Integrated */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onSelect(activeCategory === cat.name ? null : cat.name)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full border-[1.5px] font-nunito font-bold text-sm transition-all clickable whitespace-nowrap shadow-sm ${
                activeCategory === cat.name 
                ? "bg-espresso text-white border-espresso shadow-lg scale-105" 
                : "bg-surface/50 backdrop-blur-sm border-border text-espresso hover:border-terracotta hover:text-terracotta"
              }`}
            >
              <span className="text-base">{cat.icon}</span>
              <span>{cat.name}</span>
            </motion.button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-surface rounded-[32px] border border-border">
            <p className="text-text-muted italic font-jakarta">No products found in this category yet. Stay tuned! 🐾</p>
          </div>
        ) : (
          !activeCategory && (
            <div className="mt-16 text-center">
              <Link href="/shop">
                <button className="btn-primary px-12 py-5 text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all clickable group">
                  Explore All Collection 
                  <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          )
        )}
      </div>
    </section>
  )
}
