const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

export const api = {
  async sendContactForm(data: ContactFormData): Promise<{ success: boolean; message?: string }> {
    try {
      console.log('Sending request to:', `${API_BASE_URL}/api/contact`);
      console.log('Request data:', data);

      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('Response status:', response.status);
      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to send message');
      }

      return responseData;
    } catch (error) {
      console.error('Error sending contact form:', error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Failed to connect to the server. Please try again later.');
    }
  },

  // Add other API methods here as needed
};

export default api;
