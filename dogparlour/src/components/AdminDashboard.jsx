import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
 const navigate = useNavigate()
    function NavigateToServices(){
      navigate('/add-services');
    }
  return (
    <div className="container-fluid mt-5 p-4">
      <div className="row">
        <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
          <div className="position-sticky">
         
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link className="nav-link" to="/admin/list-services">
                  Manage Services
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/users">
                  Manage Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/appointments">
                  View Appointments
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/settings">
                  Settings
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/logout">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <main className="col-md-9 ms-sm-auto col-lg-10 px-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Dashboard</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group me-2">
                <button className="btn btn-sm btn-outline-secondary" onClick={NavigateToServices}>Add Services</button>
                <button className="btn btn-sm btn-outline-secondary">Manage Users</button>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-header">Overview</div>
            <div className="card-body">
              <h5 className="card-title">Welcome to the Admin Dashboard!</h5>
              <p className="card-text">
                Here you can manage services, users, and view reports.
                Use the sidebar to navigate through the dashboard.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
