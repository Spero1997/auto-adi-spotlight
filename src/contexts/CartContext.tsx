
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ImportedVehicle } from '@/utils/vehicleImportService';
import { toast } from 'sonner';

interface CartItem extends ImportedVehicle {}

interface CartContextType {
  items: CartItem[];
  addToCart: (vehicle: CartItem) => void;
  removeFromCart: (vehicleId: string) => void;
  clearCart: () => void;
  isInCart: (vehicleId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (vehicle: CartItem) => {
    if (!isInCart(vehicle.id)) {
      setItems([...items, vehicle]);
      toast.success('Véhicule ajouté au panier');
    } else {
      toast.error('Ce véhicule est déjà dans votre panier');
    }
  };

  const removeFromCart = (vehicleId: string) => {
    setItems(items.filter(item => item.id !== vehicleId));
    toast.success('Véhicule retiré du panier');
  };

  const clearCart = () => {
    setItems([]);
    toast.success('Panier vidé');
  };

  const isInCart = (vehicleId: string) => {
    return items.some(item => item.id === vehicleId);
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
