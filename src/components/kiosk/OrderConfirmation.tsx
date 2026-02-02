import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, Printer, Home, Clock } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { CartItem } from '@/types/kiosk';

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
      <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50 p-8 print:hidden">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.4 }}
          className="w-32 h-32 rounded-full bg-success flex items-center justify-center mb-8"
          style={{ boxShadow: '0 0 60px hsl(145 65% 45% / 0.5)' }}
        >
          <Check className="w-16 h-16 text-success-foreground" strokeWidth={3} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-foreground mb-2"
        >
          Commande Confirmée !
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground mb-8"
        >
          Merci pour votre commande
        </motion.p>

        {/* Order Card with Ticket Style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-3xl shadow-strong p-8 text-center mb-8 min-w-[400px] max-w-md"
        >
          {/* Large Order Number */}
          <div className="bg-secondary rounded-2xl p-6 mb-6">
            <p className="text-muted-foreground text-sm mb-2">Votre numéro de commande</p>
            <p className="text-6xl font-black text-primary tracking-widest">{orderNumber}</p>
          </div>
          
          {/* QR Code for tracking */}
          <div className="flex flex-col items-center py-4 border-y border-border mb-4">
            <p className="text-sm text-muted-foreground mb-3">Scannez pour suivre votre commande</p>
            <QRCodeSVG
              value={qrData}
              size={120}
              level="M"
              includeMargin={false}
              className="rounded-lg"
            />
          </div>
          
          <div className="flex items-center justify-center gap-4 py-4 border-b border-border">
            <span className="text-2xl">
              {orderType === 'dine-in' ? '🍽️' : '🥡'}
            </span>
            <span className="text-lg font-medium">
              {orderType === 'dine-in' ? 'Sur Place' : 'À Emporter'}
            </span>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Temps estimé: 5-10 min</span>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-bold text-foreground">{total.toFixed(2)} DH</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-6 mb-8"
        >
          <button 
            onClick={handlePrint}
            className="flex flex-col items-center gap-2 p-4 bg-card rounded-xl shadow-soft hover:shadow-medium transition-shadow"
          >
            <Printer className="w-8 h-8 text-primary" />
            <span className="text-sm font-medium">Imprimer Ticket</span>
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-muted-foreground text-sm mb-4"
        >
          Retour automatique dans {countdown} secondes
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          onClick={onNewOrder}
          className="btn-kiosk-primary flex items-center gap-3"
        >
          <Home className="w-5 h-5" />
          <span>Nouvelle Commande</span>
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
          <span>{total.toFixed(2)} DH</span>
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
