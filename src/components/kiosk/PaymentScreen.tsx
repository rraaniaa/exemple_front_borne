import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Banknote, ArrowLeft, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

interface PaymentScreenProps {
  total: number;
  onPaymentComplete: () => void;
  onBack: () => void;
}

type PaymentMethod = 'card' | 'counter';

export function PaymentScreen({ total, onPaymentComplete, onBack }: PaymentScreenProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { state } = useCart();
  const { t } = useLanguage();

  const handlePayment = async () => {
    if (!selectedMethod) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    onPaymentComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background z-50 flex flex-col"
    >
      {/* Header */}
      <div className="bg-card shadow-soft p-3 sm:p-4 md:p-6 flex items-center gap-3 sm:gap-4">
        <button
          onClick={onBack}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">{t.payment}</h1>
          <p className="text-muted-foreground text-xs sm:text-sm">{t.choosePaymentMethod}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 max-w-2xl mx-auto w-full overflow-y-auto">
        {/* Order Summary */}
        <div className="bg-card rounded-xl sm:rounded-2xl shadow-medium p-4 sm:p-6 w-full">
          <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">{t.summary}</h3>
          <div className="space-y-2 max-h-32 sm:max-h-40 overflow-y-auto">
            {state.items.map((item) => {
              const price = item.product.isPromo && item.product.promoPrice
                ? item.product.promoPrice
                : item.product.price;
              const extrasTotal = item.selectedExtras.reduce((sum, extraId) => {
                const extra = item.product.extras?.find(e => e.id === extraId);
                return sum + (extra?.price || 0);
              }, 0);
              return (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.quantity}x {item.product.name}</span>
                  <span className="font-medium">{((price + extrasTotal) * item.quantity).toFixed(2)} DT</span>
                </div>
              );
            })}
          </div>
          <div className="border-t border-border mt-3 sm:mt-4 pt-3 sm:pt-4 flex justify-between">
            <span className="text-base sm:text-lg font-bold">{t.totalToPay}</span>
            <span className="text-xl sm:text-2xl font-bold text-primary">{total.toFixed(2)} DT</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="w-full grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedMethod('card')}
            className={`p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl flex flex-row xs:flex-col items-center gap-3 sm:gap-4 transition-all ${
              selectedMethod === 'card'
                ? 'bg-primary text-primary-foreground shadow-primary'
                : 'bg-card shadow-medium hover:shadow-strong'
            }`}
          >
            <CreditCard className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 flex-shrink-0" />
            <div className="text-left xs:text-center">
              <p className="text-base sm:text-lg md:text-xl font-bold">{t.bankCard}</p>
              <p className={`text-xs sm:text-sm ${selectedMethod === 'card' ? 'opacity-80' : 'text-muted-foreground'}`}>
                {t.cardOnKiosk}
              </p>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedMethod('counter')}
            className={`p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl flex flex-row xs:flex-col items-center gap-3 sm:gap-4 transition-all ${
              selectedMethod === 'counter'
                ? 'bg-primary text-primary-foreground shadow-primary'
                : 'bg-card shadow-medium hover:shadow-strong'
            }`}
          >
            <Banknote className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 flex-shrink-0" />
            <div className="text-left xs:text-center">
              <p className="text-base sm:text-lg md:text-xl font-bold">{t.atCounter}</p>
              <p className={`text-xs sm:text-sm ${selectedMethod === 'counter' ? 'opacity-80' : 'text-muted-foreground'}`}>
                {t.cashOrCardAtCounter}
              </p>
            </div>
          </motion.button>
        </div>

        {/* Confirm Button */}
        <motion.button
          whileHover={{ scale: selectedMethod ? 1.02 : 1 }}
          whileTap={{ scale: selectedMethod ? 0.98 : 1 }}
          onClick={handlePayment}
          disabled={!selectedMethod || isProcessing}
          className="w-full max-w-md btn-kiosk-success py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>{t.processing}</span>
            </>
          ) : (
            <span>{t.confirmPayment}</span>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
