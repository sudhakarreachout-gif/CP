"use client"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { useState } from "react"

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    window.open('https://wa.me/910000000000?text=Hi%20Cuddle%20Paw!%20I%20have%20a%20question%20about%20my%20pet%20🐾', '_blank')
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
            className="mr-3 bg-espresso text-white px-5 py-2.5 rounded-full text-xs font-nunito font-bold shadow-xl whitespace-nowrap pointer-events-none"
          >
            Talk to a Specialist 🐾
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={handleClick}
        className="w-14 h-14 bg-espresso rounded-[20px] flex items-center justify-center text-white shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 relative group"
      >
        <MessageCircle className="w-6 h-6 transition-transform group-hover:rotate-12" />
        
        {/* Subtler indicator dot */}
        <div className="absolute top-0 right-0 w-3 h-3 bg-terracotta border-2 border-white rounded-full translate-x-1/3 -translate-y-1/3" />
      </button>
    </div>
  )
}
