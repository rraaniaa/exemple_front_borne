import { motion } from 'framer-motion';
import { Product } from '@/types/kiosk';
import { Sparkles } from 'lucide-react';

interface ProductRecommendationsProps {
  title: string;
  products: Product[];
  onProductSelect: (product: Product) => void;
}

export function ProductRecommendations({ title, products, onProductSelect }: ProductRecommendationsProps) {
  if (products.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl p-4 border border-accent/20"
    >
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-accent" />
        <h4 className="font-semibold text-sm text-foreground">{title}</h4>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {products.map((product) => (
          <motion.button
            key={product.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onProductSelect(product)}
            className="flex-shrink-0 bg-card rounded-xl p-3 shadow-soft flex items-center gap-3 min-w-[180px]"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-12 h-12 object-cover rounded-lg"
            />
            <div className="text-left">
              <p className="font-medium text-sm text-foreground line-clamp-1">{product.name}</p>
              <p className="text-primary font-bold text-sm">
                +{(product.isPromo && product.promoPrice ? product.promoPrice : product.price).toFixed(2)} DH
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
