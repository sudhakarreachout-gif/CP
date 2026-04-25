"use client"
import { motion } from "framer-motion"
import { Plus, Star, Heart } from "lucide-react"
import { useCartStore } from "@/store/useCartStore"
import { useState } from "react"
import Image from "next/image"

export default function ProductCard({ product }) {
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
        <div className="absolute top-6 left-6 z-10 bg-badge-bestseller text-white font-sans font-bold text-[10px] px-3 py-1 rounded-full shadow-sm uppercase tracking-wider">
          Best Seller
        </div>
      )}

      {/* Wishlist Heart */}
      <button 
        onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}
        className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm text-text-heading/30 hover:text-primary transition-all clickable group/heart"
      >
        <motion.div animate={isLiked ? { scale: [1, 1.3, 1] } : {}}>
          <Heart className={`w-5 h-5 ${isLiked ? "fill-primary text-primary" : "text-border"}`} />
        </motion.div>
      </button>

      {/* Image Container */}
      <div className="relative aspect-square rounded-t-[12px] overflow-hidden mb-5 bg-primary-light/10 flex items-center justify-center product-image-container">
        {!imgError ? (
          <Image 
            src={product.image} 
            alt={product.name} 
            fill 
            unoptimized={true}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="text-4xl">🐾</div>
        )}
        
        {/* Hover Add to Cart Button (Desktop) */}
        <button 
          onClick={(e) => { e.stopPropagation(); addToCart(product); }}
          className="absolute bottom-0 left-0 w-full bg-primary text-white py-4 font-sans font-bold text-[13px] translate-y-full group-hover:translate-y-0 transition-transform duration-300 clickable hidden md:block uppercase tracking-widest"
        >
          Add to Cart
        </button>

        {/* Quick Add Button (Mobile) */}
        <button 
          onClick={(e) => { e.stopPropagation(); addToCart(product); }}
          className="absolute bottom-2 right-2 z-10 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform md:hidden"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Product Info */}
      <div className="flex-1 space-y-2 px-1">
        <div className="flex items-center gap-1.5 text-primary">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating || 4.5) ? "fill-current" : "text-border"}`} />
          ))}
          <span className="text-[12px] font-sans font-bold text-secondary ml-1">{product.rating || 4.9}</span>
        </div>
        
        <h3 className="text-[16px] font-sans font-bold text-text-heading leading-tight line-clamp-2">
          {product.name}
        </h3>
        
        <p className="price text-primary font-bold">
          ₹{product.price.toLocaleString('en-IN')}
        </p>
      </div>
    </motion.div>
  )
}
