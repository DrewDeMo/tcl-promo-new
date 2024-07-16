// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import PromoGuide from './components/PromoGuide';
import Billboards from './components/Billboards';
import ProductDetail from './components/ProductDetail';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddProduct from './components/AddProduct';
import { icons } from 'feather-icons'; // Import Feather icons

function PrivateRoute({ children, requiredRole }) {
  const isAuthenticated = !!localStorage.getItem('userToken');
  const userRole = localStorage.getItem('userRole');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

function Notification({ type, message, onClose }) {
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-4 py-2 rounded shadow-lg flex items-center`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 focus:outline-none">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      </button>
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <Router>
      <div className={`App min-h-screen ${darkMode ? 'dark' : ''}`}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
            onClose={closeNotification}
          />
        )}
        <main className="container mx-auto mt-4 px-4 min-h-screen transition-colors duration-200 ease-in-out dark:bg-gray-900 dark:text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/promo-guide" element={<PromoGuide />} />
            <Route path="/billboards" element={<Billboards />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/add-product" 
              element={
                <PrivateRoute requiredRole="employee">
                  <AddProduct setNotification={setNotification} />
                </PrivateRoute>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;