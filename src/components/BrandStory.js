"use client"
import { motion } from "framer-motion"
import { useEffect, useState, useRef } from "react"

function StatCounter({ target, suffix = '', label }) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasStarted) {
        setHasStarted(true)
      }
    }, { threshold: 0.5 })

    if (elementRef.current) observer.observe(elementRef.current)
    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    let start = 0
    const duration = 1500
    const increment = target / (duration / 16)
    
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)

    return () => clearInterval(timer)
  }, [hasStarted, target])

  return (
    <div ref={elementRef} className="space-y-2">
      <div className="text-[48px] md:text-[56px] font-serif font-bold text-text-heading leading-none">
        {target % 1 === 0 ? Math.floor(count) : count.toFixed(1)}{suffix}
      </div>
      <p className="text-[12px] font-sans font-bold text-text-muted uppercase tracking-widest">
        {label}
      </p>
      <div className="w-12 h-1 bg-primary/20 rounded-full" />
    </div>
  )
}

export default function BrandStory() {
  return (
    <section id="about" className="section-padding bg-surface overflow-hidden border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-primary font-sans font-bold uppercase tracking-[0.2em] text-xs">
                Our Philosophy
              </span>
              <h2 className="text-[42px] md:text-[48px] font-serif font-bold text-text-heading leading-[1.1]">
                Driven by Love, <br />
                <span className="text-text-muted italic">Guided by Science.</span>
              </h2>
            </div>
            
            <div className="space-y-6 max-w-xl">
              <p className="text-[17px] font-sans text-text-body leading-relaxed">
                Cuddle Paw was born from a simple observation: pets aren't just animals; they are family. We noticed a gap between high-volume clinical products and heartfelt care.
              </p>
              <p className="text-[17px] font-sans text-text-body leading-relaxed">
                Our team of veterinary experts and pet-loving designers work together to create products that support longevity, vitality, and joy.
              </p>
            </div>

            <div className="mt-8">
              <a href="#newsletter">
                <button className="btn-primary px-10 py-5 uppercase tracking-widest text-sm clickable">Join the Family</button>
              </a>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-16">
            <StatCounter target={10} suffix="k+" label="Healthy Paws" />
            <StatCounter target={100} suffix="%" label="Eco-Friendly" />
            <StatCounter target={4.9} suffix=" ⭐" label="Average Rating" />
            <StatCounter target={50} suffix="+" label="Vet-Approved" />
          </div>
        </div>
      </div>
    </section>
  )
}
