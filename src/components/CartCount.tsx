
import React from 'react';
import { useCart } from '@/contexts/CartContext';

const CartCount = () => {
  const { items } = useCart();
  
  if (items.length === 0) return null;

  return (
    <div className="absolute -top-2 -right-2 bg-brand-gold text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
      {items.length}
    </div>
  );
};

export default CartCount;
