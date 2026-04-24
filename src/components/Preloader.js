"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Lottie from "lottie-react"
import animationData from "../../public/loading_animation/Hamster Wheel Loading.json"

export default function Preloader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setLoading(false), 500)
          return 100
        }
        return prev + 2
      })
    }, 30)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] bg-bg flex flex-col items-center justify-center p-4"
        >
          <div className="w-64 sm:w-80 relative">
            <Lottie 
              animationData={animationData} 
              loop={true} 
              className="w-full h-auto"
            />
            
            {/* Progress Bar Container */}
            <div className="mt-8 space-y-4">
              <div className="w-full h-1.5 bg-espresso/5 rounded-full overflow-hidden border border-espresso/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-terracotta shadow-[0_0_15px_rgba(232,115,74,0.4)]"
                />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-nunito font-extrabold uppercase tracking-[0.2em] text-espresso/40">
                  Preparing your experience
                </span>
                <span className="text-[12px] font-serif font-bold text-terracotta">
                  {progress}%
                </span>
              </div>
            </div>
          </div>

          {/* Floating Text */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-12 text-[11px] font-nunito font-bold text-espresso/20 uppercase tracking-[0.3em]"
          >
            Driven by Love • Guided by Science
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
