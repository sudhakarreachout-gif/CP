"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Star, Heart } from "lucide-react"
import { useCartStore } from "@/store/useCartStore"
import { useState } from "react"
import Image from "next/image"

import { categories, allProducts } from "@/data/products"

function ProductCard({ product }) {
  const { addToCart } = useCartStore()
  const [isLiked, setIsLiked] = useState(false)
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div 
      layout
      className="group card-hover bg-surface rounded-[20px] p-4 border border-border relative flex flex-col h-full clickable"
    >
      {/* Best Seller Badge */}
      {product.isBestSeller && (
        <div className="absolute top-6 left-6 z-10 bg-butter text-[#7A5000] font-nunito font-bold text-[10px] px-3 py-1 rounded-full shadow-sm">
          Best Seller
        </div>
      )}

      {/* Wishlist Heart */}
      <button 
        onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}
        className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm text-espresso/30 hover:text-terracotta transition-all clickable group/heart"
      >
        <motion.div animate={isLiked ? { scale: [1, 1.3, 1] } : {}}>
          <Heart className={`w-5 h-5 ${isLiked ? "fill-terracotta text-terracotta" : "text-[#C8B8A2]"}`} />
        </motion.div>
      </button>

      {/* Image Container */}
      <div className="relative aspect-square rounded-t-[12px] overflow-hidden mb-5 bg-[#F0E8DC] flex items-center justify-center product-image-container">
        {!imgError ? (
          <Image 
            src={product.image} 
            alt={product.name} 
            fill 
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="text-4xl">🐾</div>
        )}
        
        {/* Hover Add to Cart Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); addToCart(product); }}
          className="absolute bottom-0 left-0 w-full bg-espresso text-white py-3 font-nunito font-bold text-[13px] translate-y-full group-hover:translate-y-0 transition-transform duration-200 clickable"
        >
          Add to Cart
        </button>
      </div>

      {/* Product Info */}
      <div className="flex-1 space-y-2 px-1">
        <div className="flex items-center gap-1.5 text-butter">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating || 4.5) ? "fill-current" : "text-border"}`} />
          ))}
          <span className="text-[12px] font-nunito font-bold text-sage ml-1">{product.rating || 4.9}</span>
        </div>
        
        <h3 className="text-[15px] font-nunito font-bold text-espresso leading-tight line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-[18px] font-nunito font-bold text-espresso">
          ₹{product.price.toLocaleString('en-IN')}
        </p>
      </div>
    </motion.div>
  )
}

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

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-surface rounded-[32px] border border-border">
            <p className="text-text-muted italic font-jakarta">No products found in this category yet. Stay tuned! 🐾</p>
          </div>
        )}
      </div>
    </section>
  )
}
