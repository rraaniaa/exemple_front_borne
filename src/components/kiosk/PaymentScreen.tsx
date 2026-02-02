import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Banknote, ArrowLeft, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

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
      <div className="bg-card shadow-soft p-6 flex items-center gap-4">
        <button
          onClick={onBack}
          className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Paiement</h1>
          <p className="text-muted-foreground">Choisissez votre mode de paiement</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 flex flex-col items-center justify-center gap-8 max-w-2xl mx-auto w-full">
        {/* Order Summary */}
        <div className="bg-card rounded-2xl shadow-medium p-6 w-full">
          <h3 className="font-semibold text-lg mb-4">Récapitulatif</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
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
                  <span className="font-medium">{((price + extrasTotal) * item.quantity).toFixed(2)} DH</span>
                </div>
              );
            })}
          </div>
          <div className="border-t border-border mt-4 pt-4 flex justify-between">
            <span className="text-lg font-bold">Total à payer</span>
            <span className="text-2xl font-bold text-primary">{total.toFixed(2)} DH</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="w-full grid grid-cols-2 gap-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedMethod('card')}
            className={`p-8 rounded-2xl flex flex-col items-center gap-4 transition-all ${
              selectedMethod === 'card'
                ? 'bg-primary text-primary-foreground shadow-primary'
                : 'bg-card shadow-medium hover:shadow-strong'
            }`}
          >
            <CreditCard className="w-16 h-16" />
            <div className="text-center">
              <p className="text-xl font-bold">Carte Bancaire</p>
              <p className={`text-sm ${selectedMethod === 'card' ? 'opacity-80' : 'text-muted-foreground'}`}>
                Paiement CB sur la borne
              </p>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedMethod('counter')}
            className={`p-8 rounded-2xl flex flex-col items-center gap-4 transition-all ${
              selectedMethod === 'counter'
                ? 'bg-primary text-primary-foreground shadow-primary'
                : 'bg-card shadow-medium hover:shadow-strong'
            }`}
          >
            <Banknote className="w-16 h-16" />
            <div className="text-center">
              <p className="text-xl font-bold">Au Comptoir</p>
              <p className={`text-sm ${selectedMethod === 'counter' ? 'opacity-80' : 'text-muted-foreground'}`}>
                Espèces ou CB au comptoir
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
          className="w-full max-w-md btn-kiosk-success py-5 text-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Traitement en cours...</span>
            </>
          ) : (
            <span>CONFIRMER LE PAIEMENT</span>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
