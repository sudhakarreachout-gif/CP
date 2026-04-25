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
        <div className="flex flex-col items-center text-center mb-16">
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
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onSelect(activeCategory === cat.name ? null : cat.name)}
              className={`flex items-center gap-3 px-7 py-3 rounded-full border-[1.5px] font-sans font-bold text-[12px] transition-all clickable whitespace-nowrap uppercase tracking-widest ${
                activeCategory === cat.name 
                ? "bg-text-heading text-white border-text-heading shadow-xl scale-105" 
                : "bg-surface/80 backdrop-blur-sm border-border text-text-heading hover:border-primary hover:text-primary"
              }`}
            >
              <span className="text-base">{cat.icon}</span>
              {cat.name}
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
          <div className="text-center py-20 bg-surface rounded-[40px] border border-border">
            <p className="text-text-muted italic font-sans">No products found in this category yet. Stay tuned! 🐾</p>
          </div>
        ) : (
          !activeCategory && (
            <div className="mt-20 text-center">
              <Link href="/shop">
                <button className="btn-primary px-12 py-5 text-sm uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all clickable group">
                  Explore Full Collection 
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
