"use client"
import { Search, ShoppingCart, User, Menu, X, Plus } from "lucide-react"
import { useCartStore } from "@/store/useCartStore"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

import { allProducts } from "@/data/products"
import Image from "next/image"

export default function Header() {
  const { cart, isOpen, toggleCart, removeFromCart, updateQuantity, addToCart } = useCartStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = allProducts.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
      setSearchResults(filtered)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  const navLinks = [
    { name: "Shop", href: "#shop" },
    { name: "Services", href: "#services" },
    { name: "Our Story", href: "#about" },
    { name: "Blog", href: "#blog" }
  ]

  return (
    <>
      <header className={`sticky top-0 left-0 w-full z-[100] transition-all duration-300 ${isScrolled ? "glass-sticky py-0" : "bg-transparent py-2"}`}>
        <div className={`container mx-auto px-4 flex items-center justify-between transition-all duration-300 ${isScrolled ? "h-[52px]" : "h-16"}`}>
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-2 group clickable">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 100 100" 
                className="fill-terracotta"
              >
                <circle cx="50" cy="70" r="25" />
                <circle cx="25" cy="45" r="12" />
                <circle cx="50" cy="35" r="12" />
                <circle cx="75" cy="45" r="12" />
              </svg>
              <span className="text-xl font-serif font-bold text-espresso">Cuddle Paw</span>
            </a>
            
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-[15px] font-jakarta font-medium text-espresso hover:text-terracotta transition-colors relative group py-2 clickable"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-terracotta transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Implementation */}
            <div className="hidden lg:block relative">
              <div className="flex items-center bg-surface px-4 py-2 rounded-full border border-border w-64 group focus-within:border-terracotta focus-within:shadow-[0_0_0_3px_rgba(232,115,74,0.15)] transition-all">
                <Search className="w-4 h-4 text-text-muted group-focus-within:text-terracotta" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for your pet..." 
                  className="bg-transparent border-none outline-none px-3 text-sm w-full placeholder:text-text-muted/50 font-jakarta"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="hover:text-terracotta">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Search Results Dropdown */}
              <AnimatePresence>
                {searchQuery && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-3 bg-white border border-border rounded-[24px] shadow-2xl overflow-hidden p-2 z-[200]"
                  >
                    {searchResults.length > 0 ? (
                      <div className="space-y-1">
                        {searchResults.map((product) => (
                          <div 
                            key={product.id} 
                            onClick={() => {
                              addToCart(product)
                              setSearchQuery("")
                            }}
                            className="flex items-center gap-3 p-2 hover:bg-espresso/5 rounded-[16px] cursor-pointer transition-colors group"
                          >
                            <div className="w-12 h-12 bg-border rounded-xl overflow-hidden shrink-0">
                              <Image src={product.image} alt={product.name} width={48} height={48} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-nunito font-bold text-espresso truncate">{product.name}</h4>
                              <p className="text-[10px] text-terracotta font-nunito font-bold">₹{product.price.toLocaleString('en-IN')}</p>
                            </div>
                            <Plus className="w-4 h-4 text-espresso/20 group-hover:text-terracotta transition-colors" />
                          </div>
                        ))}
                        <div className="p-2 border-t border-border mt-1">
                          <a href="#shop" onClick={() => setSearchQuery("")} className="text-[10px] font-nunito font-bold text-espresso/40 hover:text-terracotta block text-center uppercase tracking-widest">
                            View All Products
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 text-center">
                        <p className="text-xs text-text-muted italic font-jakarta">No pet essentials found 🐾</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <button className="p-2 hover:bg-espresso/5 rounded-xl relative clickable" onClick={toggleCart}>
              <ShoppingCart className="w-5 h-5 text-espresso" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-terracotta text-white text-[10px] font-nunito font-bold w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-bg">
                  {totalItems}
                </span>
              )}
            </button>
            
            <button className="hidden sm:p-2 hover:bg-espresso/5 rounded-full sm:block clickable">
              <User className="w-6 h-6 text-espresso" />
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 hover:bg-espresso/5 rounded-xl transition-colors clickable"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6 text-espresso" /> : <Menu className="w-6 h-6 text-espresso" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-bg/95 backdrop-blur-xl border-t border-border overflow-hidden"
            >
              <div className="container mx-auto px-4 py-8 flex flex-col gap-6 font-nunito font-bold text-xl">
                {/* Mobile Search Bar */}
                <div className="flex items-center bg-white px-4 py-3 rounded-2xl border border-border">
                  <Search className="w-5 h-5 text-text-muted" />
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="bg-transparent border-none outline-none px-3 text-base w-full font-jakarta"
                  />
                </div>
                {navLinks.map((link) => (
                  <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="hover:text-terracotta transition-colors">
                    {link.name}
                  </a>
                ))}
                <div className="pt-6 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <User className="w-6 h-6 text-text-muted" />
                    <span className="text-base font-jakarta font-medium text-espresso">Account</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleCart}
              className="fixed inset-0 bg-espresso/40 backdrop-blur-sm z-[2200]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-bg z-[2300] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="text-2xl font-serif text-espresso">Your Cart 🐾</h2>
                <button onClick={toggleCart} className="p-2 hover:bg-espresso/5 rounded-full clickable">
                  <X className="w-6 h-6 text-espresso" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar">
                {cart.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-text-muted italic font-jakarta">Looks like your pet is still deciding 🐾</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="w-20 h-20 bg-border rounded-2xl overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-nunito font-bold text-espresso">{item.name}</h4>
                        <p className="text-terracotta font-nunito font-bold">₹{item.price.toLocaleString('en-IN')}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <button 
                            className="w-7 h-7 border border-border rounded-lg flex items-center justify-center hover:bg-espresso/5 text-espresso clickable"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >-</button>
                          <span className="text-sm w-4 text-center font-nunito font-bold text-espresso">{item.quantity}</span>
                          <button 
                            className="w-7 h-7 border border-border rounded-lg flex items-center justify-center hover:bg-espresso/5 text-espresso clickable"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >+</button>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-text-muted hover:text-terracotta transition-colors p-2 clickable"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="p-8 border-t border-border bg-surface">
                <div className="flex justify-between mb-6 font-nunito font-bold text-xl text-espresso">
                  <span>Total</span>
                  <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <button className="btn-primary w-full py-4 text-lg clickable">
                  Proceed to Checkout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
