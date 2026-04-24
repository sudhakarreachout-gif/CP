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
    <div className="h-9 bg-espresso border-b border-border/40 relative flex items-center justify-center overflow-hidden z-[110]">
      <div className="ticker-text md:ticker-none text-white text-[13px] font-nunito font-semibold tracking-wide flex items-center gap-4">
        <span>🚚 Free delivery on orders above ₹499 | Use code PAWLOVE for 10% off</span>
        <span className="md:hidden">🚚 Free delivery on orders above ₹499 | Use code PAWLOVE for 10% off</span>
      </div>
      
      <button 
        onClick={handleClose}
        className="absolute right-4 p-1 text-espresso/40 hover:text-espresso transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
