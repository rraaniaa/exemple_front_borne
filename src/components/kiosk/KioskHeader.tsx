import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { localeConfig } from '@/i18n/translations';
import { motion } from 'framer-motion';

interface KioskHeaderProps {
  onCartClick: () => void;
}

export function KioskHeader({ onCartClick }: KioskHeaderProps) {
  const { getItemCount, getTotal, state } = useCart();
  const { t, locale } = useLanguage();
  const itemCount = getItemCount();
  const total = getTotal();

  return (
    <header className="kiosk-header">
      {/* Logo */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div>
          <h1 className="text-sm sm:text-base md:text-xl font-black text-primary-foreground tracking-tight">
            FAST FOOD
          </h1>
          <p className="text-[10px] sm:text-xs text-primary-foreground/70 hidden xs:block">
            {state.orderType === 'dine-in' ? t.dineIn : t.takeaway}
          </p>
        </div>
      </div>

      {/* Center - Promo */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-3 sm:px-4 md:px-6 py-1 sm:py-2 rounded-full font-bold text-[10px] sm:text-xs md:text-sm shadow-accent hidden sm:block"
      >
        🎉 {t.featuredProduct}
      </motion.div>

      {/* Right - Language & Cart */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        <div className="items-center gap-2 text-primary-foreground/80 hidden md:flex">
          <span className="text-base">{localeConfig[locale].flag}</span>
          <span className="text-sm font-medium">{localeConfig[locale].short}</span>
        </div>

        <button
          onClick={onCartClick}
          className="relative flex items-center gap-1.5 sm:gap-2 md:gap-3 bg-primary-foreground/10 hover:bg-primary-foreground/20 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-colors"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
            {itemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-4 h-4 sm:w-5 sm:h-5 bg-accent text-accent-foreground text-[10px] sm:text-xs font-bold rounded-full flex items-center justify-center"
              >
                {itemCount}
              </motion.span>
            )}
          </div>
          {total > 0 && (
            <span className="text-primary-foreground font-bold text-xs sm:text-sm md:text-base">
              {total.toFixed(2)} DT
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
