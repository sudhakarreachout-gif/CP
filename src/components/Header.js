"use client"
import { Search, ShoppingCart, User, Menu, X, Plus, ChevronRight } from "lucide-react"
import { useCartStore } from "@/store/useCartStore"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Link from "next/link"
import { allProducts } from "@/data/products"
import Image from "next/image"

export default function Header() {
  const { cart, isOpen, toggleCart, removeFromCart, updateQuantity, addToCart, clearCart } = useCartStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  const handleCheckout = () => {
    if (cart.length === 0) return

    // Format cart items for WhatsApp
    const itemsList = cart.map(item => `- ${item.name} x${item.quantity} (₹${item.price.toLocaleString('en-IN')})`).join('%0A')
    const message = `Hi Cuddle Paw! 🐾%0AI'd like to place an order for:%0A%0A${itemsList}%0A%0ATotal: ₹${totalPrice.toLocaleString('en-IN')}%0A%0APlease let me know the next steps!`
    
    window.open(`https://wa.me/916302946668?text=${message}`, '_blank')
    
    // Clear cart and close drawer after a short delay
    setTimeout(() => {
      clearCart()
      toggleCart()
    }, 1000)
  }

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
    { name: "Shop", href: "/shop" },
    { name: "Services", href: "/#services" },
    { name: "Our Story", href: "/#about" },
    { name: "Blog", href: "#" }
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
                className="fill-primary"
              >
                <circle cx="50" cy="70" r="25" />
                <circle cx="25" cy="45" r="12" />
                <circle cx="50" cy="35" r="12" />
                <circle cx="75" cy="45" r="12" />
              </svg>
              <span className="text-xl font-serif font-bold text-text-heading tracking-tight">Cuddle Paw</span>
            </a>
            
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="nav-link text-text-heading hover:text-primary transition-colors relative group py-2 clickable"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Implementation */}
            <div className="hidden lg:block relative">
              <div className="flex items-center bg-surface px-4 py-2 rounded-full border border-border w-64 group focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgba(196,94,42,0.1)] transition-all">
                <Search className="w-4 h-4 text-text-muted group-focus-within:text-primary" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search essentials..." 
                  className="bg-transparent border-none outline-none px-3 text-[13px] w-full placeholder:text-text-muted/50 font-sans font-medium text-text-body"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="hover:text-primary">
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
                    className="absolute top-full left-0 right-0 mt-3 bg-surface border border-border rounded-[24px] shadow-2xl overflow-hidden p-2 z-[200]"
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
                            className="flex items-center gap-3 p-2 hover:bg-primary/5 rounded-[16px] cursor-pointer transition-colors group"
                          >
                            <div className="w-12 h-12 bg-primary-light/30 rounded-xl overflow-hidden shrink-0">
                              <Image src={product.image} alt={product.name} width={48} height={48} unoptimized={true} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-sans font-bold text-text-heading truncate">{product.name}</h4>
                              <p className="text-[10px] text-primary font-sans font-bold">₹{product.price.toLocaleString('en-IN')}</p>
                            </div>
                            <Plus className="w-4 h-4 text-text-heading/20 group-hover:text-primary transition-colors" />
                          </div>
                        ))}
                        <div className="p-2 border-t border-border mt-1">
                          <a href="#shop" onClick={() => setSearchQuery("")} className="text-[10px] font-sans font-bold text-text-muted/60 hover:text-primary block text-center uppercase tracking-widest">
                            View All Products
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 text-center">
                        <p className="text-xs text-text-muted italic font-sans">No pet essentials found 🐾</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <button className="p-2 hover:bg-primary/5 rounded-xl relative clickable" onClick={toggleCart}>
              <ShoppingCart className="w-5 h-5 text-text-heading" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-sans font-bold w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-bg">
                  {totalItems}
                </span>
              )}
            </button>
            
            <button className="hidden sm:p-2 hover:bg-primary/5 rounded-full sm:block clickable">
              <User className="w-6 h-6 text-text-heading" />
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 hover:bg-primary/5 rounded-xl transition-colors clickable"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6 text-text-heading" /> : <Menu className="w-6 h-6 text-text-heading" />}
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
              <div className="container mx-auto px-4 py-8 flex flex-col gap-6 font-sans font-bold text-xl">
                {/* Mobile Search Bar */}
                <div className="relative">
                  <form 
                    onSubmit={(e) => { e.preventDefault(); if (searchResults.length > 0) { setIsMenuOpen(false); } }}
                    className="flex items-center bg-surface px-4 py-3 rounded-2xl border border-border focus-within:border-primary transition-colors"
                  >
                    <Search className="w-5 h-5 text-text-muted" />
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search essentials..." 
                      className="bg-transparent border-none outline-none px-3 text-base w-full font-sans text-text-body"
                    />
                    {searchQuery && (
                      <button type="button" onClick={() => setSearchQuery("")} className="hover:text-primary">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </form>

                  {/* Mobile Search Results */}
                  <AnimatePresence>
                    {searchQuery && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-[20px] shadow-xl overflow-hidden p-2 z-[200]"
                      >
                        {searchResults.length > 0 ? (
                          <div className="space-y-1">
                            {searchResults.map((product) => (
                              <div 
                                key={product.id} 
                                onClick={() => {
                                  addToCart(product)
                                  setSearchQuery("")
                                  setIsMenuOpen(false)
                                }}
                                className="flex items-center gap-3 p-2 hover:bg-primary/5 rounded-[12px] cursor-pointer transition-colors group"
                              >
                                <div className="w-10 h-10 bg-primary-light/20 rounded-lg overflow-hidden shrink-0">
                                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-[13px] font-sans font-bold text-text-heading truncate">{product.name}</h4>
                                  <p className="text-[11px] text-primary font-sans font-bold">₹{product.price.toLocaleString('en-IN')}</p>
                                </div>
                                <Plus className="w-4 h-4 text-text-heading/20 group-hover:text-primary transition-colors" />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-4 text-center">
                            <p className="text-xs text-text-muted italic font-sans">No pet essentials found 🐾</p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsMenuOpen(false)} 
                    className="text-text-heading hover:text-primary transition-colors flex items-center justify-between"
                  >
                    {link.name}
                    <ChevronRight className="w-5 h-5 text-text-heading/20" />
                  </Link>
                ))}
                
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="pt-6 border-t border-border flex items-center justify-between group clickable"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <User className="w-5 h-5 text-text-heading" />
                    </div>
                    <span className="text-base font-sans font-medium text-text-heading">Account & Orders</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-text-heading/20" />
                </button>
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
              className="fixed inset-0 bg-text-heading/40 backdrop-blur-sm z-[2200]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-bg z-[2300] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="text-2xl font-serif text-text-heading">Your Cart 🐾</h2>
                <button onClick={toggleCart} className="p-2 hover:bg-primary/5 rounded-full clickable">
                  <X className="w-6 h-6 text-text-heading" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar">
                {cart.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-text-muted italic font-sans">Looks like your pet is still deciding 🐾</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="w-20 h-20 bg-primary-light/20 rounded-2xl overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-sans font-bold text-text-heading">{item.name}</h4>
                        <p className="text-primary font-sans font-bold">₹{item.price.toLocaleString('en-IN')}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <button 
                            className="w-7 h-7 border border-border rounded-lg flex items-center justify-center hover:bg-primary/5 text-text-heading clickable"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >-</button>
                          <span className="text-sm w-4 text-center font-sans font-bold text-text-heading">{item.quantity}</span>
                          <button 
                            className="w-7 h-7 border border-border rounded-lg flex items-center justify-center hover:bg-primary/5 text-text-heading clickable"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >+</button>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-text-muted hover:text-primary transition-colors p-2 clickable"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="p-8 border-t border-border bg-surface">
                <div className="flex justify-between mb-6 font-sans font-bold text-xl text-text-heading">
                  <span>Total</span>
                  <span className="price">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="btn-primary w-full py-4 text-lg clickable uppercase tracking-[0.1em]"
                >
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
