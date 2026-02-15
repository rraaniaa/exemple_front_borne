/**
 * BORNE Frontend API Client
 * Communicates with BORNE Backend on port 4001
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4001/api';
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '5000', 10);

interface ApiResponse<T = any> {
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  timestamp?: string;
}

interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    status: number;
  };
}

class BorneApiClient {
  private baseUrl: string;
  private timeout: number;

  constructor(baseUrl = API_BASE_URL, timeout = API_TIMEOUT) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }

  /**
   * Make an API request
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        const error = (await response.json()) as ApiErrorResponse;
        throw new Error(error.error?.message || `HTTP ${response.status}`);
      }

      return (await response.json()) as T;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  // ========== Health ==========

  /**
   * Get service health status
   */
  async getHealth() {
    return this.request('/health');
  }

  /**
   * Get readiness status
   */
  async getReadiness() {
    return this.request('/health/ready');
  }

  // ========== Kiosk API ==========

  /**
   * Get all products
   */
  async getProducts(params?: Record<string, any>) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/kiosk/products${query ? `?${query}` : ''}`);
  }

  /**
   * Get product by ID
   */
  async getProduct(productId: string) {
    return this.request(`/kiosk/products/${productId}`);
  }

  /**
   * Create a new cart
   */
  async createCart() {
    return this.request('/kiosk/cart', {
      method: 'POST',
      body: JSON.stringify({}),
    });
  }

  /**
   * Add item to cart
   */
  async addToCart(cartId: string, item: any) {
    return this.request(`/kiosk/cart/${cartId}/items`, {
      method: 'POST',
      body: JSON.stringify(item),
    });
  }

  /**
   * Remove item from cart
   */
  async removeFromCart(cartId: string, productId: string) {
    return this.request(`/kiosk/cart/${cartId}/items/${productId}`, {
      method: 'DELETE',
    });
  }

  /**
   * Create order
   */
  async createOrder(order: any) {
    return this.request('/kiosk/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    });
  }

  /**
   * Get recommendations
   */
  async getRecommendations(params?: Record<string, any>) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/kiosk/recommendations${query ? `?${query}` : ''}`);
  }

  // ========== Admin API ==========

  /**
   * Get service statistics
   */
  async getStats() {
    return this.request('/admin/stats');
  }

  /**
   * Sync data with GOLDPOS
   */
  async syncData() {
    return this.request('/admin/sync', {
      method: 'POST',
      body: JSON.stringify({}),
    });
  }

  /**
   * Get service configuration
   */
  async getConfig() {
    return this.request('/admin/config');
  }
}

// Export singleton instance
export const borneApi = new BorneApiClient();

// Export class for testing
export { BorneApiClient };
