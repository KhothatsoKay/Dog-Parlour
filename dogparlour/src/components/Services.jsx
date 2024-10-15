import React, { useEffect, useState } from 'react';
import { fetchServices } from '../services/ServicesService';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(false);

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

    getServices();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  function bookService() {
    if (user) {
      alert('Going to service');
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
                <button onClick={bookService} className="btn btn-primary">
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
