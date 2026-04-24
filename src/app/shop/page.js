"use client"
import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Filter, ChevronDown, Star, X, Search, SlidersHorizontal } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ProductCard from "@/components/ProductCard"
import { categories, allProducts } from "@/data/products"
import AnnouncementBar from "@/components/AnnouncementBar"

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("featured")
  const [priceRange, setPriceRange] = useState([0, 20000])
  const [minRating, setMinRating] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    return allProducts
      .filter(p => {
        const matchesCategory = selectedCategory === "All" || p.category === selectedCategory
        const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1]
        const matchesRating = (p.rating || 4.5) >= minRating
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesPrice && matchesRating && matchesSearch
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price
        if (sortBy === "price-high") return b.price - a.price
        if (sortBy === "rating") return (b.rating || 4.5) - (a.rating || 4.5)
        return 0 // featured/default
      })
  }, [selectedCategory, sortBy, priceRange, minRating, searchQuery])

  return (
    <main className="bg-bg min-h-screen">
      <AnnouncementBar />
      <Header />
      
      {/* Shop Hero Header */}
      <div className="bg-surface py-16 md:py-24 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-bold text-espresso mb-6"
          >
            The Full Collection 🐾
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-muted max-w-2xl mx-auto font-jakarta"
          >
            Explore our complete range of premium pet essentials, curated for comfort and crafted with love.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex items-center justify-between mb-6">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center gap-2 bg-espresso text-white px-6 py-3 rounded-full font-nunito font-bold text-sm shadow-lg clickable"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
            <div className="text-sm font-nunito font-bold text-text-muted">
              {filteredProducts.length} Products Found
            </div>
          </div>

          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-72 shrink-0 space-y-10">
            {/* Categories */}
            <div>
              <h3 className="text-lg font-serif font-bold text-espresso mb-6">Categories</h3>
              <div className="space-y-3">
                {["All", ...categories.map(c => c.name)].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`block w-full text-left px-4 py-2 rounded-xl transition-all font-nunito font-bold ${
                      selectedCategory === cat 
                      ? "bg-terracotta text-white shadow-md" 
                      : "text-espresso/60 hover:bg-espresso/5 hover:text-espresso"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-lg font-serif font-bold text-espresso mb-6">Price Range</h3>
              <div className="px-2">
                <input 
                  type="range" 
                  min="0" 
                  max="20000" 
                  step="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-terracotta"
                />
                <div className="flex justify-between mt-4 text-sm font-nunito font-bold text-espresso">
                  <span>₹0</span>
                  <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Minimum Rating */}
            <div>
              <h3 className="text-lg font-serif font-bold text-espresso mb-6">Minimum Rating</h3>
              <div className="space-y-3">
                {[4, 3, 2].map(star => (
                  <button
                    key={star}
                    onClick={() => setMinRating(star)}
                    className={`flex items-center gap-2 w-full px-4 py-2 rounded-xl transition-all font-nunito font-bold ${
                      minRating === star 
                      ? "bg-butter text-espresso shadow-md" 
                      : "text-espresso/60 hover:bg-espresso/5 hover:text-espresso"
                    }`}
                  >
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < star ? "fill-espresso" : "text-espresso/20"}`} />
                      ))}
                    </div>
                    <span>{star}+ Stars</span>
                  </button>
                ))}
                <button 
                  onClick={() => setMinRating(0)}
                  className={`block w-full text-left px-4 py-2 rounded-xl transition-all font-nunito font-bold ${
                    minRating === 0 ? "text-terracotta" : "text-espresso/40 hover:text-espresso"
                  }`}
                >
                  Clear Rating
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Top Bar - Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input 
                  type="text" 
                  placeholder="Search in collection..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface border border-border rounded-full py-3 pl-12 pr-6 outline-none focus:border-terracotta focus:ring-4 focus:ring-terracotta/10 transition-all font-jakarta text-sm"
                />
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm font-nunito font-bold text-text-muted hidden md:block">Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-surface border border-border rounded-xl px-4 py-3 outline-none focus:border-terracotta transition-all font-nunito font-bold text-sm clickable"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-32 bg-surface rounded-[40px] border border-border border-dashed">
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-2xl font-serif font-bold text-espresso mb-2">No matching essentials</h3>
                <p className="text-text-muted font-jakarta">Try adjusting your filters or search terms.</p>
                <button 
                  onClick={() => {
                    setSelectedCategory("All");
                    setPriceRange([0, 20000]);
                    setMinRating(0);
                    setSearchQuery("");
                  }}
                  className="mt-8 text-terracotta font-nunito font-black hover:underline underline-offset-4 clickable"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-espresso/40 backdrop-blur-sm z-[2000] lg:hidden"
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-full max-w-[300px] bg-bg z-[2100] shadow-2xl p-8 overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-serif text-espresso">Filters</h2>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-espresso/5 rounded-full">
                  <X className="w-6 h-6 text-espresso" />
                </button>
              </div>

              {/* Mobile Sidebar Content - Reused logic */}
              <div className="space-y-10 pb-10">
                <div>
                  <h3 className="text-lg font-serif font-bold text-espresso mb-6">Categories</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {["All", ...categories.map(c => c.name)].map(cat => (
                      <button
                        key={cat}
                        onClick={() => { setSelectedCategory(cat); setIsSidebarOpen(false); }}
                        className={`block w-full text-left px-4 py-3 rounded-xl font-nunito font-bold ${
                          selectedCategory === cat ? "bg-terracotta text-white" : "bg-surface border border-border text-espresso/60"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-serif font-bold text-espresso mb-6">Price Range</h3>
                  <input 
                    type="range" min="0" max="20000" step="500" value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-terracotta"
                  />
                  <div className="flex justify-between mt-4 text-sm font-nunito font-bold text-espresso">
                    <span>₹0</span>
                    <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-serif font-bold text-espresso mb-6">Minimum Rating</h3>
                  <div className="space-y-3">
                    {[4, 3, 2].map(star => (
                      <button
                        key={star}
                        onClick={() => { setMinRating(star); setIsSidebarOpen(false); }}
                        className={`flex items-center gap-2 w-full px-4 py-3 rounded-xl transition-all font-nunito font-bold border border-border ${
                          minRating === star ? "bg-butter text-espresso" : "bg-surface text-espresso/60"
                        }`}
                      >
                        <Star className="w-4 h-4 fill-current" />
                        <span>{star}+ Stars</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setSelectedCategory("All"); setPriceRange([0, 20000]); setMinRating(0); setSearchQuery(""); setIsSidebarOpen(false);
                  }}
                  className="w-full py-4 bg-espresso text-white rounded-2xl font-nunito font-bold mt-8 shadow-lg"
                >
                  Clear All Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  )
}
