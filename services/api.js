// Create axios instance with base URL from environment variable
import axios from 'axios';

// Create axios instance with base URL from environment variable
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.askpsychicdrew.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to include auth token in headers
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage if it exists
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    // If token exists, add it to the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors (token expired or invalid)
    if (error.response && error.response.status === 401) {
      // Clear localStorage and redirect to login if we're in the browser
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Only redirect if we're not already on the login page
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me')
};

// Token API calls
export const tokenAPI = {
  getTokenPackages: () => api.get('/tokens/packages'),
  createPaymentIntent: (packageId) => api.post('/tokens/payment-intent', { packageId }),
  confirmPurchase: (transactionId, paymentIntentId) => 
    api.post('/tokens/confirm-purchase', { transactionId, paymentIntentId }),
  getUserTransactions: () => api.get('/tokens/transactions')
};

// Reading API calls
export const readingAPI = {
  getReadingTypes: () => api.get('/readings/types'),
  generateReading: (readingData) => api.post('/readings/generate', readingData),
  getUserReadings: () => api.get('/readings'),
  getReadingById: (id) => api.get(`/readings/${id}`)
};

export default api;
