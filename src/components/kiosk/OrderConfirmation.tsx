import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, Printer, Home, Clock } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { CartItem } from '@/types/kiosk';
import { useLanguage } from '@/context/LanguageContext';

interface OrderConfirmationProps {
  orderNumber: string;
  total: number;
  orderType: 'dine-in' | 'takeaway';
  items: CartItem[];
  onNewOrder: () => void;
}

export function OrderConfirmation({ orderNumber, total, orderType, items, onNewOrder }: OrderConfirmationProps) {
  const [countdown, setCountdown] = useState(30);
  const [showTicket, setShowTicket] = useState(false);
  const orderDate = useRef(new Date());
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          onNewOrder();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onNewOrder]);

  const qrData = JSON.stringify({
    orderNumber,
    date: orderDate.current.toISOString(),
    status: 'en_preparation'
  });

  const handlePrint = () => {
    setShowTicket(true);
    setTimeout(() => {
      window.print();
      setShowTicket(false);
    }, 100);
  };

  return (
    <>
      <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50 p-4 sm:p-6 md:p-8 overflow-y-auto print:hidden">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.4 }}
          className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-success flex items-center justify-center mb-4 sm:mb-6 md:mb-8 flex-shrink-0"
          style={{ boxShadow: '0 0 60px hsl(145 65% 45% / 0.5)' }}
        >
          <Check className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-success-foreground" strokeWidth={3} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-1 sm:mb-2 text-center">
          {t.orderConfirmed}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6 md:mb-8">
          {t.thankYou}
        </motion.p>

        {/* Order Card with Ticket Style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-2xl sm:rounded-3xl shadow-strong p-4 sm:p-6 md:p-8 text-center mb-4 sm:mb-6 md:mb-8 w-full max-w-md"
        >
          {/* Large Order Number */}
          <div className="bg-secondary rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 mb-3 sm:mb-4 md:mb-6">
            <p className="text-muted-foreground text-xs sm:text-sm mb-1 sm:mb-2">{t.yourOrderNumber}</p>
            <p className="text-4xl sm:text-5xl md:text-6xl font-black text-primary tracking-widest">{orderNumber}</p>
          </div>
          
          {/* QR Code for tracking */}
          <div className="flex flex-col items-center py-3 sm:py-4 border-y border-border mb-3 sm:mb-4">
            <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">{t.scanToTrack}</p>
            <QRCodeSVG
              value={qrData}
              size={typeof window !== 'undefined' && window.innerWidth < 640 ? 90 : 120}
              level="M"
              includeMargin={false}
              className="rounded-lg"
            />
          </div>
          
          <div className="flex items-center justify-center gap-3 sm:gap-4 py-3 sm:py-4 border-b border-border">
            <span className="text-xl sm:text-2xl">
              {orderType === 'dine-in' ? '🍽️' : '🥡'}
            </span>
            <span className="text-base sm:text-lg font-medium">
              {orderType === 'dine-in' ? t.dineIn : t.takeaway}
            </span>
          </div>

          <div className="pt-3 sm:pt-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm">{t.estimatedTime}</span>
            </div>
            <div className="text-right">
              <p className="text-xs sm:text-sm text-muted-foreground">{t.total}</p>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">{total.toFixed(2)} DT</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-4 sm:gap-6 mb-4 sm:mb-6 md:mb-8"
        >
          <button 
            onClick={handlePrint}
            className="flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 bg-card rounded-xl shadow-soft hover:shadow-medium transition-shadow"
          >
            <Printer className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            <span className="text-xs sm:text-sm font-medium">{t.printTicket}</span>
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4"
        >
          {t.autoReturn} {countdown} secondes
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          onClick={onNewOrder}
          className="btn-kiosk-primary flex items-center gap-2 sm:gap-3 py-3 sm:py-4 px-6 sm:px-8 text-sm sm:text-base"
        >
          <Home className="w-5 h-5" />
          <span>{t.newOrder}</span>
        </motion.button>
      </div>

      {/* Print-only Ticket */}
      {showTicket && (
        <div className="hidden print:block">
          <PrintableTicket
            orderNumber={orderNumber}
            items={items}
            total={total}
            orderType={orderType}
            date={orderDate.current}
            qrData={qrData}
          />
        </div>
      )}
    </>
  );
}

function PrintableTicket({ 
  orderNumber, 
  items, 
  total, 
  orderType, 
  date,
  qrData 
}: {
  orderNumber: string;
  items: CartItem[];
  total: number;
  orderType: 'dine-in' | 'takeaway';
  date: Date;
  qrData: string;
}) {
  return (
    <div 
      className="font-mono text-xs"
      style={{
        width: '80mm',
        padding: '4mm',
        backgroundColor: 'white',
        color: 'black'
      }}
    >
      {/* Header */}
      <div className="text-center border-b-2 border-dashed border-gray-800 pb-2 mb-2">
        <h1 className="text-lg font-bold">🍔 FAST KIOSK</h1>
        <p className="text-xs">Merci pour votre commande !</p>
      </div>

      {/* Order Number */}
      <div className="text-center py-3 bg-gray-100 rounded mb-2">
        <p className="text-xs text-gray-600">Votre numéro</p>
        <p className="text-4xl font-black tracking-widest">{orderNumber}</p>
        <p className="text-xs mt-1">
          {orderType === 'dine-in' ? '🍽️ Sur Place' : '🥡 À Emporter'}
        </p>
      </div>

      {/* QR Code */}
      <div className="text-center py-2 border-b border-dashed border-gray-400">
        <p className="text-xs text-gray-600 mb-1">Scannez pour suivre</p>
        <div className="flex justify-center">
          <QRCodeSVG value={qrData} size={80} level="M" />
        </div>
      </div>

      {/* Items */}
      <div className="py-2 border-b border-dashed border-gray-400">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="text-left py-1">Article</th>
              <th className="text-center py-1">Qté</th>
              <th className="text-right py-1">Prix</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const price = item.product.isPromo && item.product.promoPrice
                ? item.product.promoPrice
                : item.product.price;
              const extrasTotal = item.selectedExtras.reduce((sum, extraId) => {
                const extra = item.product.extras?.find(e => e.id === extraId);
                return sum + (extra?.price || 0);
              }, 0);
              const lineTotal = (price + extrasTotal) * item.quantity;

              return (
                <tr key={item.id}>
                  <td className="py-1">
                    <div>{item.product.name}</div>
                    {item.excludedIngredients.length > 0 && (
                      <div className="text-gray-500" style={{ fontSize: '9px' }}>
                        Sans: {item.excludedIngredients.map(id =>
                          item.product.ingredients.find(i => i.id === id)?.name
                        ).join(', ')}
                      </div>
                    )}
                  </td>
                  <td className="text-center py-1">{item.quantity}</td>
                  <td className="text-right py-1">{lineTotal.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Total */}
      <div className="py-2 border-b border-dashed border-gray-400">
        <div className="flex justify-between text-sm font-bold">
          <span>TOTAL</span>
          <span>{total.toFixed(2)} DT</span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pt-2 text-xs text-gray-500">
        <p>{date.toLocaleDateString('fr-FR')} à {date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
        <p className="mt-1">Présentez ce ticket au comptoir</p>
        <p>À bientôt !</p>
      </div>
    </div>
  );
}
