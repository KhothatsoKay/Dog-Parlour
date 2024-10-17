import React, { useEffect, useState } from 'react';
import { AuthService } from '../services/AuthService'; 
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const [credentials, setCredentials] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        dogs: []
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const currentUser = await AuthService.getCurrentUser();
                setCredentials(currentUser);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchCurrentUser();
    }, []);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleDogChange = (index, e) => {
        const updatedDogs = [...credentials.dogs];
        updatedDogs[index][e.target.name] = e.target.value;
        setCredentials({ ...credentials, dogs: updatedDogs });
    };

    const handleAddDog = () => {
        setCredentials({
            ...credentials,
            dogs: [...credentials.dogs, { name: '', breed: '', age: '', weight: '' }]
        });
    };

    const handleRemoveDog = (index) => {
        const updatedDogs = credentials.dogs.filter((_, i) => i !== index);
        setCredentials({ ...credentials, dogs: updatedDogs });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const dogsToUpdate = credentials.dogs.length === 0 
                ? [{ name: '', breed: '', age: '', weight: '' }] 
                : credentials.dogs;

            const updatedUser = { ...credentials, dogs: dogsToUpdate };
            await AuthService.updateProfile(updatedUser);
            setSuccess('Profile updated successfully!');
            navigate('/'); 
        } catch (err) {
            setError(err.message || 'Failed to update profile.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100" style={{ marginTop: '60px' }}>
            <div className="row w-100">
                <div className="col-md-6 mx-auto">
                    <form onSubmit={handleSubmit} className="bg-light shadow p-4 rounded">
                        <h2 className="text-center mb-4">Profile Update</h2>
                        {error && <div className="alert alert-danger mb-4">{error}</div>}
                        {success && <div className="alert alert-success mb-4">{success}</div>}
                        
                        <div className="mb-3">
                            <label className="form-label" htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={credentials.firstName}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        
                        <div className="mb-3">
                            <label className="form-label" htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={credentials.lastName}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={credentials.email}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="phoneNumber">Phone Number</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={credentials.phoneNumber}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="address">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={credentials.address}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <h3 className="mt-4">Dogs</h3>
                        {credentials.dogs.map((dog, index) => (
                            <div key={index} className="dog-form mb-3">
                                <div className="d-flex">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Dog's Name"
                                        value={dog.name}
                                        onChange={(e) => handleDogChange(index, e)}
                                        className="form-control me-2"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="breed"
                                        placeholder="Breed"
                                        value={dog.breed}
                                        onChange={(e) => handleDogChange(index, e)}
                                        className="form-control me-2"
                                        required
                                    />
                                    <input
                                        type="number"
                                        name="age"
                                        placeholder="Age"
                                        value={dog.age}
                                        onChange={(e) => handleDogChange(index, e)}
                                        className="form-control me-2"
                                        required
                                    />
                                    <input
                                        type="number"
                                        name="weight"
                                        placeholder="Weight"
                                        value={dog.weight}
                                        onChange={(e) => handleDogChange(index, e)}
                                        className="form-control me-2"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveDog(index)}
                                        className="btn btn-danger"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddDog} className="btn btn-secondary mb-3">Add Dog</button>

                        <button type="submit" disabled={loading} className="btn btn-primary w-100">
                            {loading ? 'Updating...' : 'Update Profile'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
