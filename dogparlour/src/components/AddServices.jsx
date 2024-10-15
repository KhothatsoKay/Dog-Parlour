import React, { useState } from 'react';
import { uploadService } from '../services/ServicesService';
import { AuthService } from '../services/AuthService';

export default function AddService() {
  const [serviceData, setServiceData] = useState({
    serviceName: '',
    description: '',
    price: '',
    imageFile: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData({ ...serviceData, [name]: value });
  };

  const handleFileChange = (e) => {
    setServiceData({ ...serviceData, imageFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const token = AuthService.getToken(); 
      const result = await uploadService(serviceData, token); 
      setSuccess('Service uploaded successfully!');
      console.log(result);
      setServiceData({ serviceName: '', description: '', price: '', imageFile: null });
    } catch (err) {
      setError(err.message || 'Failed to upload service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">Add Service</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="mb-3">
          <label htmlFor="serviceName" className="form-label">Service Name</label>
          <input
            type="text"
            name="serviceName"
            value={serviceData.serviceName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            name="description"
            value={serviceData.description}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            name="price"
            value={serviceData.price}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="imageFile" className="form-label">Service Image</label>
          <input
            type="file"
            name="imageFile"
            onChange={handleFileChange}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Uploading...' : 'Add Service'}
        </button>
      </form>
    </div>
  );
}
