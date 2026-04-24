export const categories = [
  { name: "Dogs", icon: "🐶" },
  { name: "Cats", icon: "🐱" },
  { name: "Grooming", icon: "✂️" },
  { name: "Eco Product", icon: "🌿" },
]

export const allProducts = [
  // DOGS (10)
  { id: 1, name: 'Tough-Chew Rubber Bone', price: 899, category: 'Dogs', image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=800&q=80', isBestSeller: true, rating: 4.9 },
  { id: 2, name: 'Memory Foam Orthopedic Bed', price: 6499, category: 'Dogs', image: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eca3?w=800&q=80', rating: 5.0, isBestSeller: true },
  { id: 3, name: 'Adjustable Padded Harness', price: 1450, category: 'Dogs', image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80', rating: 4.8 },
  { id: 4, name: 'Interactive Ball Launcher', price: 2999, category: 'Dogs', image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800&q=80', rating: 4.7 },
  { id: 5, name: 'Premium Puppy Kibble (5kg)', price: 3200, category: 'Dogs', image: 'https://images.unsplash.com/photo-1589924691106-31b01269389f?w=800&q=80', rating: 4.9 },
  { id: 6, name: 'Heavy-Duty Rope Leash', price: 799, category: 'Dogs', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80', rating: 4.6 },
  { id: 7, name: 'Ceramic Slow-Feeder Bowl', price: 1250, category: 'Dogs', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80', rating: 4.8 },
  { id: 8, name: 'Calming Lavender Treats', price: 550, category: 'Dogs', image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800&q=80', rating: 4.7 },
  { id: 9, name: 'Portable Water Bottle', price: 999, category: 'Dogs', image: 'https://images.unsplash.com/photo-1598133185258-257a6214620c?w=800&q=80', rating: 4.5 },
  { id: 10, name: 'Winter Padded Parka', price: 2499, category: 'Dogs', image: 'https://images.unsplash.com/photo-1601758174114-e711e5e6a2d5?w=800&q=80', rating: 4.9 },

  // CATS (10)
  { id: 11, name: 'Multi-Level Cat Tree', price: 8999, category: 'Cats', image: 'https://images.unsplash.com/photo-1601758174493-5b9f4b3e9e6c?w=800&q=80', isBestSeller: true, rating: 5.0 },
  { id: 12, name: 'Self-Cleaning Litter Box', price: 14500, category: 'Cats', image: 'https://images.unsplash.com/photo-1591768793355-74d7c5269784?w=800&q=80', rating: 4.9 },
  { id: 13, name: 'Organic Catnip Mice (3pk)', price: 450, category: 'Cats', image: 'https://images.unsplash.com/photo-1548546738-8509cb246ed3?w=800&q=80', rating: 4.8 },
  { id: 14, name: 'Grain-Free Salmon Pate', price: 150, category: 'Cats', image: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=800&q=80', rating: 4.7 },
  { id: 15, name: 'Felt Woolen Cat Cave', price: 3200, category: 'Cats', image: 'https://images.unsplash.com/photo-1601758174493-5b9f4b3e9e6c?w=800&q=80', isBestSeller: true, rating: 4.9 },
  { id: 16, name: 'Interactive Feather Wand', price: 350, category: 'Cats', image: 'https://images.unsplash.com/photo-1548546738-8509cb246ed3?w=800&q=80', rating: 4.6 },
  { id: 17, name: 'Ceramic Water Fountain', price: 4500, category: 'Cats', image: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=800&q=80', rating: 4.8 },
  { id: 18, name: 'Microfiber Grooming Mitt', price: 650, category: 'Cats', image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&q=80', rating: 4.5 },
  { id: 19, name: 'Cat Grass Growing Kit', price: 899, category: 'Cats', image: 'https://images.unsplash.com/photo-1589924691106-31b01269389f?w=800&q=80', rating: 4.7 },
  { id: 20, name: 'Velvet Breakaway Collar', price: 599, category: 'Cats', image: 'https://images.unsplash.com/photo-1598133185258-257a6214620c?w=800&q=80', rating: 4.9 },

  // GROOMING (10)
  { id: 21, name: 'Hypoallergenic Oatmeal Shampoo', price: 1150, category: 'Grooming', image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&q=80', isBestSeller: true, rating: 4.9 },
  { id: 22, name: 'Professional De-Shedding Tool', price: 1850, category: 'Grooming', image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&q=80', rating: 4.8 },
  { id: 23, name: 'Tear-Free Facial Wash', price: 750, category: 'Grooming', image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&q=80', rating: 4.7 },
  { id: 24, name: 'Ultra-Soft Bamboo Towel', price: 1250, category: 'Grooming', image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&q=80', isBestSeller: true, rating: 5.0 },
  { id: 25, name: 'Paw Balm & Protector', price: 899, category: 'Grooming', image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&q=80', rating: 4.8 },
  { id: 26, name: 'Electric Nail Grinder', price: 2999, category: 'Grooming', image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&q=80', rating: 4.6 },
  { id: 27, name: 'Conditioning Fur Spray', price: 950, category: 'Grooming', image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&q=80', rating: 4.7 },
  { id: 28, name: 'Dual-Sided Slicker Brush', price: 1100, category: 'Grooming', image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&q=80', rating: 4.9 },
  { id: 29, name: 'Dental Care Kit', price: 1450, category: 'Grooming', image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&q=80', rating: 4.5 },
  { id: 30, name: 'Tick & Flea Defense Shampoo', price: 1350, category: 'Grooming', image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&q=80', rating: 4.8 },

  // ECO PRODUCT (10)
  { id: 31, name: 'Bamboo-Fiber Feeding Bowl', price: 999, category: 'Eco Product', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80', isBestSeller: true, rating: 4.9 },
  { id: 32, name: 'Compostable Poop Bags (120pk)', price: 750, category: 'Eco Product', image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80', rating: 5.0 },
  { id: 33, name: 'Hemp Rope Tug Toy', price: 1100, category: 'Eco Product', image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=800&q=80', rating: 4.8 },
  { id: 34, name: 'Recycled Plastic Bottle Bed', price: 5500, category: 'Eco Product', image: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eca3?w=800&q=80', isBestSeller: true, rating: 4.9 },
  { id: 35, name: 'Organic Cotton Scarf', price: 850, category: 'Eco Product', image: 'https://images.unsplash.com/photo-1601758174114-e711e5e6a2d5?w=800&q=80', rating: 4.7 },
  { id: 36, name: 'Biodegradable Litter Pellets', price: 1450, category: 'Eco Product', image: 'https://images.unsplash.com/photo-1591768793355-74d7c5269784?w=800&q=80', rating: 4.8 },
  { id: 37, name: 'Natural Rubber Chew Ring', price: 1200, category: 'Eco Product', image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=800&q=80', rating: 4.6 },
  { id: 38, name: 'Vegan Leather Collar', price: 1850, category: 'Eco Product', image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80', rating: 4.9 },
  { id: 39, name: 'Soy-Based Grooming Wipes', price: 650, category: 'Eco Product', image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&q=80', rating: 4.7 },
  { id: 40, name: 'Organic Beeswax Paw Wax', price: 950, category: 'Eco Product', image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&q=80', rating: 4.8 }
]
