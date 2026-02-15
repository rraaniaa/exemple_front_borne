import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { KioskApp } from "@/components/kiosk/KioskApp";

const Index = () => {
  return (
    <LanguageProvider>
      <CartProvider>
        <KioskApp />
      </CartProvider>
    </LanguageProvider>
  );
};

export default Index;
