import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { products, promoProducts, categories } from '@/data/mockData';
import { ProductCard } from './ProductCard';
import { ProductDetail } from './ProductDetail';
import { Product } from '@/types/kiosk';
import { useLanguage } from '@/context/LanguageContext';

interface MenuContentProps {
  activeCategory: string;
}

export function MenuContent({ activeCategory }: MenuContentProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { t } = useLanguage();

  const filteredProducts = products.filter(p => p.categoryId === activeCategory);
  const activeCategoryName = categories.find(c => c.id === activeCategory)?.name || '';

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="kiosk-content">
      {/* Promo Banner */}
      {activeCategory === 'burgers' && promoProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 sm:mb-6"
        >
          <div className="promo-banner p-3 sm:p-4 md:p-6 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-6">
            <img
              src={promoProducts[0].image}
              alt={promoProducts[0].name}
              className="w-full sm:w-24 md:w-32 h-32 sm:h-24 md:h-32 object-cover rounded-xl sm:rounded-2xl shadow-strong"
            />
            <div className="flex-1 text-primary-foreground text-center sm:text-left">
              <span className="inline-block bg-accent text-accent-foreground text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full mb-1 sm:mb-2">
                {t.specialOffer}
              </span>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1">{promoProducts[0].name}</h3>
              <p className="text-xs sm:text-sm opacity-80 mb-1 sm:mb-2 line-clamp-2">{promoProducts[0].description}</p>
              <div className="flex items-baseline gap-2 sm:gap-3 justify-center sm:justify-start">
                <span className="text-xl sm:text-2xl md:text-3xl font-black">{promoProducts[0].promoPrice?.toFixed(2)} DT</span>
                <span className="text-sm sm:text-base md:text-lg line-through opacity-60">{promoProducts[0].price.toFixed(2)} DT</span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedProduct(promoProducts[0])}
              className="bg-primary-foreground text-primary font-bold px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-xl text-sm sm:text-base w-full sm:w-auto"
            >
              {t.order}
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Category Title */}
      <div className="mb-3 sm:mb-4 md:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">{activeCategoryName}</h2>
        <p className="text-muted-foreground text-xs sm:text-sm">{filteredProducts.length} {t.products}</p>
      </div>

      {/* Products Grid */}
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4"
      >
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <ProductCard product={product} onSelect={setSelectedProduct} />
          </motion.div>
        ))}
      </motion.div>

      {filteredProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10 sm:py-16 md:py-20 text-center">
          <span className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">🍽️</span>
          <p className="text-base sm:text-lg md:text-xl font-semibold text-muted-foreground">
            {t.noProductsInCategory}
          </p>
        </div>
      )}

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onProductSelect={handleProductSelect}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
