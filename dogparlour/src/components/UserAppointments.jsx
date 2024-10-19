import React, { useEffect, useState } from 'react';

export default function UserAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/appointments/user`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch appointments');
                }

                const data = await response.json();
                setAppointments(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    const getStatusClass = (status) => {
        switch (status) {
            case 'PENDING':
                return 'text-warning'; 
            case 'COMPLETED':
                return 'text-success'; 
            case 'SCHEDULED':
                return 'text-success'; 
            case 'CANCELLED':
                return 'text-danger'; 
            default:
                return '';
        }
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">Error: {error}</div>;
    }

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Your Appointments</h2>
            {appointments.length === 0 ? (
                <div className="alert alert-info text-center">No appointments found.</div>
            ) : (
                <div className="row">
                    {appointments.map((appointment) => (
                        <div className="col-md-6 mb-4" key={appointment.id}>
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">Appointment on {new Date(appointment.appointmentDate).toLocaleString()}</h5>
                                    <p className="card-text">
                                        <strong>Status:</strong> <span className={getStatusClass(appointment.status)}>{appointment.status}</span> <br />
                                        <strong>Dog:</strong> {appointment.dog.name} <br />
                                        <strong>Breed:</strong> {appointment.dog.breed} <br />
                                        <strong>Age:</strong> {appointment.dog.age} years old
                                    </p>
                                    <h6 className="card-subtitle mb-2 text-muted">Services</h6>
                                    <ul className="list-group list-group-flush">
                                        {appointment.services.map((service) => (
                                            <li key={service.id} className="list-group-item">
                                                <strong>{service.serviceName}</strong> - ${service.price}
                                                {service.description && <p>{service.description}</p>}
                                                {service.image && (
                                                    <img
                                                        src={`data:image/png;base64,${service.image}`}
                                                        alt={service.serviceName}
                                                        className="img-fluid mt-2"
                                                        style={{ maxHeight: '100px', objectFit: 'cover' }}
                                                    />
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
