// Helper to get API base URL with better error handling
const getApiBaseUrl = () => {
  try {
    // 1. Check for explicit VITE_API_BASE_URL
    if (import.meta.env.VITE_API_BASE_URL) {
      console.log('Using VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
      return import.meta.env.VITE_API_BASE_URL;
    }
    
    // 2. In production, use relative /api path
    if (import.meta.env.PROD) {
      const baseUrl = '/api';
      console.log('Production mode, using base URL:', baseUrl);
      return baseUrl;
    }
    
    // 3. In development, use localhost
    const devUrl = 'http://localhost:3001';
    console.log('Development mode, using URL:', devUrl);
    return devUrl;
  } catch (error) {
    console.error('Error getting API base URL:', error);
    return '/api'; // Fallback to relative path
  }
};

const API_BASE_URL = getApiBaseUrl();
console.log('API Base URL:', API_BASE_URL);

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

export const api = {
  async sendContactForm(data: ContactFormData): Promise<{ success: boolean; message?: string }> {
    // Ensure the URL has a single /api/ prefix
    const baseUrl = API_BASE_URL.endsWith('/api') ? API_BASE_URL : 
                  API_BASE_URL.endsWith('/api/') ? API_BASE_URL.slice(0, -1) : 
                  `${API_BASE_URL}/api`;
    const url = `${baseUrl}/contact`;
    console.log('Sending request to:', url);
    console.log('Request data:', data);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include', // Important for cookies, authorization headers
        body: JSON.stringify(data),
      });

      console.log('Response status:', response.status);
      
      // Handle non-JSON responses
      const contentType = response.headers.get('content-type');
      let responseData;
      
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        const text = await response.text();
        console.warn('Non-JSON response:', text);
        throw new Error(`Unexpected response format: ${text.substring(0, 100)}`);
      }

      console.log('Response data:', responseData);

      if (!response.ok) {
        const errorMessage = responseData?.message || 
          `Request failed with status ${response.status}`;
        console.error('Server error:', errorMessage);
        throw new Error(errorMessage);
      }

      return responseData;
    } catch (error) {
      console.error('Error sending contact form:', error);
      
      // Handle network errors
      if (error instanceof TypeError) {
        if (error.message === 'Failed to fetch') {
          throw new Error('Unable to connect to the server. Please check your internet connection and try again.');
        }
      }
      
      // Handle other errors
      if (error instanceof Error) {
        // Don't expose internal error messages to the user
        throw new Error('An error occurred while sending your message. Please try again later.');
      }
      
      throw new Error('An unexpected error occurred. Please try again later.');
    }
  },

  // Add other API methods here as needed
};

export default api;
