// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to Marketing Materials</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link to="/promo-guide" className="bg-blue-500 text-white p-8 rounded-lg shadow-md hover:bg-blue-600 transition">
          <h2 className="text-2xl font-semibold mb-4">Promo Guide</h2>
          <p>Explore our range of promotional materials</p>
        </Link>
        <Link to="/billboards" className="bg-green-500 text-white p-8 rounded-lg shadow-md hover:bg-green-600 transition">
          <h2 className="text-2xl font-semibold mb-4">Billboards</h2>
          <p>Check out our billboard offerings</p>
        </Link>
      </div>
    </div>
  );
}

export default Home;