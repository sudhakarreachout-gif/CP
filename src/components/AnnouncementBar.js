"use client"
import { useState, useEffect } from "react"
import { X } from "lucide-react"

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const isDismissed = localStorage.getItem("announcementDismissed")
    if (!isDismissed) {
      setIsVisible(true)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem("announcementDismissed", "true")
  }

  if (!isVisible) return null

  return (
    <div className="h-10 bg-text-heading border-b border-white/5 relative flex items-center justify-center overflow-hidden z-[110]">
      <div className="ticker-text md:ticker-none text-primary-light/90 text-[11px] font-sans font-bold uppercase tracking-[0.2em] flex items-center gap-8">
        <span>🚚 Free delivery on orders above ₹499 | Use code PAWLOVE for 10% off</span>
        <span className="md:hidden">🚚 Free delivery on orders above ₹499 | Use code PAWLOVE for 10% off</span>
      </div>
      
      <button 
        onClick={handleClose}
        className="absolute right-4 p-1 text-primary-light/20 hover:text-primary transition-colors clickable"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
