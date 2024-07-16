// src/components/Billboards.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../mockApi/api';
import EditProductModal from './EditProductModal';

function Billboards() {
  const [billboards, setBillboards] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    api.getProducts(11).then(setBillboards); // 11 is the category ID for billboards
  }, []);

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleSaveEdit = async (editedProduct) => {
    try {
      const updatedProduct = await api.editProduct(editedProduct);
      setBillboards(billboards.map(p => p.id === updatedProduct.id ? updatedProduct : p));
      setEditingProduct(null);
    } catch (error) {
      console.error('Failed to edit product:', error);
    }
  };

  const renderProductImages = (product) => {
    switch(product.sides) {
      case 'single-sided':
        return (
          <img src={product.images[0]} alt={product.title} className="w-full h-48 object-cover mb-2 rounded" />
        );
      case 'double-sided':
        return (
          <div className="flex mb-2">
            <img src={product.images[0]} alt={`${product.title} front`} className="w-1/2 h-48 object-cover rounded-l" />
            <img src={product.images[1]} alt={`${product.title} back`} className="w-1/2 h-48 object-cover rounded-r" />
          </div>
        );
      case 'gallery':
        return (
          <div className="relative h-48 mb-2">
            <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover rounded" />
            <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded text-sm">
              +{product.images.length - 1} more
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Billboards</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {billboards.map(billboard => (
          <div key={billboard.id} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition">
            <Link to={`/product/${billboard.id}`}>
              {renderProductImages(billboard)}
              <h2 className="text-xl font-semibold">{billboard.title}</h2>
              <p className="text-sm text-gray-600">{billboard.specs}</p>
              <div className="mt-2">
                {billboard.tags.includes('new') && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded mr-2">New</span>
                )}
                {billboard.tags.includes('customizable') && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">Customizable</span>
                )}
              </div>
            </Link>
            {userRole === 'employee' && (
              <button 
                onClick={() => handleEditProduct(billboard)}
                className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
              >
                Edit
              </button>
            )}
          </div>
        ))}
      </div>
      {editingProduct && (
        <EditProductModal 
          product={editingProduct} 
          onClose={() => setEditingProduct(null)} 
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}

export default Billboards;