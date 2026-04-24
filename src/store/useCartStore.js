import { create } from 'zustand'

export const useCartStore = create((set) => ({
  cart: [],
  isOpen: false,
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  addToCart: (product) => set((state) => {
    const existing = state.cart.find(item => item.id === product.id);
    if (existing) {
      return {
        cart: state.cart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
        isOpen: true
      }
    }
    return { cart: [...state.cart, { ...product, quantity: 1 }], isOpen: true }
  }),
  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter(item => item.id !== id)
  })),
  updateQuantity: (id, quantity) => set((state) => ({
    cart: state.cart.map(item => item.id === id ? { ...item, quantity } : item)
  })),
  clearCart: () => set({ cart: [] }),
}))
