import React from 'react';
import { Link } from 'react-router-dom';

export default function PurchasesEmpty() {
  return (
    <div className="alert alert-info text-center shadow-sm mx-auto" style={{maxWidth:500}}>
      <i className="bi bi-emoji-frown fs-2 text-secondary mb-2"></i>
      <div className="fw-bold mb-2">No tienes compras realizadas.</div>
      <div className="text-muted">¡Explora la tienda y realiza tu primera compra!</div>
      <Link to="/tienda" className="btn btn-outline-primary mt-2">Ir a la tienda</Link>
    </div>
  );
}
