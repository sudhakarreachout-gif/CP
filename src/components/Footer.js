import { Send } from "lucide-react"

export default function Footer() {
  const socialLinks = [
    { 
      name: "Instagram", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
        </svg>
      ), 
      href: "#", 
      hoverColor: "hover:text-terracotta" 
    },
    { 
      name: "YouTube", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 2-2 58.38 58.38 0 0 1 15 0 2 2 0 0 1 2 2 24.12 24.12 0 0 1 0 10 2 2 0 0 1-2 2 58.38 58.38 0 0 1-15 0 2 2 0 0 1-2-2Z"/><path d="m10 15 5-3-5-3z"/>
        </svg>
      ), 
      href: "#", 
      hoverColor: "hover:text-terracotta" 
    },
    { 
      name: "WhatsApp", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
        </svg>
      ), 
      href: "#", 
      hoverColor: "hover:text-[#25D366]" 
    }
  ]

  return (
    <footer className="bg-text-heading text-primary-light section-padding relative overflow-hidden">
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none paw-pattern"></div>
      
      {/* Luxury Watermark */}
      <div className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-[0.03] text-[18vw] font-serif font-bold whitespace-nowrap z-0 tracking-tighter">
        CUDDLE PAW
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 pb-20 border-b border-white/5">
          {/* Column 1 — Brand */}
          <div className="space-y-8">
            <a href="/" className="flex items-center gap-3 group clickable">
              <div className="w-10 h-10 bg-primary-light rounded-2xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 100 100" 
                  className="fill-text-heading"
                >
                  <circle cx="50" cy="70" r="25" />
                  <circle cx="25" cy="45" r="12" />
                  <circle cx="50" cy="35" r="12" />
                  <circle cx="75" cy="45" r="12" />
                </svg>
              </div>
              <span className="text-[28px] font-serif font-bold tracking-tight text-white">Cuddle Paw</span>
            </a>
            
            <div className="space-y-4">
              <p className="text-[15px] font-sans text-primary-light/40 leading-relaxed max-w-[280px]">
                Elevating the standard of pet living through thoughtful design and veterinary science.
              </p>
              <p className="text-[12px] font-sans font-bold text-primary tracking-[0.2em] uppercase">
                Hyderabad, India 🇮🇳
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-5">
              {socialLinks.map((social) => (
                <a 
                  key={social.name} 
                  href={social.href} 
                  className={`w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-primary-light/30 transition-all duration-300 ${social.hoverColor} hover:border-current hover:text-white bg-white/5 clickable`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Shop */}
          <div className="space-y-8">
            <h4 className="font-sans font-bold uppercase tracking-[0.25em] text-[10px] text-primary/80">Collections</h4>
            <ul className="space-y-4 font-sans text-primary-light/30 text-sm">
              <li><a href="#shop" className="hover:text-white transition-colors clickable">The Dog Collection</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors clickable">The Cat Collection</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors clickable">Eco-Friendly Essentials</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors clickable">New Seasonal Drops</a></li>
            </ul>
          </div>
 
          {/* Column 3 — Services */}
          <div className="space-y-8">
            <h4 className="font-sans font-bold uppercase tracking-[0.25em] text-[10px] text-primary/80">Concierge</h4>
            <ul className="space-y-4 font-sans text-primary-light/30 text-sm">
              <li><a href="#services" className="hover:text-white transition-colors clickable">Luxury Spa & Grooming</a></li>
              <li><a href="#services" className="hover:text-white transition-colors clickable">24/7 Vet Support</a></li>
              <li><a href="#services" className="hover:text-white transition-colors clickable">Nutritionist Booking</a></li>
              <li><a href="#services" className="hover:text-white transition-colors clickable">Pet Care Journal</a></li>
            </ul>
          </div>

          {/* Column 4 — Newsletter */}
          <div id="newsletter" className="space-y-8">
            <h4 className="font-sans font-bold uppercase tracking-[0.25em] text-[10px] text-primary/80">Newsletter</h4>
            <div className="space-y-6">
              <p className="text-primary-light/40 text-[14px] font-sans leading-relaxed">
                Join 10,000+ pet parents receiving our weekly care guide.
              </p>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="w-full bg-white/5 border border-white/5 px-6 py-4 rounded-full text-sm outline-none focus:border-primary/30 focus:bg-white/10 transition-all font-sans pr-14 placeholder:text-white/10"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:scale-105 transition-transform clickable">
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Fine Print */}
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-primary-light/10 text-[9px] font-sans font-bold uppercase tracking-[0.3em]">
          <span>&copy; 2026 Cuddle Paw Pet Store. Crafting Joy Since 2021.</span>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white/30 transition-colors clickable">Privacy</a>
            <a href="#" className="hover:text-white/30 transition-colors clickable">Terms</a>
            <a href="#" className="hover:text-white/30 transition-colors clickable">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
