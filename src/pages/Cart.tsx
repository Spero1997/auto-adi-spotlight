
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Trash2, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { items, removeFromCart, clearCart } = useCart();
  const { translate } = useLanguage();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const total = items.reduce((sum, item) => sum + (item.price || 0), 0);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-light mb-8">
          {translate('cart', { FR: 'Panier', EN: 'Cart', ES: 'Carrito', IT: 'Carrello', PT: 'Carrinho', RO: 'Coș' })}
        </h1>
        <div className="text-center py-16">
          <p className="text-xl text-gray-600 mb-8">
            {translate('emptyCart', {
              FR: 'Votre panier est vide',
              EN: 'Your cart is empty',
              ES: 'Tu carrito está vacío',
              IT: 'Il tuo carrello è vuoto',
              PT: 'Seu carrinho está vazio',
              RO: 'Coșul tău este gol'
            })}
          </p>
          <Link to="/vehicules">
            <Button>
              {translate('browseVehicles', {
                FR: 'Découvrir nos véhicules',
                EN: 'Browse our vehicles',
                ES: 'Explorar nuestros vehículos',
                IT: 'Sfoglia i nostri veicoli',
                PT: 'Explorar nossos veículos',
                RO: 'Explorează vehiculele noastre'
              })}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-light">
          {translate('cart', { FR: 'Panier', EN: 'Cart', ES: 'Carrito', IT: 'Carrello', PT: 'Carrinho', RO: 'Coș' })}
        </h1>
        <Button variant="destructive" onClick={clearCart}>
          {translate('clearCart', {
            FR: 'Vider le panier',
            EN: 'Clear cart',
            ES: 'Vaciar carrito',
            IT: 'Svuota carrello',
            PT: 'Limpar carrinho',
            RO: 'Golește coșul'
          })}
        </Button>
      </div>

      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
            <img 
              src={item.image} 
              alt={`${item.brand} ${item.model}`} 
              className="w-32 h-24 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="text-xl font-medium">{item.brand} {item.model}</h3>
              <p className="text-gray-600">{item.year}</p>
              <p className="text-lg font-semibold">{formatPrice(item.price || 0)}</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => removeFromCart(item.id)}
            >
              <Trash2 className="h-5 w-5 text-red-500" />
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center text-xl font-semibold">
          <span>Total:</span>
          <span>{formatPrice(total)}</span>
        </div>
        <div className="mt-4 flex justify-end">
          {/* Fixing the path to ensure it redirects to the proper vehicle details page */}
          {items.length === 1 && (
            <Link to={`/vehicule/${items[0].id}`} className="inline-block">
              <Button className="bg-brand-blue hover:bg-brand-darkBlue transition-colors flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                {translate('buyVehicle', {
                  FR: 'Acheter ce véhicule',
                  EN: 'Buy this vehicle',
                  ES: 'Comprar este vehículo',
                  IT: 'Acquista questo veicolo',
                  PT: 'Comprar este veículo',
                  RO: 'Cumpără acest vehicul'
                })}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
