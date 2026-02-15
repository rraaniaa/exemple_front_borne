import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, Ingredient } from '@/types/kiosk';
import { X, Check, Minus, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { useRecommendations } from '@/hooks/useRecommendations';
import { ProductRecommendations } from './ProductRecommendations';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onProductSelect?: (product: Product) => void;
}

export function ProductDetail({ product, onClose, onProductSelect }: ProductDetailProps) {
  const { addItem } = useCart();
  const { t } = useLanguage();
  const { getProductRecommendations } = useRecommendations();
  const [excludedIngredients, setExcludedIngredients] = useState<string[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [ingredientPage, setIngredientPage] = useState(0);
  
  const recommendations = getProductRecommendations(product, 4);

  const removableIngredients = product.ingredients.filter(i => i.removable);
  const ingredientsPerPage = 4;
  const totalIngredientPages = Math.ceil(removableIngredients.length / ingredientsPerPage);
  const visibleIngredients = removableIngredients.slice(
    ingredientPage * ingredientsPerPage,
    (ingredientPage + 1) * ingredientsPerPage
  );

  const toggleIngredient = (ingredientId: string) => {
    setExcludedIngredients(prev =>
      prev.includes(ingredientId)
        ? prev.filter(id => id !== ingredientId)
        : [...prev, ingredientId]
    );
  };

  const toggleExtra = (extraId: string) => {
    setSelectedExtras(prev =>
      prev.includes(extraId)
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    );
  };

  const displayPrice = product.isPromo && product.promoPrice 
    ? product.promoPrice 
    : product.price;

  const extrasTotal = selectedExtras.reduce((sum, extraId) => {
    const extra = product.extras?.find(e => e.id === extraId);
    return sum + (extra?.price || 0);
  }, 0);

  const totalPrice = (displayPrice + extrasTotal) * quantity;

  const handleAddToCart = () => {
    addItem(product, excludedIngredients, selectedExtras);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-foreground/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-card rounded-3xl shadow-strong w-full sm:max-w-lg md:max-w-2xl max-h-[92dvh] sm:max-h-[90dvh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Image - shrinkable */}
        <div className="relative flex-shrink-0">
          <div className="h-[25vh] sm:h-[28vh] md:h-[32vh] bg-secondary overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-card rounded-full flex items-center justify-center shadow-medium"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
          </button>
          {product.isPromo && (
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-primary text-primary-foreground text-xs sm:text-sm font-bold px-3 sm:px-4 py-1 sm:py-2 rounded-full shadow-primary">
              PROMO
            </div>
          )}
        </div>

        {/* Content - scrollable, takes remaining space */}
        <div className="p-4 sm:p-5 md:p-6 overflow-y-auto flex-1 min-h-0">
          {/* Product Info */}
          <div className="mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-1 sm:mb-2">{product.name}</h2>
            <p className="text-muted-foreground text-xs sm:text-sm">{product.description}</p>
            <div className="flex items-baseline gap-2 sm:gap-3 mt-2 sm:mt-3">
              <span className="text-xl sm:text-2xl font-bold text-primary">
                {displayPrice.toFixed(2)} DT
              </span>
              {product.isPromo && product.promoPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {product.price.toFixed(2)} DT
                </span>
              )}
            </div>
          </div>

          {/* Ingredients Toggle Section */}
          {removableIngredients.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="text-primary">{t.ingredients}</span>
                <span className="text-xs text-muted-foreground">{t.clickToRemove}</span>
              </h3>
              
              <div className="relative">
                <div className="flex items-center gap-2">
                  {totalIngredientPages > 1 && (
                    <button
                      onClick={() => setIngredientPage(p => Math.max(0, p - 1))}
                      disabled={ingredientPage === 0}
                      className="p-2 rounded-full bg-secondary disabled:opacity-30"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  )}
                  
                  <div className="flex-1 grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
                    <AnimatePresence mode="wait">
                      {visibleIngredients.map((ingredient) => (
                        <IngredientToggle
                          key={ingredient.id}
                          ingredient={ingredient}
                          isExcluded={excludedIngredients.includes(ingredient.id)}
                          onToggle={() => toggleIngredient(ingredient.id)}
                        />
                      ))}
                    </AnimatePresence>
                  </div>

                  {totalIngredientPages > 1 && (
                    <button
                      onClick={() => setIngredientPage(p => Math.min(totalIngredientPages - 1, p + 1))}
                      disabled={ingredientPage >= totalIngredientPages - 1}
                      className="p-2 rounded-full bg-secondary disabled:opacity-30"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              {excludedIngredients.length > 0 && (
                <p className="mt-3 text-sm text-destructive">
                  {t.without}: {excludedIngredients.map(id => 
                    product.ingredients.find(i => i.id === id)?.name
                  ).join(', ')}
                </p>
              )}
            </div>
          )}

          {/* Extras Section */}
          {product.extras && product.extras.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-3">
                <span className="text-accent">{t.extras}</span>
              </h3>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3">
                {product.extras.map((extra) => (
                  <button
                    key={extra.id}
                    onClick={() => toggleExtra(extra.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                      selectedExtras.includes(extra.id)
                        ? 'border-accent bg-accent/10'
                        : 'border-border bg-secondary/50'
                    }`}
                  >
                    {extra.image && (
                      <img src={extra.image} alt={extra.name} className="w-10 h-10 object-cover rounded" />
                    )}
                    <div className="flex-1 text-left">
                      <p className="font-medium text-sm">{extra.name}</p>
                      <p className="text-primary text-sm font-semibold">+{extra.price.toFixed(2)} DT</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      selectedExtras.includes(extra.id) ? 'bg-accent' : 'bg-muted'
                    }`}>
                      {selectedExtras.includes(extra.id) && <Check className="w-4 h-4 text-accent-foreground" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* AI Recommendations */}
          {recommendations.length > 0 && onProductSelect && (
            <div className="mb-6">
              <ProductRecommendations
                title={t.oftenOrderedWith}
                products={recommendations}
                onProductSelect={(p) => {
                  onClose();
                  setTimeout(() => onProductSelect(p), 300);
                }}
              />
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary flex items-center justify-center"
            >
              <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <span className="text-xl sm:text-2xl font-bold w-10 sm:w-12 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(q => q + 1)}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary flex items-center justify-center"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Footer Actions - always visible at bottom */}
        <div className="flex-shrink-0 p-3 sm:p-4 md:p-5 border-t border-border flex gap-2 sm:gap-3 md:gap-4 bg-card">
          <button
            onClick={onClose}
            className="flex-1 btn-kiosk-secondary py-3 sm:py-4 text-sm sm:text-base"
          >
            {t.cancel}
          </button>
          <button
            onClick={handleAddToCart}
            className="flex-1 btn-kiosk-success py-3 sm:py-4 text-sm sm:text-base flex items-center justify-center gap-2 sm:gap-3"
          >
            <span>{t.validate}</span>
            <span className="font-bold">{totalPrice.toFixed(2)} DT</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function IngredientToggle({ 
  ingredient, 
  isExcluded, 
  onToggle 
}: { 
  ingredient: Ingredient; 
  isExcluded: boolean; 
  onToggle: () => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileTap={{ scale: 0.9 }}
      onClick={onToggle}
      className={`ingredient-toggle ${isExcluded ? 'excluded' : 'included'}`}
    >
      <div className="relative">
        <img
          src={ingredient.image}
          alt={ingredient.name}
          className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-cover rounded-lg transition-all ${
            isExcluded ? 'grayscale' : ''
          }`}
        />
        {isExcluded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-0.5 bg-destructive rotate-45 absolute" />
            <div className="w-full h-0.5 bg-destructive -rotate-45 absolute" />
          </div>
        )}
      </div>
      <span className={`text-xs font-medium mt-1 ${isExcluded ? 'text-destructive line-through' : 'text-foreground'}`}>
        {ingredient.name}
      </span>
    </motion.button>
  );
}
