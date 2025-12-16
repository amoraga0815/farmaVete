import React from 'react';

export default function ProductToast({ product }) {
  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      <div id="addedToast" className="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="d-flex">
          <div className="toast-body">
            {product.name} se agregó al carrito.
          </div>
          <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    </div>
  );
}
