import axios from 'axios';
export const fetchLocation = async (location) => {
  const URL = import.meta.env.VITE_APP_URL;
    try {
      const response = await axios.get(`${URL}/api/v1/location?destination=${location}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Error fetching the location';
    }
  };