import React, { useEffect, useState } from 'react';
import { AppointmentService } from '../services/AppointmentService';

export default function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState({});

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

    const handleStatusChange = (appointmentId, newStatus) => {
        setSelectedStatus(prev => ({ ...prev, [appointmentId]: newStatus }));
    };

    const updateStatus = async (appointmentId) => {
        try {
            const status = selectedStatus[appointmentId];
            await AppointmentService.updateAppointmentStatus(appointmentId, status);
            setAppointments(prev => prev.map(app => app.id === appointmentId ? { ...app, status } : app));
            alert('Status updated successfully');
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        }
    };

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
                        <p className={`mb-1 ${getStatusClass(appointment.status)}`}>Status: {appointment.status}</p>
                        <p>Dog: {appointment.dog.name}</p>
                        <p>User: {appointment.user.username}</p>

                        <select
                            className="form-select mt-2"
                            value={selectedStatus[appointment.id] || appointment.status}
                            onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                        >
                            <option value="PENDING">PENDING</option>
                            <option value="SCHEDULED">SCHEDULED</option>
                            <option value="COMPLETED">COMPLETED</option>
                            <option value="CANCELLED">CANCELLED</option>
                        </select>
                        <button
                            className="btn btn-primary mt-2"
                            onClick={() => updateStatus(appointment.id)}
                        >
                            Update Status
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
