"use client"
import { motion } from "framer-motion"
import { Quote, Star } from "lucide-react"

const testimonials = [
  {
    text: "My dog absolutely loves everything from Cuddle Paw. The eco toys are incredible quality.",
    name: "Priya S.",
    location: "Bangalore",
    rating: 5,
    pet: "🐶 Golden Retriever Mom"
  },
  {
    text: "Finally a pet store that actually cares about what goes into their products. 100% recommend.",
    name: "Arjun K.",
    location: "Hyderabad",
    rating: 5,
    pet: "🐱 Two Cats Dad"
  },
  {
    text: "The grooming service was beyond expectations. My lab came back looking and smelling amazing.",
    name: "Meera R.",
    location: "Mumbai",
    rating: 5,
    pet: "🐶 Labrador Mom"
  }
];

export default function TestimonialStrip() {
  return (
    <section className="py-[60px] md:px-[80px] bg-[#FFFAF4]">
      <div className="container mx-auto px-4">
        <h2 className="section-title">
          What Pet Parents Are Saying 🐾
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-hover bg-bg border border-border rounded-[20px] p-[28px] flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-butter text-butter" />
                  ))}
                </div>
                <p className="text-[15px] font-sans text-espresso leading-[1.6]">
                  "{t.text}"
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-border/50">
                <div className="flex flex-col gap-3">
                  <div>
                    <h4 className="font-nunito font-bold text-espresso text-[14px]">{t.name}</h4>
                    <p className="text-[12px] font-sans text-text-muted">{t.location}</p>
                  </div>
                  <div className="inline-flex items-center px-3 py-1 bg-sage/15 border border-sage/20 rounded-full w-fit">
                    <span className="text-sage font-nunito font-bold text-[11px]">{t.pet}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
