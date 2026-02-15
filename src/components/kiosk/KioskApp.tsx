import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { WelcomeScreen } from './WelcomeScreen';
import { KioskHeader } from './KioskHeader';
import { CategorySidebar } from './CategorySidebar';
import { MenuContent } from './MenuContent';
import { CartSummary, CartPanel } from './CartSummary';
import { PaymentScreen } from './PaymentScreen';
import { OrderConfirmation } from './OrderConfirmation';
import { BlankPage } from './BlankPage';
import { useCart } from '@/context/CartContext';
import { Product, CartItem } from '@/types/kiosk';

type Screen = 'welcome' | 'blank' | 'menu' | 'payment' | 'confirmation';

export function KioskApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [activeCategory, setActiveCategory] = useState('burgers');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [orderItems, setOrderItems] = useState<CartItem[]>([]);
  const { state, setOrderType, clearCart, getTotal } = useCart();
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Inactivity timeout - return to welcome after 2 minutes
  useEffect(() => {
    if (currentScreen !== 'welcome' && currentScreen !== 'confirmation') {
      const checkInactivity = setInterval(() => {
        if (Date.now() - lastActivity > 120000) {
          handleNewOrder();
        }
      }, 10000);
      return () => clearInterval(checkInactivity);
    }
  }, [currentScreen, lastActivity]);

  // Reset activity on any interaction
  useEffect(() => {
    const resetActivity = () => setLastActivity(Date.now());
    window.addEventListener('touchstart', resetActivity);
    window.addEventListener('click', resetActivity);
    return () => {
      window.removeEventListener('touchstart', resetActivity);
      window.removeEventListener('click', resetActivity);
    };
  }, []);

  const handleStart = (orderType: 'dine-in' | 'takeaway') => {
    setOrderType(orderType);
    setCurrentScreen('menu');
  };

  const handleCheckout = () => {
    if (state.items.length > 0) {
      setCurrentScreen('payment');
    }
  };

  const handlePaymentComplete = () => {
    // Generate order number
    const randomNum = Math.floor(Math.random() * 999).toString().padStart(3, '0');
    setOrderNumber(randomNum);
    setOrderItems([...state.items]);
    setCurrentScreen('confirmation');
  };

  const handleBackToMenu = () => {
    setCurrentScreen('menu');
  };

  const handleCancel = () => {
    clearCart();
    setCurrentScreen('welcome');
  };

  const handleNewOrder = () => {
    clearCart();
    setOrderItems([]);
    setCurrentScreen('welcome');
    setActiveCategory('burgers');
  };

  const handleProductSelectFromCart = (product: Product) => {
    setIsCartOpen(false);
  };

  return (
    <div className="kiosk-container">
      <AnimatePresence mode="wait">
        {currentScreen === 'welcome' && (
          <WelcomeScreen key="welcome" onStart={handleStart} />
        )}

        {currentScreen === 'blank' && (
          <BlankPage key="blank" orderType={state.orderType} />
        )}

        {currentScreen === 'menu' && (
          <div key="menu" className="flex flex-col h-full w-full">
            <KioskHeader onCartClick={() => setIsCartOpen(true)} />
            <div className="kiosk-main">
              <CategorySidebar
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
              <MenuContent activeCategory={activeCategory} />
            </div>
            <CartSummary 
              onCheckout={handleCheckout} 
              onCancel={handleCancel}
              onProductSelect={handleProductSelectFromCart}
            />
            <CartPanel 
              isOpen={isCartOpen} 
              onClose={() => setIsCartOpen(false)}
              onProductSelect={handleProductSelectFromCart}
            />
          </div>
        )}

        {currentScreen === 'payment' && (
          <PaymentScreen
            key="payment"
            total={getTotal()}
            onPaymentComplete={handlePaymentComplete}
            onBack={handleBackToMenu}
          />
        )}

        {currentScreen === 'confirmation' && (
          <OrderConfirmation
            key="confirmation"
            orderNumber={orderNumber}
            total={getTotal() || orderItems.reduce((sum, item) => {
              const price = item.product.isPromo && item.product.promoPrice
                ? item.product.promoPrice
                : item.product.price;
              const extrasTotal = item.selectedExtras.reduce((s, extraId) => {
                const extra = item.product.extras?.find(e => e.id === extraId);
                return s + (extra?.price || 0);
              }, 0);
              return sum + (price + extrasTotal) * item.quantity;
            }, 0)}
            orderType={state.orderType!}
            items={orderItems}
            onNewOrder={handleNewOrder}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
