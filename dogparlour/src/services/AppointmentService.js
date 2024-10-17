const BASE_URL = 'http://localhost:8080/api/appointments';

export const AppointmentService = {
    async createAppointment(appointmentData) {
        try {
            const token = localStorage.getItem('jwt');
            const response = await fetch(BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(appointmentData),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Failed to create appointment:', {
                    status: response.status,
                    statusText: response.statusText,
                    error: errorData,
                });
                throw new Error(errorData.message || 'Failed to create appointment');
            }
    
            return await response.json();
        } catch (error) {
            console.error('Error in createAppointment:', error);
            throw error;
        }
    }
,    
      

  async getAppointmentsByUser(userId) {
    try {
      const response = await fetch(`${BASE_URL}/user/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`, 
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch appointments');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  async getAppointmentById(id) {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch appointment');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

async deleteAppointment(id) {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`, 
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete appointment');
      }
    } catch (error) {
      throw error;
    }
  },
  async getAllAppointments() {
    try {
        const response = await fetch(`${BASE_URL}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`, 
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch appointments');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

};


