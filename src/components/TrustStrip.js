"use client"

const items = [
  "🐾 10,000+ Happy Pet Parents",
  "🌿 100% Eco-Friendly Packaging",
  "🩺 Vet-Approved Products",
  "🚚 Free Delivery Above ₹499",
  "⭐ 4.9 Average Rating",
  "🇮🇳 Proudly Made in India",
  "🐶 Trusted by Pet Parents Since 2021",
];

export default function TrustStrip() {
  return (
    <div className="trust-strip">
      <div className="trust-track">
        {/* Duplicate items for seamless loop */}
        {[...items, ...items].map((item, i) => (
          <div key={i} className="trust-item">
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
