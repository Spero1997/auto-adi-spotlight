
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ImportedVehicle } from '@/utils/vehicleImportService';
import { toast } from 'sonner';
import { useLanguage } from './LanguageContext';

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
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });
  
  const { translate } = useLanguage();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items]);

  const addToCart = (vehicle: CartItem) => {
    if (!isInCart(vehicle.id)) {
      setItems([...items, vehicle]);
      toast.success(
        translate('vehicleAddedToCart', {
          FR: 'Véhicule ajouté au panier',
          EN: 'Vehicle added to cart',
          ES: 'Vehículo añadido al carrito',
          IT: 'Veicolo aggiunto al carrello',
          PT: 'Veículo adicionado ao carrinho',
          RO: 'Vehicul adăugat în coș'
        })
      );
    } else {
      toast.error(
        translate('vehicleAlreadyInCart', {
          FR: 'Ce véhicule est déjà dans votre panier',
          EN: 'This vehicle is already in your cart',
          ES: 'Este vehículo ya está en su carrito',
          IT: 'Questo veicolo è già nel tuo carrello',
          PT: 'Este veículo já está no seu carrinho',
          RO: 'Acest vehicul este deja în coșul tău'
        })
      );
    }
  };

  const removeFromCart = (vehicleId: string) => {
    setItems(items.filter(item => item.id !== vehicleId));
    toast.success(
      translate('vehicleRemovedFromCart', {
        FR: 'Véhicule retiré du panier',
        EN: 'Vehicle removed from cart',
        ES: 'Vehículo eliminado del carrito',
        IT: 'Veicolo rimosso dal carrello',
        PT: 'Veículo removido do carrinho',
        RO: 'Vehicul eliminat din coș'
      })
    );
  };

  const clearCart = () => {
    setItems([]);
    toast.success(
      translate('cartCleared', {
        FR: 'Panier vidé',
        EN: 'Cart cleared',
        ES: 'Carrito vaciado',
        IT: 'Carrello svuotato',
        PT: 'Carrinho esvaziado',
        RO: 'Coș golit'
      })
    );
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
