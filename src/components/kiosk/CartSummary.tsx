import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useRecommendations } from '@/hooks/useRecommendations';
import { Minus, Plus, Trash2, ShoppingBag, Sparkles } from 'lucide-react';
import { Product } from '@/types/kiosk';
import { ProductRecommendations } from './ProductRecommendations';

interface CartSummaryProps {
  onCheckout: () => void;
  onCancel: () => void;
  onProductSelect?: (product: Product) => void;
}

export function CartSummary({ onCheckout, onCancel, onProductSelect }: CartSummaryProps) {
  const { state, getTotal, getItemCount } = useCart();
  const total = getTotal();
  const itemCount = getItemCount();

  return (
    <div className="kiosk-footer">
      {/* Cart Summary */}
      <div className="flex items-center gap-4 flex-1">
        <div className="relative">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
            <ShoppingBag className="w-7 h-7 text-primary" />
          </div>
          {itemCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center"
            >
              {itemCount}
            </motion.div>
          )}
        </div>
        
        <div className="flex-1">
          {state.items.length === 0 ? (
            <p className="text-muted-foreground">Votre panier est vide</p>
          ) : (
            <div className="flex flex-wrap gap-1 max-w-lg">
              {state.items.slice(0, 3).map((item) => (
                <span key={item.id} className="text-sm text-foreground">
                  {item.quantity}x {item.product.name}
                  {state.items.indexOf(item) < Math.min(state.items.length - 1, 2) && ', '}
                </span>
              ))}
              {state.items.length > 3 && (
                <span className="text-sm text-muted-foreground">
                  +{state.items.length - 3} autres
                </span>
              )}
            </div>
          )}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-muted-foreground">
              {state.orderType === 'dine-in' ? '🍽️ Sur place' : '🥡 À emporter'}
            </span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-2xl font-bold text-primary">{total.toFixed(2)} DH</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 ml-6">
        <button
          onClick={onCancel}
          className="btn-kiosk-secondary px-6"
        >
          ANNULER
        </button>
        <button
          onClick={onCheckout}
          disabled={state.items.length === 0}
          className="btn-kiosk-success px-8 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          COMMANDER
        </button>
      </div>
    </div>
  );
}

export function CartPanel({ 
  isOpen, 
  onClose,
  onProductSelect 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  onProductSelect?: (product: Product) => void;
}) {
  const { state, removeItem, updateQuantity, getTotal } = useCart();
  const { getCartRecommendations } = useRecommendations();
  
  const recommendations = getCartRecommendations(state.items, 4);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/30 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-96 bg-card shadow-strong z-50 flex flex-col"
          >
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">Votre Panier</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {state.items.length} article(s)
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {state.items.map((item) => {
                const price = item.product.isPromo && item.product.promoPrice
                  ? item.product.promoPrice
                  : item.product.price;
                const extrasTotal = item.selectedExtras.reduce((sum, extraId) => {
                  const extra = item.product.extras?.find(e => e.id === extraId);
                  return sum + (extra?.price || 0);
                }, 0);

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="bg-secondary/50 rounded-xl p-3 flex gap-3"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{item.product.name}</h4>
                      {item.excludedIngredients.length > 0 && (
                        <p className="text-xs text-destructive">
                          Sans: {item.excludedIngredients.map(id =>
                            item.product.ingredients.find(i => i.id === id)?.name
                          ).join(', ')}
                        </p>
                      )}
                      {item.selectedExtras.length > 0 && (
                        <p className="text-xs text-success">
                          +{item.selectedExtras.map(id =>
                            item.product.extras?.find(e => e.id === id)?.name
                          ).join(', ')}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-full bg-card flex items-center justify-center"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-semibold text-sm w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-full bg-card flex items-center justify-center"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-bold text-primary">
                          {((price + extrasTotal) * item.quantity).toFixed(2)} DH
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="self-start p-2 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                );
              })}
              
              {/* AI Recommendations in Cart */}
              {recommendations.length > 0 && onProductSelect && state.items.length > 0 && (
                <div className="pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <h4 className="font-semibold text-sm text-foreground">Ajoutez aussi...</h4>
                  </div>
                  <div className="space-y-2">
                    {recommendations.slice(0, 3).map((product) => (
                      <motion.button
                        key={product.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          onClose();
                          setTimeout(() => onProductSelect(product), 300);
                        }}
                        className="w-full bg-accent/10 border border-accent/20 rounded-xl p-3 flex items-center gap-3"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded-lg"
                        />
                        <div className="flex-1 text-left">
                          <p className="font-medium text-sm">{product.name}</p>
                        </div>
                        <span className="text-primary font-bold text-sm">
                          +{(product.isPromo && product.promoPrice ? product.promoPrice : product.price).toFixed(2)} DH
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-border">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-bold text-primary">{getTotal().toFixed(2)} DH</span>
              </div>
              <button onClick={onClose} className="w-full btn-kiosk-secondary">
                Fermer
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
