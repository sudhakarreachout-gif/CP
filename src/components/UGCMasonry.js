"use client"
import { motion } from "framer-motion"
import Image from "next/image"

const communityImages = [
  {
    src: "https://images.unsplash.com/photo-1587300003388-59208cc962cb",
    handle: "@rocky_and_me"
  },
  {
    src: "https://images.unsplash.com/photo-1558788353-f76d92427f16",
    handle: "@pawlife.india"
  },
  {
    src: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
    handle: "@bella_rose"
  },
  {
    src: "https://images.unsplash.com/photo-1561037404-61cd46aa615b",
    handle: "@cuddlepaw_fan"
  },
  {
    src: "https://images.unsplash.com/photo-1587300003388-59208cc962cb",
    handle: "@milo.diary"
  },
  {
    src: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6",
    handle: "@tails_of_india"
  },
];

export default function UGCMasonry() {
  return (
    <section className="section-padding bg-bg border-t border-border/50 paw-pattern">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="section-title">Furry Friends of Cuddle Paw</h2>
          <p className="section-subtitle">
            Join our community of happy pets and proud humans. Tag us @cuddlepaw to be featured!
          </p>
        </div>

        <div className="columns-2 md:columns-3 gap-8 space-y-8">
          {communityImages.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="relative rounded-[24px] overflow-hidden group cursor-pointer break-inside-avoid mb-8 shadow-sm hover:shadow-2xl transition-all duration-500 clickable"
            >
              <img 
                src={photo.src} 
                alt="Community pet photo" 
                className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-text-heading/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Instagram Handle Overlay */}
              <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-sm px-[14px] py-[6px] rounded-full shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300">
                <span className="text-text-heading font-sans font-bold text-[10px] leading-none uppercase tracking-widest">{photo.handle}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <a 
            href="https://wa.me/916302946668?text=Hi%20Cuddle%20Paw!%20I'd%20love%20to%20share%20a%20photo%20of%20my%20pet%20🐾" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <button className="btn-primary bg-secondary hover:bg-secondary/90 shadow-2xl shadow-secondary/20 clickable px-12 py-5 text-sm uppercase tracking-[0.2em]">
              Share Your Pet's Photo 🐾
            </button>
          </a>
          <p className="mt-8 text-text-muted font-sans text-sm italic">
            Send us a photo on WhatsApp to get featured in our gallery!
          </p>
        </div>
      </div>
    </section>
  )
}
