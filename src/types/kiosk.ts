// Product and Menu Types
export interface Ingredient {
  id: string;
  name: string;
  image: string;
  removable: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  ingredients: Ingredient[];
  extras?: Extra[];
  isAvailable: boolean;
  isPromo?: boolean;
  promoPrice?: number;
}

export interface Extra {
  id: string;
  name: string;
  price: number;
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image?: string;
}

// Cart Types
export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  excludedIngredients: string[];
  selectedExtras: string[];
  notes?: string;
}

export interface Cart {
  items: CartItem[];
  orderType: 'dine-in' | 'takeaway' | null;
  total: number;
}

// Order Types
export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  orderType: 'dine-in' | 'takeaway';
  status: 'created' | 'paid' | 'preparing' | 'ready' | 'completed';
  total: number;
  createdAt: Date;
}

// Banner/Media Types for Admin
export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  title?: string;
  duration?: number; // for carousel timing
  isActive: boolean;
}

// Kiosk Configuration
export interface KioskConfig {
  id: string;
  name: string;
  location: string;
  language: 'fr' | 'en' | 'ar';
  welcomeMedia: MediaItem[];
  inactivityTimeout: number;
  showPromotions: boolean;
}
