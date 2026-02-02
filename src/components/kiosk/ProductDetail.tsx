import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, Ingredient } from '@/types/kiosk';
import { X, Check, Minus, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useRecommendations } from '@/hooks/useRecommendations';
import { ProductRecommendations } from './ProductRecommendations';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onProductSelect?: (product: Product) => void;
}

export function ProductDetail({ product, onClose, onProductSelect }: ProductDetailProps) {
  const { addItem } = useCart();
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-card rounded-3xl shadow-strong max-w-2xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Image */}
        <div className="relative">
          <div className="aspect-video bg-secondary overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-card rounded-full flex items-center justify-center shadow-medium"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
          {product.isPromo && (
            <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-sm font-bold px-4 py-2 rounded-full shadow-primary">
              PROMO
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {/* Product Info */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">{product.name}</h2>
            <p className="text-muted-foreground text-sm">{product.description}</p>
            <div className="flex items-baseline gap-3 mt-3">
              <span className="text-2xl font-bold text-primary">
                {displayPrice.toFixed(2)} DH
              </span>
              {product.isPromo && product.promoPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {product.price.toFixed(2)} DH
                </span>
              )}
            </div>
          </div>

          {/* Ingredients Toggle Section */}
          {removableIngredients.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="text-primary">INGRÉDIENTS</span>
                <span className="text-xs text-muted-foreground">(Cliquez pour retirer)</span>
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
                  
                  <div className="flex-1 grid grid-cols-4 gap-3">
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
                  Sans: {excludedIngredients.map(id => 
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
                <span className="text-accent">EXTRAS</span>
              </h3>
              <div className="grid grid-cols-2 gap-3">
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
                      <p className="text-primary text-sm font-semibold">+{extra.price.toFixed(2)} DH</p>
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
                title="Souvent commandé avec..."
                products={recommendations}
                onProductSelect={(p) => {
                  onClose();
                  setTimeout(() => onProductSelect(p), 300);
                }}
              />
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(q => q + 1)}
              className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 pt-0 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 btn-kiosk-secondary"
          >
            ANNULER
          </button>
          <button
            onClick={handleAddToCart}
            className="flex-1 btn-kiosk-success flex items-center justify-center gap-3"
          >
            <span>VALIDER</span>
            <span className="font-bold">{totalPrice.toFixed(2)} DH</span>
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
          className={`w-14 h-14 object-cover rounded-lg transition-all ${
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
        {isExcluded ? 'Sans' : ''} {ingredient.name}
      </span>
    </motion.button>
  );
}
