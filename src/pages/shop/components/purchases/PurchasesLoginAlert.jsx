import React from 'react';
import { Link } from 'react-router-dom';

export default function PurchasesLoginAlert() {
  return (
    <div className="container py-5 text-center">
      <div className="alert alert-warning shadow-sm mx-auto" style={{maxWidth:500}}>
        <i className="bi bi-person-circle fs-2 text-primary mb-2"></i>
        <div className="fw-bold mb-2">Debes iniciar sesión para ver tus compras.</div>
        <Link to="/login" className="btn btn-primary">Iniciar sesión</Link>
      </div>
    </div>
  );
}
