import axios from 'axios';
export const fetchLocation = async (location) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/location?destination=${location}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Error fetching the location';
    }
  };