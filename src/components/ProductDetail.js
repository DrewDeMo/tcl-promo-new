// src/components/ProductDetail.js
import React, { useState, useEffect } from 'react';
import { api } from '../mockApi/api';
import Modal from './Modal';
import Gallery from './Gallery';

function ProductDetail({ productId, isOpen, onClose }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (productId) {
      api.getProduct(productId).then(setProduct);
    }
  }, [productId]);

  if (!product) return null;

  const modalFooter = (
    <button 
      onClick={() => api.addToList(product.id)}
      className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      Add to List
    </button>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={product.title} footer={modalFooter}>
      <div className="container mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Gallery images={product.images} />
          </div>
          <div className="space-y-6">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Product Number: {product.number}</p>
              <p className="text-lg text-gray-600 dark:text-gray-300">{product.specs}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ProductDetail;