"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Suspense, useRef, useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, Html, useProgress, PerspectiveCamera } from "@react-three/drei"
import * as THREE from "three"
import Hero3DModel from "./Hero3DModel"

function FloatingBackground() {
  const dropShadow = "drop-shadow(0px 8px 24px rgba(0, 0, 0, 0.15))"

  return (
    <>
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-[0] overflow-hidden pointer-events-none">
        <img
          src="/images/hero-2.png"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* 1. Behind the Puppy (z-[2]) */}
      <img src="/images/white_yarn.png" alt="" 
        className="absolute pointer-events-none z-[2] bottom-[24%] right-[70%] md:right-[38%]"
        style={{ width: 'clamp(60px, 15vw, 120px)', opacity: 0.85, filter: dropShadow, transform: 'rotate(15deg)' }} />
      
      <img src="/images/green_yarn.png" alt="" 
        className="absolute pointer-events-none z-[2] bottom-[20%] right-[15%] md:right-[22%]"
        style={{ width: 'clamp(80px, 18vw, 140px)', opacity: 0.9, filter: dropShadow }} />
      
      <img src="/images/rope_knot.png" alt="" 
        className="absolute pointer-events-none z-[2] bottom-[30%] right-[5%] md:right-[14%]"
        style={{ width: 'clamp(90px, 20vw, 150px)', opacity: 0.9, filter: dropShadow, transform: 'rotate(-25deg)' }} />

      {/* 2. In Front of Puppy (z-[5]) */}
      <img src="/images/wool_bundle.png" alt="" 
        className="absolute pointer-events-none z-[5] bottom-[15%] left-[5%] md:left-auto md:right-[44%]"
        style={{ width: 'clamp(100px, 25vw, 200px)', filter: dropShadow, transform: 'rotate(-10deg)' }} />
      
      <img src="/images/terra_bone.png" alt="" 
        className="absolute pointer-events-none z-[5] bottom-[6%] right-[60%] md:right-[26%]"
        style={{ width: 'clamp(90px, 22vw, 160px)', filter: dropShadow, transform: 'rotate(5deg)' }} />
      
      <img src="/images/mouse.png" alt="" 
        className="absolute pointer-events-none z-[5] bottom-[18%] right-[10%] md:right-[32%]"
        style={{ width: 'clamp(60px, 12vw, 100px)', filter: dropShadow, transform: 'rotate(20deg)' }} />
      
      <img src="/images/brown_yarn.png" alt="" 
        className="absolute pointer-events-none z-[5] bottom-[4%] right-[5%] md:right-[18%]"
        style={{ width: 'clamp(130px, 30vw, 220px)', filter: dropShadow }} />

    </>
  )
}

export default function Hero() {
  const heroContainerRef = useRef(null)

  return (
    <section
      ref={heroContainerRef}
      className="relative w-full min-h-[90vh] lg:min-h-screen overflow-hidden bg-bg flex flex-col lg:flex-row items-center pt-24 lg:pt-0"
    >
      <FloatingBackground />

      {/* 1. TEXT CONTENT (z-[5]) */}
      <div className="relative z-[5] w-full lg:w-1/2 px-4 sm:px-10 lg:pl-[5%] order-1 lg:order-1 pb-10 lg:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="stagger-fade-in p-6 sm:p-12 lg:p-12 rounded-[2.5rem] lg:rounded-[3rem] bg-surface/40 backdrop-blur-[15px] border border-border/50 shadow-[0_20px_60px_rgba(196,94,42,0.05)] relative max-w-2xl mx-auto lg:mx-0"
        >
          {/* Edge blend glow */}
          <div className="absolute inset-0 -z-10 rounded-[2.5rem] lg:rounded-[3rem] blur-3xl bg-primary-light/10 opacity-60 scale-105"></div>

          <div className="inline-flex items-center gap-2 bg-primary-light/50 border border-primary/10 text-primary px-4 py-1.5 rounded-full font-sans font-bold text-[10px] uppercase tracking-[0.2em] mb-8">
            <span>🐾 New Collection Just Dropped</span>
          </div>

          <h1 className="hero-headline mb-8 text-center lg:text-left text-text-heading">
            Thoughtful Living <br />
            <span className="text-primary italic">For Every Paw.</span>
          </h1>

          <p className="hero-subtext mb-10 max-w-lg mx-auto lg:mx-0 text-center lg:text-left text-text-body">
            Because your pet deserves the same love you give them. Every product is crafted for comfort and longevity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start">
            <a href="#shop" className="w-full sm:w-auto">
              <button className="btn-primary w-full shadow-2xl active:scale-95 transition-all clickable uppercase tracking-widest text-sm">
                Shop Collection
              </button>
            </a>
            <a href="#services" className="w-full sm:w-auto">
              <button className="btn-secondary w-full bg-white/10 backdrop-blur-xl border-primary/20 hover:bg-primary hover:text-white transition-all clickable uppercase tracking-widest text-sm">
                Explore Services
              </button>
            </a>
          </div>

          <div className="pt-10 border-t border-border">
            <p className="text-[12px] font-sans font-bold text-text-muted mb-6 flex items-center justify-center lg:justify-start gap-2 text-center lg:text-left tracking-wider uppercase">
              <span className="text-primary text-xl">★</span> Loved by 10,000+ pet parents across India
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              <span className="px-5 py-2.5 bg-secondary-light/60 border border-secondary/10 text-secondary font-sans font-bold text-[10px] uppercase tracking-[0.15em] rounded-full backdrop-blur-sm">Vet Approved</span>
              <span className="px-5 py-2.5 bg-secondary-light/60 border border-secondary/10 text-secondary font-sans font-bold text-[10px] uppercase tracking-[0.15em] rounded-full backdrop-blur-sm">Eco Friendly</span>
              <span className="px-5 py-2.5 bg-primary-light/60 border border-primary/10 text-primary font-sans font-bold text-[10px] uppercase tracking-[0.15em] rounded-full backdrop-blur-sm">Made in India</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 2. PUPPY CANVAS (z-[4]) */}
      <div className="relative lg:absolute lg:top-0 lg:right-0 w-full lg:w-[60%] h-[45vh] sm:h-[55vh] lg:h-full z-[4] order-2 lg:order-2">
        {/* Puppy Glow behind the dog */}
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <div className="w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary/10 blur-[100px] rounded-full"></div>
        </div>

        <Canvas
          shadows
          flat
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ width: '100%', height: '100%' }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={38} />
          <ambientLight intensity={1.5} color="#FDFAF5" />
          <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />

          <Suspense fallback={null}>
            <Hero3DModel containerRef={heroContainerRef} />
            <Environment preset="apartment" />
          </Suspense>
        </Canvas>
      </div>
    </section>
  )
}
