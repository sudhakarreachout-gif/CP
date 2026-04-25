"use client"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { useState } from "react"

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    window.open('https://wa.me/916302946668?text=Hi%20Cuddle%20Paw!%20I%20have%20a%20question%20about%20my%20pet%20🐾', '_blank')
  }

  return (
    <div 
      className="fixed bottom-8 right-8 z-[9999] flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="mr-4 bg-text-heading text-white px-6 py-3 rounded-full text-[11px] font-sans font-bold shadow-2xl whitespace-nowrap pointer-events-none uppercase tracking-widest border border-white/5"
          >
            Talk to a Specialist 🐾
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={handleClick}
        className="w-16 h-16 bg-text-heading rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 active:scale-90 transition-all duration-300 relative group clickable"
      >
        <MessageCircle className="w-7 h-7 transition-transform group-hover:rotate-12" />
        
        {/* Subtler indicator dot */}
        <div className="absolute top-1 right-1 w-4 h-4 bg-primary border-2 border-text-heading rounded-full" />
      </button>
    </div>
  )
}
