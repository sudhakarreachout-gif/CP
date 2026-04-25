"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"

export default function Preloader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Elegant minimum duration for the animation to play
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500) // 2.5s allows the premium animation to be appreciated

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(15px)" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] bg-bg flex flex-col items-center justify-center p-4"
        >
          <div className="w-[300px] h-[300px] relative flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="w-full h-full"
            >
              <DotLottieReact
                src="https://lottie.host/9bd2e85d-ee9d-48a6-a247-927f1116e73b/uW7ZymwoAY.lottie"
                loop
                autoplay
                className="w-full h-full"
              />
            </motion.div>
          </div>

          {/* Minimalist Branding */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="absolute bottom-16 flex flex-col items-center gap-3"
          >
            <p className="text-[10px] font-sans font-bold text-text-heading/20 uppercase tracking-[0.5em]">
              Cuddle Paw
            </p>
            <div className="h-[1px] w-12 bg-border" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
