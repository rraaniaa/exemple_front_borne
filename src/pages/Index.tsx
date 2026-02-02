import { CartProvider } from "@/context/CartContext";
import { KioskApp } from "@/components/kiosk/KioskApp";

const Index = () => {
  return (
    <CartProvider>
      <KioskApp />
    </CartProvider>
  );
};

export default Index;
