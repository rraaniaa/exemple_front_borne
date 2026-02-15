/**
 * BORNE Kiosk Integration
 * Main kiosk application component
 */

import { useState, useEffect } from 'react';
import { borneApi } from '@/services/api';
import { Button } from '@/components/ui/button';

export function BorneKioskApp() {
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [health, setHealth] = useState<any>(null);

  // Check backend health on mount
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const healthData = await borneApi.getHealth();
        setHealth(healthData);
        console.log('BORNE Backend is up:', healthData);
      } catch (err) {
        console.error('Backend connection failed:', err);
        setError('Cannot connect to BORNE Backend');
      }
    };

    checkHealth();
  }, []);

  // Load products on mount
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await borneApi.getProducts() as { products?: any[] };
      setProducts(data.products || []);
    } catch (err: any) {
      setError(err.message);
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const createCart = async () => {
    try {
      const newCart = await borneApi.createCart();
      setCart(newCart);
      console.log('Cart created:', newCart);
    } catch (err: any) {
      setError(err.message);
      console.error('Error creating cart:', err);
    }
  };

  const addToCart = async (productId: string) => {
    if (!cart) {
      await createCart();
      return;
    }

    try {
      const product = products.find(p => p.id === productId);
      if (!product) return;

      await borneApi.addToCart(cart.id, {
        productId,
        quantity: 1,
        unitPrice: product.price,
      });

      console.log('Item added to cart');
      // Refresh cart
    } catch (err: any) {
      setError(err.message);
      console.error('Error adding to cart:', err);
    }
  };

  const checkout = async () => {
    if (!cart || cart.items?.length === 0) {
      setError('Cart is empty');
      return;
    }

    try {
      const order = await borneApi.createOrder({
        cartId: cart.id,
        items: cart.items,
        total: cart.total,
        subtotal: cart.subtotal,
        tax: cart.tax,
        channel: 'kiosk',
      });

      console.log('Order created:', order);
      // Reset for next customer
      setCart(null);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      console.error('Error creating order:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 sm:p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-3 sm:mb-4 md:mb-6">
        <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-600 mb-1 sm:mb-2">🎯 BORNE Kiosk</h1>
          <p className="text-gray-600 text-sm sm:text-base">Welcome to the self-service ordering system</p>

          {/* Backend Status */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            {health ? (
              <p className="text-green-600 font-semibold">Backend connected - {health.status}</p>
            ) : (
              <p className="text-red-600 font-semibold">Backend disconnected</p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 font-semibold">{error}</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {/* Products Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Products</h2>

            {loading ? (
              <p className="text-center text-gray-600">Loading products...</p>
            ) : products.length === 0 ? (
              <p className="text-center text-gray-600">No products available</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {products.map((product) => (
                  <div key={product.id} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition">
                    <h3 className="font-semibold text-base sm:text-lg">{product.name}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm mt-1 sm:mt-2">{product.description}</p>
                    <div className="flex justify-between items-center mt-3 sm:mt-4">
                      <span className="text-xl sm:text-2xl font-bold text-indigo-600">
                        ${product.price?.toFixed(2) || '0.00'}
                      </span>
                      <Button
                        onClick={() => addToCart(product.id)}
                        className="bg-indigo-600 hover:bg-indigo-700"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Cart Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
            <h2 className="text-2xl font-bold mb-4">Cart</h2>

            {!cart ? (
              <Button
                onClick={createCart}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
              >
                Start Shopping
              </Button>
            ) : (
              <div>
                <div className="mb-4 p-3 bg-indigo-50 border border-indigo-200 rounded">
                  <p className="text-sm text-gray-600">Cart ID:</p>
                  <p className="font-mono text-xs text-indigo-600 break-all">{cart.id}</p>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-semibold">${cart.subtotal?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span className="font-semibold">${cart.tax?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between text-lg">
                    <span>Total:</span>
                    <span className="font-bold text-indigo-600">${cart.total?.toFixed(2) || '0.00'}</span>
                  </div>
                </div>

                <Button
                  onClick={checkout}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  Checkout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto mt-8 text-center text-gray-600 text-sm">
        <p>BORNE Kiosk System • Backend on port 4001 • GOLDPOS Integration</p>
      </div>
    </div>
  );
}

export default BorneKioskApp;
