
const BASE_URL = import.meta.env.VITE_API_URL;

export const DogService = {
  async fetchDogs(userId) {
    try {
      const response = await fetch(`${BASE_URL}/dogs/user/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`, 
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dogs');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};
