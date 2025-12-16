import React from 'react';

export default function ProductGallery({ image, name }) {
  return (
    <div className="product-gallery">
      <div className="product-gallery-card">
        <img src={image} alt={name} />
      </div>
    </div>
  );
}
