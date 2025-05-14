
import axios from 'axios';
import { toast } from 'sonner';

// Base API URL - can be changed based on environment
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.pawtrack.com/api' 
  : 'http://localhost:8080/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    if (response) {
      // Handle specific error status codes
      switch (response.status) {
        case 401:
          toast.error('Session expired. Please login again.');
          localStorage.removeItem('authToken');
          window.location.href = '/login';
          break;
        case 403:
          toast.error('You do not have permission to perform this action');
          break;
        case 404:
          toast.error('Resource not found');
          break;
        case 500:
          toast.error('Server error. Please try again later.');
          break;
        default:
          toast.error(response.data?.message || 'Something went wrong');
      }
    } else {
      toast.error('Network error. Please check your connection.');
    }
    
    return Promise.reject(error);
  }
);

// Helper function to format price in Indian Rupees
export const formatIndianRupees = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

// Helper function for safe price formatting
export const safeFormatPrice = (price: number | undefined): string => {
  if (price === undefined || price === null) {
    return '₹0.00';
  }
  return formatIndianRupees(price);
};

// Auth API
export const authAPI = {
  login: (username: string, password: string) => 
    api.post('/auth/login', { username, password }),
  
  register: (userData: any) => 
    api.post('/auth/register', userData),
  
  validateToken: () => 
    api.get('/auth/validate'),
    
  refreshToken: () => 
    api.post('/auth/refresh')
};

// Products API
export const productsAPI = {
  getAllProducts: (params?: any) => 
    api.get('/products', { params }),
  
  getProductById: (id: number) => 
    api.get(`/products/${id}`),
  
  addProduct: (productData: any) => 
    api.post('/products', productData),
  
  updateProduct: (id: number, productData: any) => 
    api.put(`/products/${id}`, productData),
  
  deleteProduct: (id: number) => 
    api.delete(`/products/${id}`)
};

// Orders API
export const ordersAPI = {
  getUserOrders: (userId: number) => 
    api.get(`/orders/${userId}`),
  
  createOrder: (orderData: any) => 
    api.post('/orders', orderData),
  
  getOrderDetails: (id: number) => 
    api.get(`/orders/${id}`),
  
  updateOrderStatus: (id: number, status: string) => 
    api.put(`/orders/${id}/status`, { status })
};

// Reviews API
export const reviewsAPI = {
  getProductReviews: (productId: number) => 
    api.get(`/products/${productId}/reviews`),
  
  addReview: (productId: number, reviewData: any) => 
    api.post(`/products/${productId}/reviews`, reviewData),
  
  updateReview: (id: number, reviewData: any) => 
    api.put(`/reviews/${id}`, reviewData),
  
  deleteReview: (id: number) => 
    api.delete(`/reviews/${id}`)
};

// Payment API
export const paymentsAPI = {
  createPayment: (paymentData: any) => 
    api.post('/payments/create', paymentData),
  
  verifyPayment: (verificationData: any) => 
    api.post('/payments/verify', verificationData),
  
  getPaymentDetails: (orderId: number) => 
    api.get(`/payments/${orderId}`),
    
  initiateUpiPayment: (upiId: string, amount: number, orderId: string) => {
    // This would typically connect to a payment gateway API
    // For now, we'll simulate redirecting to a payment app
    const upiUrl = `upi://pay?pa=${upiId}&pn=PawTrack&am=${amount}&cu=INR&tn=Order-${orderId}`;
    window.location.href = upiUrl;
    return Promise.resolve({ success: true, redirectUrl: upiUrl });
  }
};

export default api;
