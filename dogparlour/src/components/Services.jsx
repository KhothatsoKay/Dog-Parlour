import React, { useEffect, useState } from 'react';
import { fetchServices } from '../services/ServicesService';
import { AuthService } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const getServices = async () => {
      try {
        const servicesData = await fetchServices();
        setServices(servicesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const getCurrentUser = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        setUser(currentUser); 
        console.log(currentUser);
      } catch (err) {
        console.log('No user logged in', err.message);
      }
    };

    getServices();
    getCurrentUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  function bookService(serviceId) {
    if (user) {
      navigate(`/book-appointment/${serviceId}`);
    } else {
      alert("Please log in first!");
    }
  }

  return (
    <div>
      <h2 className='mb-4'>Our Services</h2>
      <div className="row">
        {services.map((service) => (
          <div key={service.id} className="col-md-4 mb-4">
            <div className="card">
              {service.image && service.image.length > 0 && (
                <img
                  src={`data:image/jpeg;base64,${service.image}`}
                  alt={service.serviceName}
                  className="card-img-top"
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{service.serviceName}</h5>
                <button onClick={() => bookService(service.id)} className="btn btn-primary">
                  Book Service
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
