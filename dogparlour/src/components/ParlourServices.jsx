import React, { useState, useEffect } from 'react';
import { fetchServices, deleteService } from '../services/ServicesService'; 
import { useNavigate } from 'react-router-dom';

export default function ParlourServices() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getServices = async () => {
      try {
        const servicesData = await fetchServices();
        setServices(servicesData);
      } catch (err) {
        setError(err.message);
      }
    };
    getServices();
  }, []);

 
  const handleDelete = async (id) => {
    try {
      await deleteService(id); 
      setServices(services.filter(service => service.id !== id)); 
    } catch (err) {
      console.error('Failed to delete service:', err);
      setError('Failed to delete service.');
    }
  };

  const handleUpdate = (id) => {
    navigate(`/services/update/${id}`);  
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Service List</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Service Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.length > 0 ? (
            services.map((service) => (
              <tr key={service.id}>
                <td>{service.serviceName}</td>
                <td>{service.description}</td>
                <td>{service.price}</td>
                <td>
                  <button 
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleUpdate(service.id)}
                  >
                    Update
                  </button>
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(service.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No services available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
