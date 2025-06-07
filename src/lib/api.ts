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
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to send message');
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending contact form:', error);
      throw error;
    }
  },

  // Add other API methods here as needed
};

export default api;
