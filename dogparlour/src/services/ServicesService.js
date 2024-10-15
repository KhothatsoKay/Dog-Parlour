const BASE_URL = 'http://localhost:8080'; 

export const fetchServices = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/services`);
    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }
    const services = await response.json();
    console.log(services);
    return services;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};

export const uploadService = async (serviceData, token) => {
  try {
    const formData = new FormData();
    formData.append('serviceName', serviceData.serviceName);
    formData.append('description', serviceData.description);
    formData.append('price', serviceData.price);
    formData.append('imageFile', serviceData.imageFile);

    const response = await fetch(`${BASE_URL}/api/services`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`, // Include JWT token
      },
      body: formData,
    });

    const contentType = response.headers.get('content-type');
    let result;
    if (contentType && contentType.includes('application/json')) {
      result = await response.json(); 
    } else {
      result = await response.text();  
    }

    if (!response.ok) {
      throw new Error(result || 'Failed to upload service');
    }

    return result;
  } catch (error) {
    console.error('Error uploading service:', error);
    throw error;
  }
};

