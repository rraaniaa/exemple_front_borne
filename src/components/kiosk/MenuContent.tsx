import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { products, promoProducts, categories } from '@/data/mockData';
import { ProductCard } from './ProductCard';
import { ProductDetail } from './ProductDetail';
import { Product } from '@/types/kiosk';

interface MenuContentProps {
  activeCategory: string;
}

export function MenuContent({ activeCategory }: MenuContentProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
          className="mb-6"
        >
          <div className="promo-banner p-6 flex items-center gap-6">
            <img
              src={promoProducts[0].image}
              alt={promoProducts[0].name}
              className="w-32 h-32 object-cover rounded-2xl shadow-strong"
            />
            <div className="flex-1 text-primary-foreground">
              <span className="inline-block bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full mb-2">
                OFFRE SPÉCIALE
              </span>
              <h3 className="text-2xl font-bold mb-1">{promoProducts[0].name}</h3>
              <p className="text-sm opacity-80 mb-2">{promoProducts[0].description}</p>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black">{promoProducts[0].promoPrice?.toFixed(2)} DH</span>
                <span className="text-lg line-through opacity-60">{promoProducts[0].price.toFixed(2)} DH</span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedProduct(promoProducts[0])}
              className="bg-primary-foreground text-primary font-bold px-8 py-4 rounded-xl"
            >
              COMMANDER
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Category Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">{activeCategoryName}</h2>
        <p className="text-muted-foreground">{filteredProducts.length} produit(s)</p>
      </div>

      {/* Products Grid */}
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
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
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="text-6xl mb-4">🍽️</span>
          <p className="text-xl font-semibold text-muted-foreground">
            Aucun produit dans cette catégorie
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
