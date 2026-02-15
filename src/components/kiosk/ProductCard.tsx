import { motion } from 'framer-motion';
import { Product } from '@/types/kiosk';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const displayPrice = product.isPromo && product.promoPrice 
    ? product.promoPrice 
    : product.price;
  const originalPrice = product.isPromo ? product.price : null;

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(product)}
      className="product-card relative text-left w-full"
      disabled={!product.isAvailable}
    >
      {/* Promo Badge */}
      {product.isPromo && (
        <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 z-10 bg-primary text-primary-foreground text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-primary">
          PROMO
        </div>
      )}

      {/* Not Available Overlay */}
      {!product.isAvailable && (
        <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-20 rounded-2xl">
          <span className="text-muted-foreground font-semibold">Indisponible</span>
        </div>
      )}

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary/50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="p-2 sm:p-3">
        <h3 className="font-semibold text-foreground text-xs sm:text-sm leading-tight mb-0.5 sm:mb-1 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mt-1 sm:mt-2">
          <div className="flex items-baseline gap-1 sm:gap-2">
            <span className="text-primary font-bold text-sm sm:text-base md:text-lg">
              {displayPrice.toFixed(2)} DT
            </span>
            {originalPrice && (
              <span className="text-muted-foreground text-[10px] sm:text-xs line-through">
                {originalPrice.toFixed(2)} DT
              </span>
            )}
          </div>
          <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-primary flex items-center justify-center shadow-primary">
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary-foreground" />
          </div>
        </div>
      </div>
    </motion.button>
  );
}
