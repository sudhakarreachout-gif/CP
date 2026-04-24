"use client"
import { useState } from "react"
import AnnouncementBar from "@/components/AnnouncementBar"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import ProductGrid from "@/components/ProductGrid"
import ServicesTabs from "@/components/ServicesTabs"
import dynamic from 'next/dynamic'

const WhyCuddlePaw = dynamic(() => import('@/components/WhyCuddlePaw'), { ssr: true })
const BrandStory = dynamic(() => import('@/components/BrandStory'), { ssr: true })
const UGCMasonry = dynamic(() => import('@/components/UGCMasonry'), { ssr: true })
const TestimonialStrip = dynamic(() => import('@/components/TestimonialStrip'), { ssr: true })
const Footer = dynamic(() => import('@/components/Footer'), { ssr: true })

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(null)

  return (
    <main className="bg-bg min-h-screen">
      <AnnouncementBar />
      <Header />
      <Hero />
      <ProductGrid 
        activeCategory={activeCategory} 
        onSelect={setActiveCategory} 
      />
      <ServicesTabs />
      <WhyCuddlePaw />
      <BrandStory />
      <UGCMasonry />
      <TestimonialStrip />
      <Footer />
    </main>
  )
}
