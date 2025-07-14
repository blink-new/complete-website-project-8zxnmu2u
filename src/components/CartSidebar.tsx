import React, { useState } from 'react';
import { useCart } from '../hooks/use-cart';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  X, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Trash2, 
  Tag,
  CreditCard,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CartSidebar = () => {
  const { 
    state, 
    removeItem, 
    updateQuantity, 
    toggleCart, 
    applyPromoCode, 
    removePromoCode 
  } = useCart();
  
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return;
    
    const success = applyPromoCode(promoInput.trim());
    if (success) {
      setPromoInput('');
      setPromoError('');
    } else {
      setPromoError('Code promo invalide ou conditions non remplies');
    }
  };

  const handleRemovePromo = () => {
    removePromoCode();
    setPromoError('');
  };

  if (!state.isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={toggleCart}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-semibold">Panier</h2>
            {state.items.length > 0 && (
              <Badge className="bg-purple-100 text-purple-600">
                {state.items.reduce((sum, item) => sum + item.quantity, 0)}
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={toggleCart}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Votre panier est vide
              </h3>
              <p className="text-gray-500 mb-6">
                Découvrez nos produits et ajoutez-les à votre panier
              </p>
              <Link to="/shop" onClick={toggleCart}>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Voir la boutique
                </Button>
              </Link>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {/* Items */}
              {state.items.map((item) => (
                <div key={item.product.id} className="flex space-x-4 p-4 border border-gray-200 rounded-lg">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-sm text-gray-500 mb-2">
                      {item.product.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-8 h-8 p-0"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-8 h-8 p-0"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-purple-600">
                      {(item.product.price * item.quantity).toFixed(2)}€
                    </div>
                    {item.product.oldPrice && (
                      <div className="text-xs text-gray-500 line-through">
                        {(item.product.oldPrice * item.quantity).toFixed(2)}€
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Promo Code */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Tag className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Code promo</span>
                </div>
                
                {state.appliedPromo ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div>
                      <div className="font-medium text-green-800">
                        {state.appliedPromo.code}
                      </div>
                      <div className="text-sm text-green-600">
                        -{state.appliedPromo.type === 'percentage' 
                          ? `${state.appliedPromo.discount}%` 
                          : `${state.appliedPromo.discount}€`}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRemovePromo}
                      className="text-green-700 hover:text-green-800"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Entrez votre code"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleApplyPromo()}
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        onClick={handleApplyPromo}
                        disabled={!promoInput.trim()}
                      >
                        Appliquer
                      </Button>
                    </div>
                    {promoError && (
                      <p className="text-sm text-red-500">{promoError}</p>
                    )}
                    <div className="text-xs text-gray-500">
                      Codes disponibles : WELCOME20, SAVE50, FIRST30, BUNDLE15
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4">
            {/* Totals */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Sous-total</span>
                <span>{state.subtotal.toFixed(2)}€</span>
              </div>
              
              {state.discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Réduction</span>
                  <span>-{state.discount.toFixed(2)}€</span>
                </div>
              )}
              
              <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-2">
                <span>Total</span>
                <span className="text-purple-600">{state.total.toFixed(2)}€</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Link to="/checkout" onClick={toggleCart}>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Procéder au paiement
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/shop" onClick={toggleCart}>
                <Button variant="outline" className="w-full">
                  Continuer mes achats
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;