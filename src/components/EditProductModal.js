// src/components/EditProductModal.js
import React, { useState, useEffect } from 'react';
import { api } from '../mockApi/api';
import { Image, Plus } from 'react-feather';
import Modal from './Modal';

function EditProductModal({ product, isOpen, onClose, onSave }) {
  const [productNumber, setProductNumber] = useState(product.productNumber || '');
  const [title, setTitle] = useState(product.title);
  const [specs, setSpecs] = useState(product.specs);
  const [images, setImages] = useState(product.images);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(product.category);
  const [tags, setTags] = useState(product.tags || []);
  const [sides, setSides] = useState(product.sides || 'single-sided');

  useEffect(() => {
    api.getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    // Adjust the number of images based on the selected sides
    if (sides === 'single-sided' && images.length > 1) {
      setImages([images[0]]);
    } else if (sides === 'double-sided' && images.length !== 2) {
      setImages(images.slice(0, 2).concat(Array(2 - images.length).fill('')));
    } else if (sides === 'gallery' && images.length < 1) {
      setImages(['']);
    }
  }, [sides]);

  const handleSubmit = () => {
    onSave({
      ...product,
      productNumber,
      title,
      specs,
      category: parseInt(category),
      images: images.filter(img => img !== ''), // Remove empty image URLs
      tags,
      sides
    });
    onClose();
  };

  const handleTagChange = (tag) => {
    setTags(prevTags => 
      prevTags.includes(tag) 
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const renderImageInputs = () => {
    const imageInputs = [];
    const numInputs = sides === 'single-sided' ? 1 : sides === 'double-sided' ? 2 : images.length;

    for (let i = 0; i < numInputs; i++) {
      imageInputs.push(
        <div key={i} className="flex items-center mb-2">
          <input
            type="text"
            value={images[i] || ''}
            onChange={(e) => handleImageChange(i, e.target.value)}
            className="flex-grow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            placeholder={`Image URL ${i + 1}`}
          />
          <Image className="ml-2 text-gray-500" />
        </div>
      );
    }

    return imageInputs;
  };

  const modalContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="productNumber">
            Product Number
          </label>
          <input
            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            id="productNumber"
            type="text"
            value={productNumber}
            onChange={(e) => setProductNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="title">
            Title
          </label>
          <input
            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="specs">
          Specifications
        </label>
        <textarea
          className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          id="specs"
          rows="4"
          value={specs}
          onChange={(e) => setSpecs(e.target.value)}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="category">
            Category
          </label>
          <select
            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Tags
          </label>
          <div className="mt-2 space-y-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={tags.includes('new')}
                onChange={() => handleTagChange('new')}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">New</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={tags.includes('customizable')}
                onChange={() => handleTagChange('customizable')}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Customizable</span>
            </label>
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Sides
        </label>
        <select
          value={sides}
          onChange={(e) => setSides(e.target.value)}
          className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="single-sided">Front Only</option>
          <option value="double-sided">Front and Back</option>
          <option value="gallery">Gallery</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Images
        </label>
        {renderImageInputs()}
        {sides === 'gallery' && (
          <button
            type="button"
            onClick={() => setImages([...images, ''])}
            className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus size={16} className="mr-2" />
            Add Image
          </button>
        )}
      </div>
    </div>
  );

  const modalFooter = (
    <>
      <button
        onClick={onClose}
        type="button"
        className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Cancel
      </button>
      <button
        onClick={handleSubmit}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Save Changes
      </button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Product"
      footer={modalFooter}
    >
      {modalContent}
    </Modal>
  );
}

export default EditProductModal;