import React from 'react';
import Services from './Services';

const Home = () => (
  <div className="text-center">
    <h1 className="display-4">Welcome to Matat Dog Parlour</h1>
    <p className="lead">Your one-stop solution for all dog care services!</p>
    <div className="mt-4">
      <Services />
    </div>
  </div>
);

export default Home;
