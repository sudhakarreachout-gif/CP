"use client"
import { useState, useEffect } from "react"

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisible = () => {
      if (window.scrollY > 400) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }
    window.addEventListener("scroll", toggleVisible)
    return () => window.removeEventListener("scroll", toggleVisible)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-24 right-6 w-11 h-11 bg-terracotta text-white rounded-full flex items-center justify-center shadow-lg z-[9999] transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
      }`}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 100 100" 
        fill="white"
      >
        <circle cx="50" cy="70" r="25" />
        <circle cx="25" cy="45" r="12" />
        <circle cx="50" cy="35" r="12" />
        <circle cx="75" cy="45" r="12" />
      </svg>
    </button>
  )
}
