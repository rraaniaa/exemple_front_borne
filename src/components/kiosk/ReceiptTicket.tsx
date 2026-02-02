import { forwardRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { CartItem } from '@/types/kiosk';

interface ReceiptTicketProps {
  orderNumber: string;
  items: CartItem[];
  total: number;
  orderType: 'dine-in' | 'takeaway';
  date: Date;
}

export const ReceiptTicket = forwardRef<HTMLDivElement, ReceiptTicketProps>(
  ({ orderNumber, items, total, orderType, date }, ref) => {
    const qrData = JSON.stringify({
      orderNumber,
      date: date.toISOString(),
      status: 'en_preparation'
    });

    return (
      <div
        ref={ref}
        className="bg-white text-black font-mono"
        style={{
          width: '80mm',
          minHeight: '150mm',
          padding: '4mm',
          fontSize: '12px',
          lineHeight: '1.4'
        }}
      >
        {/* Header */}
        <div className="text-center border-b-2 border-dashed border-black pb-3 mb-3">
          <h1 className="text-2xl font-bold">🍔 FAST KIOSK</h1>
          <p className="text-sm mt-1">Merci pour votre commande !</p>
        </div>

        {/* Order Number - Large */}
        <div className="text-center py-4 bg-gray-100 rounded-lg mb-3">
          <p className="text-sm text-gray-600">Votre numéro</p>
          <p className="text-5xl font-black tracking-widest">{orderNumber}</p>
          <p className="text-sm mt-2">
            {orderType === 'dine-in' ? '🍽️ Sur Place' : '🥡 À Emporter'}
          </p>
        </div>

        {/* QR Code for tracking */}
        <div className="text-center py-3 border-b border-dashed border-gray-400">
          <p className="text-xs text-gray-600 mb-2">Scannez pour suivre votre commande</p>
          <div className="flex justify-center">
            <QRCodeSVG
              value={qrData}
              size={100}
              level="M"
              includeMargin={false}
            />
          </div>
        </div>

        {/* Items */}
        <div className="py-3 border-b border-dashed border-gray-400">
          <table className="w-full text-sm">
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
                        <div className="text-xs text-gray-500">
                          Sans: {item.excludedIngredients.map(id =>
                            item.product.ingredients.find(i => i.id === id)?.name
                          ).join(', ')}
                        </div>
                      )}
                      {item.selectedExtras.length > 0 && (
                        <div className="text-xs text-gray-500">
                          +{item.selectedExtras.map(id =>
                            item.product.extras?.find(e => e.id === id)?.name
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
        <div className="py-3 border-b border-dashed border-gray-400">
          <div className="flex justify-between text-lg font-bold">
            <span>TOTAL</span>
            <span>{total.toFixed(2)} DH</span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-3 text-xs text-gray-500">
          <p>{date.toLocaleDateString('fr-FR')} à {date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
          <p className="mt-2">Présentez ce ticket au comptoir</p>
          <p className="mt-1">À bientôt !</p>
        </div>
      </div>
    );
  }
);

ReceiptTicket.displayName = 'ReceiptTicket';
