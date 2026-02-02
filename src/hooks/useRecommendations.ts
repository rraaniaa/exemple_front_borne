import { useMemo } from 'react';
import { Product, CartItem } from '@/types/kiosk';
import { products } from '@/data/mockData';

// Simulated co-occurrence data (in a real app, this would come from IA/ML backend)
const coOccurrenceRules: Record<string, string[]> = {
  'burgers': ['fries', 'coca-cola', 'sprite', 'onion-rings'],
  'burger-classic': ['fries', 'coca-cola', 'nuggets-6'],
  'burger-double': ['fries', 'coca-cola', 'onion-rings'],
  'fries': ['coca-cola', 'sprite', 'nuggets-6'],
  'nuggets-6': ['fries', 'coca-cola', 'sauce-extra'],
  'wrap-chicken': ['fries', 'salad-nature', 'coca-cola'],
  'wrap-beef': ['fries', 'coca-cola', 'onion-rings'],
  'salad-nature': ['water', 'wrap-chicken'],
  'salad-caesar': ['water', 'coffee'],
  'coca-cola': ['fries', 'nuggets-6'],
  'sprite': ['fries', 'nuggets-6'],
  'fanta': ['fries', 'nuggets-6'],
  'sundae-choco': ['coffee'],
};

// Categories that go well together
const categoryPairings: Record<string, string[]> = {
  'burgers': ['sides', 'drinks'],
  'wraps': ['sides', 'drinks'],
  'salads': ['drinks'],
  'sides': ['drinks', 'desserts'],
  'drinks': ['desserts'],
  'desserts': ['drinks'],
};

export function useRecommendations() {
  // Get recommendations for a specific product (for product detail page)
  const getProductRecommendations = useMemo(() => {
    return (product: Product, limit: number = 4): Product[] => {
      const recommendedIds = new Set<string>();
      
      // First, check direct product co-occurrence
      const directRecs = coOccurrenceRules[product.id] || [];
      directRecs.forEach(id => recommendedIds.add(id));
      
      // Then, check category-based recommendations
      const categoryRecs = coOccurrenceRules[product.categoryId] || [];
      categoryRecs.forEach(id => recommendedIds.add(id));
      
      // Get products from paired categories
      const pairedCategories = categoryPairings[product.categoryId] || [];
      products
        .filter(p => pairedCategories.includes(p.categoryId) && p.id !== product.id)
        .slice(0, 3)
        .forEach(p => recommendedIds.add(p.id));
      
      // Convert to products and filter out the current product
      return products
        .filter(p => recommendedIds.has(p.id) && p.id !== product.id && p.isAvailable)
        .slice(0, limit);
    };
  }, []);

  // Get recommendations based on cart contents (for cart upsell)
  const getCartRecommendations = useMemo(() => {
    return (cartItems: CartItem[], limit: number = 4): Product[] => {
      const cartProductIds = new Set(cartItems.map(item => item.product.id));
      const cartCategories = new Set(cartItems.map(item => item.product.categoryId));
      const recommendedIds = new Set<string>();
      
      // Get recommendations based on each cart item
      cartItems.forEach(item => {
        const productRecs = coOccurrenceRules[item.product.id] || [];
        productRecs.forEach(id => {
          if (!cartProductIds.has(id)) {
            recommendedIds.add(id);
          }
        });
      });
      
      // Check for missing complementary categories
      const missingCategories: string[] = [];
      
      // If they have a main dish but no drink
      if ((cartCategories.has('burgers') || cartCategories.has('wraps')) && !cartCategories.has('drinks')) {
        missingCategories.push('drinks');
      }
      
      // If they have a main dish but no side
      if ((cartCategories.has('burgers') || cartCategories.has('wraps')) && !cartCategories.has('sides')) {
        missingCategories.push('sides');
      }
      
      // If they have everything but no dessert
      if (cartItems.length >= 2 && !cartCategories.has('desserts')) {
        missingCategories.push('desserts');
      }
      
      // Add products from missing categories
      products
        .filter(p => missingCategories.includes(p.categoryId) && !cartProductIds.has(p.id))
        .slice(0, 2)
        .forEach(p => recommendedIds.add(p.id));
      
      return products
        .filter(p => recommendedIds.has(p.id) && p.isAvailable)
        .slice(0, limit);
    };
  }, []);

  // Get "last chance" recommendations before checkout
  const getLastChanceRecommendations = useMemo(() => {
    return (cartItems: CartItem[], limit: number = 3): Product[] => {
      const cartProductIds = new Set(cartItems.map(item => item.product.id));
      const cartCategories = new Set(cartItems.map(item => item.product.categoryId));
      
      // Focus on desserts and drinks as last-minute additions
      const lastChanceCategories = ['desserts', 'drinks'];
      
      return products
        .filter(p => 
          lastChanceCategories.includes(p.categoryId) && 
          !cartProductIds.has(p.id) && 
          !cartCategories.has(p.categoryId) &&
          p.isAvailable
        )
        .slice(0, limit);
    };
  }, []);

  return {
    getProductRecommendations,
    getCartRecommendations,
    getLastChanceRecommendations,
  };
}
