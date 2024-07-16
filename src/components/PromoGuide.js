// src/components/PromoGuide.js
import React, { useState, useEffect } from 'react';
import { api } from '../mockApi/api';
import EditProductModal from './EditProductModal';
import ProductDetail from './ProductDetail';
import { Edit, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'react-feather';

function Lightbox({ images, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <button
        className="absolute top-4 right-4 text-white hover:text-gray-300"
        onClick={onClose}
      >
        <X size={24} />
      </button>
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
        onClick={handlePrev}
      >
        <ChevronLeft size={48} />
      </button>
      <img
        src={images[currentIndex]}
        alt={`Gallery image ${currentIndex + 1}`}
        className="max-h-90vh max-w-90vw object-contain"
      />
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
        onClick={handleNext}
      >
        <ChevronRight size={48} />
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}

function PromoGuide() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [lightboxImages, setLightboxImages] = useState(null);
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    api.getCategories().then(data => {
      const promoCategories = data.filter(cat => cat.section === "promo");
      setCategories(promoCategories);
    });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      api.getProducts(selectedCategory).then(setProducts);
    }
  }, [selectedCategory]);

  const handleEditProduct = (product) => {
    console.log('Edit product clicked:', product);
    setEditingProduct(product);
  };

  const handleSaveEdit = async (editedProduct) => {
    console.log('Saving edited product:', editedProduct);
    try {
      const updatedProduct = await api.editProduct(editedProduct);
      setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
      setEditingProduct(null);
    } catch (error) {
      console.error('Failed to edit product:', error);
    }
  };

  const renderProductImages = (product) => {
    const imageCount = product.images.length;
    if (imageCount === 1) {
      return (
        <div className="relative h-48">
          <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover rounded" />
        </div>
      );
    } else if (imageCount === 2) {
      return (
        <div className="flex h-48 space-x-2">
          <div className="relative w-1/2">
            <img src={product.images[0]} alt={`${product.title} front`} className="w-full h-full object-cover rounded" />
            <span className="absolute top-2 left-2 bg-white px-2 py-1 rounded text-sm">Front</span>
          </div>
          <div className="relative w-1/2">
            <img src={product.images[1]} alt={`${product.title} back`} className="w-full h-full object-cover rounded" />
            <span className="absolute top-2 left-2 bg-white px-2 py-1 rounded text-sm">Back</span>
          </div>
        </div>
      );
    } else if (imageCount > 2) {
      return (
        <div className="relative h-48">
          <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover rounded" />
          <span className="absolute top-2 left-2 bg-white px-2 py-1 rounded text-sm">Multiple ({imageCount})</span>
        </div>
      );
    } else {
      return (
        <div className="relative h-48 bg-gray-200 flex items-center justify-center rounded">
          <span className="text-gray-500">No image available</span>
        </div>
      );
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Promo Guide</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1">
          <h2 className="text-xl font-semibold mb-2">Categories</h2>
          <ul>
            {categories.map(category => (
              <li key={category.id}>
                <button 
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left p-2 rounded ${selectedCategory === category.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-3">
          <h2 className="text-xl font-semibold mb-2">Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(product => (
              <div key={product.id} className="border border-gray-200 p-4 rounded-lg transition hover:shadow-lg">
                <div onClick={() => setSelectedProduct(product)} className="cursor-pointer">
                  <p className="text-xs text-gray-500 mb-1">#{product.productNumber}</p>
                  {renderProductImages(product)}
                  <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{product.specs}</p>
                  <div className="mt-2">
                    {product.tags.includes('new') && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded mr-2">New</span>
                    )}
                    {product.tags.includes('customizable') && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">Customizable</span>
                    )}
                  </div>
                </div>
                {userRole === 'employee' && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditProduct(product);
                    }}
                    className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition flex items-center"
                  >
                    <Edit size={16} className="mr-1" /> Edit
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {editingProduct && (
        <EditProductModal 
          product={editingProduct} 
          isOpen={!!editingProduct}
          onClose={() => setEditingProduct(null)} 
          onSave={handleSaveEdit}
        />
      )}
      {selectedProduct && (
        <ProductDetail 
          productId={selectedProduct.id}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      {lightboxImages && (
        <Lightbox 
          images={lightboxImages} 
          onClose={() => setLightboxImages(null)} 
        />
      )}
    </div>
  );
}

export default PromoGuide;