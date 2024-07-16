// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../mockApi/api';

function Dashboard() {
  const [userList, setUserList] = useState([]);
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    api.getUserList().then(setUserList);
  }, []);

  const handleRemoveFromList = async (productId) => {
    await api.removeFromList(productId);
    setUserList(userList.filter(item => item.id !== productId));
  };

  const handleClearList = async () => {
    await api.clearList();
    setUserList([]);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="mb-4">Welcome, {userRole}!</p>
      <h2 className="text-2xl font-semibold mb-4">Your List</h2>
      {userList.length === 0 ? (
        <p>Your list is empty.</p>
      ) : (
        <>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userList.map(item => (
              <li key={item.id} className="border p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.specs}</p>
                <button
                  onClick={() => handleRemoveFromList(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={handleClearList}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Clear List
          </button>
        </>
      )}
      {userRole === 'employee' && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Employee Actions</h2>
          <Link to="/add-product" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
            Add New Product
          </Link>
        </div>
      )}
    </div>
  );
}

export default Dashboard;