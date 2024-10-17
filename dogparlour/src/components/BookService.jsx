import React, { useState, useEffect } from 'react';
import { AppointmentService } from '../services/AppointmentService';
import { AuthService } from '../services/AuthService';
import { useParams } from 'react-router-dom';

export default function BookAppointment() {
  const { serviceId } = useParams();
  const [appointmentDate, setAppointmentDate] = useState('');
  const [dogId, setDogId] = useState('');
  const [user, setUser] = useState(null);
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        setUser(currentUser);
        setDogs(currentUser.dogs || []);
      } catch (err) {
        console.log('No user logged in', err.message);
      }
    };

    getCurrentUser();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const appointmentData = {
      appointmentDate,
      status: 'SCHEDULED',
      user: { id: user.id },
      dog: { id: dogId },
      services: [{ id: serviceId }],
    };

    try {
      const response = await AppointmentService.createAppointment(appointmentData);
      console.log('Appointment created:', response);
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="mt-4 p-4 border rounded bg-light">
        <div className="form-group mb-3">
          <label htmlFor="appointmentDate" className="form-label">Appointment Date</label>
          <input
            type="datetime-local"
            id="appointmentDate"
            className="form-control"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="dogId" className="form-label">Dog</label>
          <select
            id="dogId"
            className="form-select"
            value={dogId}
            onChange={(e) => setDogId(e.target.value)}
            required
          >
            <option value="" disabled>Select a dog</option>
            {dogs.filter(dog => dog.name && dog.breed).map((dog) => (
              <option key={dog.id} value={dog.id}>
                {dog.name} ({dog.breed})
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary mt-3">Book Appointment</button>
      </form>
    </div>
  );
}
