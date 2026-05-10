"use client";
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  image: string | null;
  description: string;
}

interface CartItem extends Product {
  qty: number;
}

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  checkout: () => { success: boolean; message?: string };
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  cartCount: number;
  cartTotal: number;
  mounted: boolean;
}

const StoreContext = createContext<StoreContextType | null>(null);

const DEFAULT_PRODUCTS = [
  { id: "1", name: "Concealer", price: 8500, stock: 10, category: "Face", image: "/products/foundation.png", description: "Lightweight, buildable coverage that blends seamlessly." },
  { id: "2", name: "Compact Powder", price: 12000, stock: 8, category: "Face", image: "/products/compact-powder.png", description: "Finely milled powder for a flawless, matte finish." },
    { id: "3", name: "Foundation", price: 15000, stock: 7, category: "Face", image: "/products/foundation.png", description: "Buildable, breathable coverage with SPF 20." },

  { id: "4", name: "Eyeliner", price: 8000, stock: 15, category: "Eyes", image: "/products/eyeliner.png", description: "Precision tip for sharp, long-lasting lines." },
  { id: "5", name: "Mascara", price: 7000, stock: 20, category: "Eyes", image: "/products/mascara.png", description: "Volumizing formula for dramatic, full lashes." },
  { id: "6", name: "Lip Balm", price: 5000, stock: 25, category: "Lips", image: "/products/lip-balm.png", description: "Nourishing tint with a satin finish." },
  { id: "7", name: "Eyeshadow Palette", price: 17000, stock: 6, category: "Eyes", image: "/products/eyeshadow.png", description: "12 curated shades from nude to smoky." },
  { id: "8", name: "Blush", price: 7000, stock: 18, category: "Cheeks", image: "/products/blush.png", description: "Silky powder blush with a natural radiance." },
  { id: "9", name: "Setting Mist", price: 6000, stock: 14, category: "Face", image: "/products/setting.png", description: "Lightweight mist to lock in your look." },
  { id: "10", name: "Lip Stick", price: 10000, stock: 16, category: "Lips", image: "/products/lipstick.png", description: "Rich pigment in a comfortable satin formula." },
  { id: "11", name: "Primer", price: 7000, stock: 11, category: "Face", image: "/products/primer.png", description: "Pore-minimizing base for extended wear." },
  { id: "12", name: "Lip Gloss", price: 11000, stock: 9, category: "Lips", image: "/products/lip-gloss.png", description: "High-shine, non-sticky formula with a plumping effect." },
    { id: "13", name: "Cream Blush", price: 9000, stock: 12, category: "Cheeks", image: "/products/cream-blush.png", description: "Dewy, natural flush in a smooth cream formula." },

];

export default function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("noire_cart");
      setCart(storedCart ? JSON.parse(storedCart) : []);
    } catch {
      setCart([]);
    }
    setMounted(true);
  }, []);

  // Update localStorage only for cart
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("noire_cart", JSON.stringify(cart));
    }
  }, [cart, mounted]);

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        const prod = products.find((p) => p.id === product.id);
        if (prod && existing.qty >= prod.stock) return prev;
        return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...(product as CartItem), qty: 1 }];
    });
    setCartOpen(true);
  }, [products]);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty <= 0) { removeFromCart(id); return; }
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, qty } : i));
  }, [removeFromCart]);

  const clearCart = useCallback(() => setCart([]), []);

  const checkout = useCallback(() => {
    // Verify stock and decrement
    let canCheckout = false;
    const updatedProducts = products.map((p) => {
      const cartItem = cart.find((c) => c.id === p.id);
      if (cartItem && p.stock >= cartItem.qty) {
        canCheckout = true;
        return { ...p, stock: p.stock - cartItem.qty };
      }
      return p;
    });
    if (canCheckout) {
      setProducts(updatedProducts);
      clearCart();
      return { success: true };
    }
    return { success: false, message: "Some items are out of stock." };
  }, [products, cart, clearCart]);

  const addProduct = useCallback((product: Omit<Product, 'id'>) => {
    const newProduct: Product = { ...product, id: Date.now().toString() };
    setProducts((prev) => [...prev, newProduct]);
    return newProduct;
  }, []);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, ...updates } : p));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <StoreContext.Provider value={{
      products, cart, cartOpen, setCartOpen,
      addToCart, removeFromCart, updateQty, clearCart, checkout,
      addProduct, updateProduct, deleteProduct,
      cartCount, cartTotal, mounted,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore(): StoreContextType {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
