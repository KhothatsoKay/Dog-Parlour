
const BASE_URL = 'http://localhost:8080/api/dogs';

export const DogService = {
  async fetchDogs(userId) {
    try {
      const response = await fetch(`${BASE_URL}/user/${userId}`, {
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
