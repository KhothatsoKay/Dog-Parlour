import React, { useEffect, useState } from 'react';
import { AppointmentService } from '../services/AppointmentService';

export default function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const fetchedAppointments = await AppointmentService.getAllAppointments(); 
                setAppointments(fetchedAppointments);
            } catch (err) {
                setError('Failed to fetch appointments');
                console.error('Error fetching appointments:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    if (loading) {
        return <div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div>;
    }

    if (error) {
        return <div className="alert alert-danger" role="alert">{error}</div>;
    }

    return (
        <div className="container mt-4">
            <h2>All Appointments</h2>
            <div className="list-group">
                {appointments.map((appointment) => (
                    <div className="list-group-item" key={appointment.id}>
                        <h5 className="mb-1">Date: {new Date(appointment.appointmentDate).toLocaleString()}</h5>
                        <p className="mb-1">Status: {appointment.status}</p>
                        <p>Dog ID: {appointment.dog.name}</p>
                        <p>User ID: {appointment.user.username}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

