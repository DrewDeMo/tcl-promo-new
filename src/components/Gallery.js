// src/components/Gallery.js
import React, { useState } from 'react';

const Gallery = ({ images }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const renderGalleryImage = (image, index) => (
    <div key={index}>
      <img
        className="h-auto max-w-full rounded-lg cursor-pointer"
        src={image}
        alt={`Gallery image ${index + 1}`}
        onClick={() => openLightbox(index)}
      />
    </div>
  );

  const renderGalleryGrid = () => {
    const columns = Math.min(images.length, 4);
    return (
      <div className={`grid grid-cols-2 md:grid-cols-${columns} gap-4`}>
        {images.slice(0, columns).map((image, index) => (
          <div key={index} className="grid gap-4">
            {images.slice(index * Math.ceil(images.length / columns), (index + 1) * Math.ceil(images.length / columns)).map((img, i) => renderGalleryImage(img, index * Math.ceil(images.length / columns) + i))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {renderGalleryGrid()}

      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <div className="relative max-w-4xl max-h-full">
            <img
              src={images[currentImageIndex]}
              alt={`Lightbox image ${currentImageIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain"
            />
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={closeLightbox}
            >
              &times;
            </button>
            {images.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl"
                  onClick={prevImage}
                >
                  &#8249;
                </button>
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl"
                  onClick={nextImage}
                >
                  &#8250;
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;