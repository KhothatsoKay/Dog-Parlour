import React from 'react';
import Services from './Services';
import heroImage from '../images/hero-image.jpg';

const Home = () => (
  <div>
    {/* Hero Section */}
    <header
      className="text-white text-center py-5"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        color: 'white',
        textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)', 
      }}
    >

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          zIndex: 1, 
        }}
      ></div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <h1 className="display-4">Welcome to Matat Dog Parlour</h1>
        <p className="lead">Your one-stop solution for all dog care services!</p>
        <a
          href="#services"
          className="btn btn-light btn-lg mt-4"
          style={{
            transition: 'all 0.3s ease', 
          }}
        >
          Explore Services
        </a>
      </div>
    </header>


    <section id="services" className="container mt-5">
      <div className="text-center">
        <h2 className="mb-4">Our Services</h2>
      </div>
      <Services />
    </section>

    <footer className="bg-dark text-light text-center py-4 mt-5">
      <div className="container">
        <p className="mb-0">© 2024 Matat Dog Parlour. All rights reserved.</p>
        <p>
          <a href="#" className="text-light me-3">Privacy Policy</a>
          <a href="#" className="text-light">Terms of Service</a>
        </p>
      </div>
    </footer>
  </div>
);

export default Home;
