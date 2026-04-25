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
    <section className="section-padding bg-surface border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="section-title">
            What Pet Parents Are Saying 🐾
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-hover bg-bg border border-border rounded-[24px] p-8 flex flex-col justify-between"
            >
              <div className="space-y-5">
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="quote-text leading-relaxed">
                  "{t.text}"
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-border/60">
                <div className="flex flex-col gap-4">
                  <div>
                    <h4 className="font-sans font-bold text-text-heading text-[15px]">{t.name}</h4>
                    <p className="text-[12px] font-sans text-text-muted font-medium">{t.location}</p>
                  </div>
                  <div className="inline-flex items-center px-4 py-1.5 bg-secondary-light/60 border border-secondary/10 rounded-full w-fit">
                    <span className="text-secondary font-sans font-bold text-[10px] uppercase tracking-[0.15em]">{t.pet}</span>
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
