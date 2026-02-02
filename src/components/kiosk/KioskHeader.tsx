import { Globe, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

interface KioskHeaderProps {
  onCartClick: () => void;
}

export function KioskHeader({ onCartClick }: KioskHeaderProps) {
  const { getItemCount, getTotal, state } = useCart();
  const itemCount = getItemCount();
  const total = getTotal();

  return (
    <header className="kiosk-header">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
          <span className="text-2xl">🍔</span>
        </div>
        <div>
          <h1 className="text-xl font-black text-primary-foreground tracking-tight">
            FAST FOOD
          </h1>
          <p className="text-xs text-primary-foreground/70">
            {state.orderType === 'dine-in' ? '🍽️ Sur place' : '🥡 À emporter'}
          </p>
        </div>
      </div>

      {/* Center - Promo */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-6 py-2 rounded-full font-bold text-sm shadow-accent"
      >
        🎉 PRODUIT DU MOMENT !
      </motion.div>

      {/* Right - Language & Cart */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
          <Globe className="w-5 h-5" />
          <span className="text-sm font-medium">FR</span>
        </button>

        <button
          onClick={onCartClick}
          className="relative flex items-center gap-3 bg-primary-foreground/10 hover:bg-primary-foreground/20 px-4 py-2 rounded-xl transition-colors"
        >
          <div className="relative">
            <ShoppingBag className="w-6 h-6 text-primary-foreground" />
            {itemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center"
              >
                {itemCount}
              </motion.span>
            )}
          </div>
          {total > 0 && (
            <span className="text-primary-foreground font-bold">
              {total.toFixed(2)} DH
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
