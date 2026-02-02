import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, Product } from '@/types/kiosk';

interface CartState {
  items: CartItem[];
  orderType: 'dine-in' | 'takeaway' | null;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; excludedIngredients: string[]; selectedExtras: string[] } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'SET_ORDER_TYPE'; payload: 'dine-in' | 'takeaway' }
  | { type: 'CLEAR_CART' };

const initialState: CartState = {
  items: [],
  orderType: null,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, excludedIngredients, selectedExtras } = action.payload;
      const newItem: CartItem = {
        id: `${product.id}-${Date.now()}`,
        product,
        quantity: 1,
        excludedIngredients,
        selectedExtras,
      };
      return { ...state, items: [...state.items, newItem] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0),
      };
    case 'SET_ORDER_TYPE':
      return { ...state, orderType: action.payload };
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
}

interface CartContextType {
  state: CartState;
  addItem: (product: Product, excludedIngredients: string[], selectedExtras: string[]) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  setOrderType: (type: 'dine-in' | 'takeaway') => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (product: Product, excludedIngredients: string[], selectedExtras: string[]) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, excludedIngredients, selectedExtras } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const setOrderType = (type: 'dine-in' | 'takeaway') => {
    dispatch({ type: 'SET_ORDER_TYPE', payload: type });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getTotal = () => {
    return state.items.reduce((total, item) => {
      const productPrice = item.product.isPromo && item.product.promoPrice
        ? item.product.promoPrice
        : item.product.price;
      const extrasPrice = item.selectedExtras.reduce((sum, extraId) => {
        const extra = item.product.extras?.find(e => e.id === extraId);
        return sum + (extra?.price || 0);
      }, 0);
      return total + (productPrice + extrasPrice) * item.quantity;
    }, 0);
  };

  const getItemCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      state,
      addItem,
      removeItem,
      updateQuantity,
      setOrderType,
      clearCart,
      getTotal,
      getItemCount,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
