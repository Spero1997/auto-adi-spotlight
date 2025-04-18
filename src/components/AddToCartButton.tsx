
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ImportedVehicle } from '@/utils/vehicleImportService';

interface AddToCartButtonProps {
  vehicle: ImportedVehicle;
}

const AddToCartButton = ({ vehicle }: AddToCartButtonProps) => {
  const { addToCart, isInCart } = useCart();
  const { translate } = useLanguage();

  return (
    <Button
      onClick={() => addToCart(vehicle)}
      disabled={isInCart(vehicle.id)}
      className="w-full sm:w-auto flex items-center gap-2"
    >
      <ShoppingCart className="w-5 h-5" />
      {isInCart(vehicle.id) 
        ? translate('inCart', {
            FR: 'Déjà dans le panier',
            EN: 'In cart',
            ES: 'En el carrito',
            IT: 'Nel carrello',
            PT: 'No carrinho',
            RO: 'În coș'
          })
        : translate('addToCart', {
            FR: 'Ajouter au panier',
            EN: 'Add to cart',
            ES: 'Añadir al carrito',
            IT: 'Aggiungi al carrello',
            PT: 'Adicionar ao carrinho',
            RO: 'Adaugă în coș'
          })
      }
    </Button>
  );
};

export default AddToCartButton;
