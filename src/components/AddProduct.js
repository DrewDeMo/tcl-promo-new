// src/components/AddProduct.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../mockApi/api';

function AddProduct({ setNotification }) {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [specs, setSpecs] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.getCategories().then(setCategories);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.addProduct({
        title,
        specs,
        category: parseInt(category),
        images
      });
      setNotification({ type: 'success', message: 'Product added successfully!' });
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to add product:', error);
      setNotification({ type: 'error', message: 'Failed to add product. Please try again.' });
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imagePromises = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then(results => {
      setImages(prevImages => [...prevImages, ...results]);
    });
  };

  return (
    <div className="container mx-auto mt-8 max-w-2xl">
      <h1 className="text-4xl font-bold mb-6 text-center">Add New Product</h1>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter product title"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="specs">
            Specifications
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
            id="specs"
            value={specs}
            onChange={(e) => setSpecs(e.target.value)}
            required
            rows="4"
            placeholder="Enter product specifications"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="images">
            Images
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
            id="images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
        </div>
        {images.length > 0 && (
          <div className="mb-6">
            <p className="text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Uploaded Images:</p>
            <div className="flex flex-wrap gap-2">
              {images.map((img, index) => (
                <img key={index} src={img} alt={`Uploaded ${index + 1}`} className="w-20 h-20 object-cover rounded" />
              ))}
            </div>
          </div>
        )}
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            type="submit"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;